import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import confetti from "canvas-confetti";
import { GuestbookService } from "../../services/guestbook.service";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-guestbook",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section
      id="sangtrong-message-id"
      class="relative bg-white overflow-hidden py-12 md:py-20 px-4 sm:px-6 md:px-10 reveal"
    >
      <!-- Top Left Floral Decor -->
      <img
        src="/assets/images/templates/sangtrong/decor.png"
        alt="Floral Decor Top Left"
        class="absolute top-0 left-0 md:w-[320px] md:h-[270px] w-[140px] h-[120px] pointer-events-none opacity-80"
      />
      <!-- Bottom Right Floral Decor -->
      <img
        src="/assets/images/templates/sangtrong/flower-decor-bottom.png"
        alt="Floral Decor Bottom Right"
        class="absolute bottom-0 right-0 md:w-[320px] md:h-[270px] w-[140px] h-[120px] pointer-events-none opacity-80"
      />

      <div class="z-10 relative max-w-6xl mx-auto">
        <!-- 2-Column Responsive Layout: Left (LOVE Ladder Illustration) & Right (Guestbook Form & Wishes) -->
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <!-- Left Column: Romantic LOVE Ladder Illustration -->
          <div
            class="lg:col-span-5 flex flex-col items-center justify-center text-center reveal-left delay-100"
          >
            <div class="relative group">
              <img
                src="/assets/images/templates/sangtrong/love-ladder.png"
                alt="LOVE Ladder Decoration"
                class="w-[180px] sm:w-[220px] lg:w-[320px] max-h-[460px] h-auto object-contain mx-auto drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
              />
            </div>
          </div>

          <!-- Right Column: Sổ lưu bút (Form & Message List with refined typography) -->
          <div
            class="lg:col-span-7 flex flex-col justify-center reveal-right delay-200"
          >
            <!-- Section Header -->
            <div class="text-center lg:text-left mb-4 md:mb-6">
              <h2
                class="text-[38px] sm:text-[46px] md:text-[54px] leading-tight font-pinyonScript text-[#A12F0C]"
              >
                Sổ lưu bút
              </h2>
              <p
                class="text-stone-500 text-xs sm:text-sm font-beVietnamPro italic mt-1"
              >
                Gửi những lời chúc mừng và nhắn nhủ yêu thương đến Quang Thọ
                &amp; Thúy Hiền
              </p>
              <div
                class="w-12 h-[1.5px] bg-[#A12F0C]/30 mt-2.5 mx-auto lg:mx-0"
              ></div>
            </div>

            <!-- Form -->
            <form (ngSubmit)="submitWish()" class="space-y-3 font-beVietnamPro">
              <div>
                <input
                  type="text"
                  [(ngModel)]="name"
                  name="name"
                  placeholder="Tên của bạn (tối đa 160 ký tự) *"
                  required
                  class="w-full h-10 sm:h-11 px-3.5 sm:px-4 rounded-xl border border-stone-300 placeholder-stone-400 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all bg-stone-50/50 focus:bg-white shadow-inner"
                />
              </div>

              <div class="relative">
                <textarea
                  [(ngModel)]="content"
                  name="content"
                  rows="3"
                  placeholder="Nhập lời chúc của bạn (tối đa 3000 ký tự) *"
                  required
                  class="w-full h-[85px] sm:h-[95px] p-3.5 rounded-xl border border-stone-300 resize-none placeholder-stone-400 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all bg-stone-50/50 focus:bg-white shadow-inner"
                >
                </textarea>
              </div>

              <!-- Gợi ý lời chúc nhanh -->
              <div class="space-y-1.5 pt-0.5">
                <p class="text-[11px] text-stone-500 italic">Gợi ý lời chúc:</p>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    *ngFor="let suggestion of wishSuggestions"
                    type="button"
                    (click)="applySuggestion(suggestion)"
                    class="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#F4DBCE]/60 hover:text-[#A12F0C] hover:border-[#A12F0C]/40 border border-stone-200 text-stone-700 transition-all text-left active:scale-95 shadow-2xs"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>

              <!-- Submit Button Aligned to the Right -->
              <div class="flex justify-end pt-1">
                <button
                  type="submit"
                  [disabled]="!name.trim() || !content.trim() || isSubmitting"
                  class="uppercase rounded-full text-white font-prata text-xs sm:text-sm tracking-wider min-w-[140px] sm:min-w-[160px] py-2.5 sm:py-3 px-6 sm:px-7 bg-[#A12F0C] hover:bg-[#852509] disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg
                    *ngIf="!isSubmitting"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span>{{
                    isSubmitting ? "Đang gửi..." : "Gửi lời chúc"
                  }}</span>
                </button>
              </div>
            </form>

            <!-- Divider -->
            <div class="my-5 w-full h-[1px] bg-stone-200"></div>

            <!-- Messages List (Classic Tile Style with Seamless Infinite Auto-Scroll & Hidden Scrollbar) -->
            <div
              #messageList
              (mouseenter)="pauseScroll()"
              (mouseleave)="resumeScroll()"
              (touchstart)="pauseScroll()"
              (touchend)="resumeScroll()"
              (touchcancel)="resumeScroll()"
              class="max-h-[240px] sm:max-h-[280px] overflow-y-auto text-start flex flex-col gap-4 pr-1 font-beVietnamPro no-scrollbar select-text cursor-default"
            >
              <div
                *ngFor="let msg of loopedMessages; let idx = index"
                class="border-b border-dashed border-stone-300 pb-4 last:border-b-0"
              >
                <div class="flex items-center justify-between mb-1.5">
                  <h4
                    class="font-bold text-[#2A1810] text-xs sm:text-sm font-prata"
                  >
                    {{ msg.name }}
                  </h4>
                  <span
                    class="text-[10px] sm:text-[11px] text-stone-400 font-light font-beVietnamPro"
                  >
                    {{ msg.createdAt || "Mới đây" }}
                  </span>
                </div>
                <p
                  class="text-stone-700 text-xs sm:text-[13px] leading-relaxed font-beVietnamPro"
                >
                  {{ msg.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class GuestbookComponent implements AfterViewInit, OnDestroy {
  guestbookService = inject(GuestbookService);
  toastService = inject(ToastService);

  @ViewChild("messageList") messageListRef?: ElementRef<HTMLDivElement>;

  name = "";
  content = "";
  isSubmitting = false;
  private isPaused = false;
  private scrollInterval: any;

  wishSuggestions: string[] = [
    "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
    "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trọn vẹn nhé!",
    "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
  ];

  get loopedMessages() {
    const msgs = this.guestbookService.messages();
    if (!msgs || msgs.length === 0) return [];
    if (msgs.length === 1) {
      return [msgs[0], msgs[0], msgs[0], msgs[0]];
    }
    return [...msgs, ...msgs];
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  applySuggestion(suggestion: string) {
    this.content = suggestion;
  }

  private startAutoScroll() {
    this.scrollInterval = setInterval(() => {
      if (this.isPaused || !this.messageListRef) return;
      const el = this.messageListRef.nativeElement;
      if (el.scrollHeight <= el.clientHeight) return;

      const singleSetHeight = el.scrollHeight / 2;

      // Seamless infinite loop: when scrolled past half, reset by exact half height without visual jump
      if (el.scrollTop >= singleSetHeight) {
        el.scrollTop -= singleSetHeight;
      } else {
        el.scrollTop += 1;
      }
    }, 35);
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  submitWish() {
    if (!this.name.trim() || !this.content.trim()) return;

    this.isSubmitting = true;
    this.guestbookService.addMessage(this.name, this.content);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#A12F0C", "#F4DBCE", "#D4AF37"],
    });

    this.toastService.show(
      "Cảm ơn bạn đã gửi lời chúc mừng đến dâu rể! 💕",
      "success",
    );

    this.name = "";
    this.content = "";
    this.isSubmitting = false;

    // Reset scroll position
    setTimeout(() => {
      if (this.messageListRef) {
        this.messageListRef.nativeElement.scrollTop = 0;
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
}
