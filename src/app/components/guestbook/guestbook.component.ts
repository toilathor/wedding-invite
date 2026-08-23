import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
      class="relative bg-white overflow-hidden py-6 md:py-10 lg:py-12 px-4 sm:px-6 md:px-10 reveal"
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
          class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
        >
          <!-- Left Column: Romantic LOVE Ladder Illustration -->
          <div
            class="md:col-span-4 flex flex-col items-center justify-center text-center reveal-left delay-100"
          >
            <div class="relative group">
              <img
                src="/assets/images/templates/sangtrong/love-ladder.png"
                alt="LOVE Ladder Decoration"
                class="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[280px] max-h-[180px] sm:max-h-[220px] md:max-h-[380px] h-auto object-contain mx-auto drop-shadow-xs transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
              />
            </div>
          </div>

          <!-- Right Column: Sổ lưu bút (Form & Message List with refined typography) -->
          <div
            class="md:col-span-8 flex flex-col justify-center reveal-right delay-200"
          >
            <!-- Section Header -->
            <div class="text-center md:text-left mb-2.5 sm:mb-4 md:mb-5">
              <h2
                class="text-[32px] sm:text-[40px] md:text-[50px] leading-tight font-pinyonScript text-[#A12F0C]"
              >
                Sổ lưu bút
              </h2>
              <p
                class="text-stone-500 text-[11px] sm:text-xs md:text-sm font-beVietnamPro italic mt-0.5"
              >
                Gửi những lời chúc mừng và nhắn nhủ yêu thương đến Quang Thọ
                &amp; Thúy Hiền
              </p>
              <div
                class="w-10 h-[1.5px] bg-[#A12F0C]/30 mt-2 mx-auto md:mx-0"
              ></div>
            </div>

            <!-- Form -->
            <form (ngSubmit)="submitWish()" class="space-y-2.5 font-beVietnamPro">
              <div>
                <input
                  type="text"
                  [(ngModel)]="name"
                  name="name"
                  placeholder="Tên của bạn (tối đa 160 ký tự) *"
                  required
                  class="w-full h-9 sm:h-10 px-3 sm:px-3.5 rounded-xl border border-stone-300 placeholder-stone-400 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all bg-stone-50/50 focus:bg-white shadow-inner"
                />
              </div>

              <!-- Textarea with Bottom-Right Lightbulb Icon Button -->
              <div class="relative">
                <textarea
                  [(ngModel)]="content"
                  name="content"
                  rows="4"
                  placeholder="Nhập lời chúc của bạn (tối đa 3000 ký tự) *"
                  required
                  class="w-full h-[130px] sm:h-[155px] md:h-[175px] p-3 sm:p-3.5 pr-10 pb-9 rounded-2xl border border-stone-300 resize-none placeholder-stone-400 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all bg-stone-50/50 focus:bg-white shadow-inner leading-relaxed"
                >
                </textarea>

                <!-- Lightbulb Icon Button (Bottom-Right Inside Textarea) -->
                <div class="absolute bottom-2.5 right-2.5 z-10">
                  <button
                    type="button"
                    (click)="toggleSuggestions($event)"
                    class="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 border border-amber-200/90 shadow-2xs transition-all active:scale-90 cursor-pointer"
                    title="Gợi ý lời chúc mẫu"
                    aria-label="Gợi ý lời chúc mẫu"
                  >
                    <!-- Glowing Lightbulb Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 2C7.58 2 4 5.58 4 10c0 2.62 1.27 4.96 3.23 6.43.34.25.57.64.63 1.06L8.2 20c.09.56.58 1 1.15 1h5.3c.57 0 1.06-.44 1.15-1l.34-2.51c.06-.42.29-.81.63-1.06C18.73 14.96 20 12.62 20 10c0-4.42-3.58-8-8-8zm-2 20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h-4v1z"
                      />
                    </svg>
                  </button>

                  <!-- Suggestions Popover Menu (Right-Aligned Above Icon Button) -->
                  <div
                    *ngIf="isSuggestionsOpen"
                    (click)="$event.stopPropagation()"
                    class="absolute bottom-full right-0 mb-2 w-[85vw] max-w-[280px] sm:max-w-[340px] bg-white rounded-2xl shadow-2xl border border-[#F4DBCE] p-3 z-50 animate-photo-expand text-left"
                  >
                    <!-- Header with Title & Close button -->
                    <div
                      class="flex items-center justify-between pb-2 mb-2 border-b border-[#F4DBCE]/60"
                    >
                      <div
                        class="flex items-center gap-1.5 text-xs font-semibold text-[#A12F0C] font-prata"
                      >
                        <span>💡 Chọn lời chúc mẫu</span>
                      </div>
                      <button
                        type="button"
                        (click)="isSuggestionsOpen = false"
                        class="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Suggestions List Items -->
                    <div
                      class="flex flex-col gap-1.5 max-h-56 overflow-y-auto no-scrollbar"
                    >
                      <button
                        *ngFor="let suggestion of wishSuggestions"
                        type="button"
                        (click)="applySuggestion(suggestion)"
                        class="text-left text-[11px] sm:text-xs p-2 rounded-xl hover:bg-[#F5E5DC]/60 text-stone-700 hover:text-[#A12F0C] transition-colors border border-transparent hover:border-[#F4DBCE] active:scale-98 leading-relaxed font-beVietnamPro cursor-pointer"
                      >
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button Aligned to the Right -->
              <div class="flex justify-end pt-0.5">
                <button
                  type="submit"
                  [disabled]="!name.trim() || !content.trim() || isSubmitting"
                  class="uppercase rounded-full text-white font-prata text-[11px] sm:text-xs md:text-sm tracking-wider min-w-[120px] sm:min-w-[140px] py-2 sm:py-2.5 px-5 sm:px-6 bg-[#A12F0C] hover:bg-[#852509] disabled:opacity-50 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
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
            <div class="my-3 sm:my-4 w-full h-[1px] bg-stone-200"></div>

            <!-- Messages List (Classic Tile Style with Seamless Infinite Auto-Scroll & Hidden Scrollbar) -->
            <div
              #messageList
              (mouseenter)="pauseScroll()"
              (mouseleave)="resumeScroll()"
              (touchstart)="pauseScroll()"
              (touchend)="resumeScroll()"
              (touchcancel)="resumeScroll()"
              class="max-h-[250px] sm:max-h-[290px] md:max-h-[330px] overflow-y-auto text-start flex flex-col gap-3 pr-1 font-beVietnamPro no-scrollbar select-text cursor-default"
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
  isSuggestionsOpen = false;
  private isPaused = false;
  private scrollInterval: any;

  wishSuggestions: string[] = [
    "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hòa hợp, vẹn tròn yêu thương! 💕",
    "Chúc mừng ngày trọng đại! Hạnh phúc bền lâu, trọn vẹn và an yên nhé! 🌸",
    "Chúc hai bạn bên nhau đầu bạc răng long, sớm đón thiên thần nhỏ đáng yêu! 👶",
    "Trăm năm tình viên mãn, bạc đầu nghĩa phu thê! Chúc hai bạn mãi ngọt ngào! 🥂",
    "Mừng ngày chung đôi! Chúc tổ ấm nhỏ luôn ngập tràn tiếng cười và hạnh phúc! 💐",
  ];

  @HostListener("document:click")
  onDocumentClick() {
    this.isSuggestionsOpen = false;
  }

  toggleSuggestions(event: Event) {
    event.stopPropagation();
    this.isSuggestionsOpen = !this.isSuggestionsOpen;
  }

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
    this.isSuggestionsOpen = false;
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
