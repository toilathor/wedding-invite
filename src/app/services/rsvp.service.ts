import { Injectable } from "@angular/core";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../core/firebase.config";
import { RSVPFormData } from "../models/wedding-data.model";

const DEVICE_ID_KEY = "wedding_guestbook_device_id";

export interface PhoneValidationResult {
  isValid: boolean;
  normalizedKey: string;
  formattedPhone: string;
  errorMessage?: string;
}

/**
 * Validate và chuẩn hóa số điện thoại Việt Nam (đúng 10 chữ số)
 * - Đầu số hợp lệ: 03x, 05x, 07x, 08x, 09x
 * - Tự động xử lý nếu người dùng dán vào +84 hoặc 84
 */
export function validateAndNormalizePhone(
  rawPhone: string,
): PhoneValidationResult {
  if (!rawPhone || !rawPhone.trim()) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage: "Vui lòng nhập số điện thoại.",
    };
  }

  // Loại bỏ toàn bộ ký tự không phải số (ngoại trừ + nếu có ở đầu)
  let clean = rawPhone.trim().replace(/[\s.\-()]/g, "");

  // Tự động chuyển đổi đầu số +84 hoặc 84 thành 0
  if (clean.startsWith("+84")) {
    clean = "0" + clean.slice(3);
  } else if (clean.startsWith("84") && clean.length === 11) {
    clean = "0" + clean.slice(2);
  }

  // Chỉ cho phép toàn chữ số
  if (!/^[0-9]+$/.test(clean)) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage: "Số điện thoại chỉ được chứa các chữ số.",
    };
  }

  // Bắt buộc bắt đầu bằng số 0
  if (!clean.startsWith("0")) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage:
        "Số điện thoại Việt Nam phải bắt đầu bằng số 0 (VD: 0912345678).",
    };
  }

  // Kiểm tra độ dài đúng 10 số
  if (clean.length < 10) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage: `Số điện thoại phải đủ 10 số (hiện có ${clean.length}/10 số).`,
    };
  }

  if (clean.length > 10) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage: "Số điện thoại không được vượt quá 10 số.",
    };
  }

  // Kiểm tra đầu số nhà mạng Việt Nam: 03, 05, 07, 08, 09
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!vnPhoneRegex.test(clean)) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage:
        "Đầu số không hợp lệ (hỗ trợ các đầu số 03, 05, 07, 08, 09).",
    };
  }

  // Chặn số giả / số ảo lặp lại (VD: 0000000000, 0999999999)
  if (/^0([0-9])\1{8}$/.test(clean)) {
    return {
      isValid: false,
      normalizedKey: "",
      formattedPhone: "",
      errorMessage: "Số điện thoại không hợp lệ.",
    };
  }

  return {
    isValid: true,
    normalizedKey: clean,
    formattedPhone: clean,
  };
}

@Injectable({
  providedIn: "root",
})
export class RsvpService {
  readonly deviceId: string;

  constructor() {
    this.deviceId = this.initDeviceId();
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

  /**
   * Validate số điện thoại Việt Nam
   */
  validatePhone(phone: string): PhoneValidationResult {
    return validateAndNormalizePhone(phone);
  }

  /**
   * Lấy thông tin RSVP theo số điện thoại
   */
  async getRsvpByPhone(phone: string): Promise<RSVPFormData | null> {
    const validation = this.validatePhone(phone);
    if (!validation.isValid) return null;

    try {
      const rsvpDocRef = doc(db, "rsvps", validation.normalizedKey);
      const snapshot = await getDoc(rsvpDocRef);
      if (snapshot.exists()) {
        return snapshot.data() as RSVPFormData;
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin RSVP theo SĐT:", error);
      return null;
    }
  }

  /**
   * Lưu hoặc cập nhật xác nhận tham dự (RSVP) vào Firestore với document ID là số điện thoại Việt Nam (10 chữ số)
   */
  async submitRsvp(
    data: Omit<RSVPFormData, "deviceId" | "createdAt">,
  ): Promise<{ success: boolean; error?: string }> {
    const trimmedName = data.name.trim();
    if (!trimmedName) {
      return {
        success: false,
        error: "Vui lòng nhập họ và tên của bạn.",
      };
    }

    const phoneValidation = this.validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      return {
        success: false,
        error: phoneValidation.errorMessage || "Số điện thoại không hợp lệ.",
      };
    }

    try {
      const rsvpDocRef = doc(db, "rsvps", phoneValidation.normalizedKey);
      const payload: RSVPFormData = {
        name: trimmedName,
        phone: phoneValidation.formattedPhone,
        isAttending: data.isAttending,
        attendParty: data.isAttending ? !!data.attendParty : false,
        attendGroom: data.isAttending ? !!data.attendGroom : false,
        attendBride: data.isAttending ? !!data.attendBride : false,
        guestsCount: data.isAttending ? data.guestsCount || 1 : 0,
        note: data.note?.trim() || "",
        deviceId: this.deviceId,
        createdAt: serverTimestamp(),
      };

      // Dùng setDoc với document ID = số điện thoại chuẩn hóa (10 chữ số)
      await setDoc(rsvpDocRef, payload, { merge: true });
      return { success: true };
    } catch (error: any) {
      console.error("Lỗi khi lưu RSVP lên Firestore:", error);
      return {
        success: false,
        error: error?.message || "Đã có lỗi xảy ra khi gửi xác nhận.",
      };
    }
  }
}
