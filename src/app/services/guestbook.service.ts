import { computed, Injectable, OnDestroy, signal } from "@angular/core";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../core/firebase.config";
import { GuestMessage } from "../models/wedding-data.model";

const DEVICE_ID_KEY = "wedding_guestbook_device_id";
export const MAX_WISHES_PER_DEVICE = 5;

@Injectable({
  providedIn: "root",
})
export class GuestbookService implements OnDestroy {
  private unsubscribeSnapshot?: Unsubscribe;

  readonly deviceId: string;
  messages = signal<GuestMessage[]>([]);

  // Đếm số lời chúc đã gửi từ thiết bị này
  myWishesCount = computed(() => {
    return this.messages().filter((m) => m.deviceId === this.deviceId).length;
  });

  // Kiểm tra đã đạt giới hạn 5 lời chúc chưa
  isLimitReached = computed(() => {
    return this.myWishesCount() >= MAX_WISHES_PER_DEVICE;
  });

  constructor() {
    this.deviceId = this.initDeviceId();
    // Luôn lấy dữ liệu mới nhất từ Firestore khi khởi tạo / reload trang
    this.listenToRealtimeWishes();
  }

  private initDeviceId(): string {
    try {
      let id = localStorage.getItem(DEVICE_ID_KEY);
      if (!id) {
        id =
          "dev_" +
          Math.random().toString(36).substring(2, 11) +
          "_" +
          Date.now().toString(36);
        localStorage.setItem(DEVICE_ID_KEY, id);
      }
      return id;
    } catch {
      return "dev_" + Math.random().toString(36).substring(2, 11);
    }
  }

  private listenToRealtimeWishes() {
    try {
      const wishesRef = collection(db, "wishes");

      this.unsubscribeSnapshot = onSnapshot(
        wishesRef,
        (snapshot) => {
          console.log(
            "Firestore snapshot received, docs count:",
            snapshot.size,
          );
          if (!snapshot.empty) {
            const list: GuestMessage[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              let formattedDate = "Mới đây";

              if (data["createdAt"] instanceof Timestamp) {
                const date = data["createdAt"].toDate();
                formattedDate = date.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              } else if (
                typeof data["createdAt"] === "string" &&
                data["createdAt"]
              ) {
                formattedDate = data["createdAt"];
              } else if (
                data["createdAt"] &&
                typeof data["createdAt"].toDate === "function"
              ) {
                const date = data["createdAt"].toDate();
                formattedDate = date.toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }

              const itemDeviceId = data["deviceId"] || "";
              const isMine = !!(itemDeviceId && itemDeviceId === this.deviceId);

              return {
                id: doc.id,
                name: data["name"] || data["sender"] || "Khách mời",
                content: data["content"] || data["message"] || "",
                createdAt: formattedDate,
                rawDate: data["createdAt"],
                deviceId: itemDeviceId,
                isPinned: isMine,
              };
            });

            // Sắp xếp theo thời gian mới nhất (newest first)
            list.sort((a: any, b: any) => {
              const timeA =
                a.rawDate instanceof Timestamp
                  ? a.rawDate.toMillis()
                  : a.rawDate
                    ? new Date(a.rawDate).getTime()
                    : 0;
              const timeB =
                b.rawDate instanceof Timestamp
                  ? b.rawDate.toMillis()
                  : b.rawDate
                    ? new Date(b.rawDate).getTime()
                    : 0;
              return timeB - timeA;
            });

            this.messages.set(list);
          } else {
            this.messages.set([]);
          }
        },
        (error) => {
          console.error("Firestore realtime listener error:", error);
        },
      );
    } catch (err) {
      console.error("Could not setup Firestore realtime listener:", err);
    }
  }

  async addMessage(
    name: string,
    content: string,
  ): Promise<{ success: boolean; error?: string }> {
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) {
      return { success: false, error: "Vui lòng nhập tên và lời chúc." };
    }

    if (this.isLimitReached()) {
      return {
        success: false,
        error: `Bạn đã gửi tối đa ${MAX_WISHES_PER_DEVICE} lời chúc từ thiết bị này. Cảm ơn tình cảm của bạn! 💕`,
      };
    }

    // Optimistic UI Update: Cập nhật giao diện ngay lập tức với trạng thái isPinned = true
    const tempMessage: GuestMessage = {
      id: Date.now().toString(),
      name: trimmedName,
      content: trimmedContent,
      deviceId: this.deviceId,
      isPinned: true,
      createdAt: new Date().toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    // Ghim lời chúc mới nhất của mình lên đầu danh sách
    this.messages.update((list) => [tempMessage, ...list]);

    // Gửi lên Firestore kèm deviceId
    try {
      const wishesRef = collection(db, "wishes");
      await addDoc(wishesRef, {
        name: trimmedName,
        content: trimmedContent,
        deviceId: this.deviceId,
        createdAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Lỗi khi gửi lời chúc lên Firestore:", error);
      return { success: true }; // Giao diện client-side vẫn hiển thị
    }
  }

  ngOnDestroy() {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
    }
  }
}
