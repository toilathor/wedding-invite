import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { BankData } from "../../models/wedding-data.model";
import { PageViewService } from "../../services/pageview.service";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "app-bank-gift",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Container chính có nền be #FBF7F5 -->
    <div
      id="bank-gift-section"
      class="w-full relative bg-[#FBF7F5] overflow-visible pt-8 sm:pt-10 md:pt-48 lg:pt-64 pb-0 mb-0 flex flex-col justify-end"
    >
      <!-- Khung ảnh vòm trên Mobile: Nằm tự nhiên ở nền be #FBF7F5 phía trên, không nằm trong dải trắng -->
      <div class="block md:hidden mx-auto overflow-visible reveal delay-200 z-30 pb-0 flex justify-center">
        <div
          class="rounded-t-full border border-b-0 border-[#A12F0C] w-[240px] h-[310px] sm:w-[280px] sm:h-[360px] overflow-hidden shadow-none mx-auto bg-white"
        >
          <img
            [src]="data.coverImage"
            alt="Ảnh cưới"
            class="w-full h-full object-cover"
            style="object-position: 50% 39.62%;"
          />
        </div>
      </div>

      <!-- DẢI MÀU TRẮNG ÔM KHÍT (Chỉ cao đúng bằng khối nội dung Mừng cưới QR/STK) -->
      <div
        class="w-full relative bg-white z-10 pt-4 sm:pt-5 md:pt-4 pb-4 md:pb-0 mb-0"
      >
        <!-- Side Flora Ornaments bám sát theo baseline đáy của dải trắng này -->
        <img
          src="/assets/images/templates/sangtrong/9.png"
          alt="Decor Left"
          class="absolute bottom-0 -left-2 md:w-[220px] md:h-[260px] lg:w-[250px] lg:h-[290px] w-[100px] h-[120px] hidden md:block pointer-events-none z-20"
        />
        <img
          src="/assets/images/templates/sangtrong/8.png"
          alt="Decor Right"
          class="absolute bottom-0 -right-2 md:w-[220px] md:h-[260px] lg:w-[250px] lg:h-[290px] w-[100px] h-[120px] hidden md:block pointer-events-none z-20"
        />

        <div class="max-w-[1443px] mx-auto px-4 sm:px-[15px]">
          <!-- 3 KHỐI BẰNG FLEXBOX (Desktop): Căn đáy items-end, tâm giữa và không bao giờ bị lệch hay vỡ -->
          <div
            class="flex flex-col md:flex-row items-center md:items-end justify-center md:gap-4 lg:gap-8 max-w-5xl mx-auto pb-0 mb-0"
          >
            <!-- 1. Mừng cưới đến chú rể (Desktop: Bên trái - CĂN PHẢI) -->
            <div
              class="hidden md:flex flex-1 flex-col items-end text-right pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16 mb-0 px-2 reveal-left delay-100"
            >
              <h3
                class="z-20 text-lg md:text-xl lg:text-2xl font-prata mb-4 w-full text-right text-[#A12F0C] leading-none"
              >
                Mừng cưới đến chú rể
              </h3>
              <div
                class="w-full flex flex-row items-center justify-end gap-3 lg:gap-4"
              >
                <div class="flex flex-col items-end text-right gap-1">
                  <p class="font-prata font-semibold text-stone-800 text-xs">
                    {{ data.bankNameGroom }}
                  </p>
                  <p
                    class="font-prata font-bold text-sm lg:text-base text-[#A12F0C]"
                  >
                    {{ data.nameGroom }}
                  </p>
                  <div class="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      (click)="copyToClipboard(data.bankNumberGroom, 'chú rể')"
                      class="text-[#A12F0C] hover:text-[#7A2207] p-0.5"
                      title="Sao chép STK"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <p class="font-prata font-medium text-stone-700 text-xs">
                      {{ data.bankNumberGroom }}
                    </p>
                  </div>
                </div>
                <div
                  class="flex-shrink-0 cursor-pointer"
                  (click)="openQrModal(data.imageBankGroom)"
                >
                  <img
                    [src]="data.imageBankGroom"
                    alt="QR Chú rể"
                    class="w-[85px] h-[85px] lg:w-[95px] lg:h-[95px] object-cover border border-[#F4DBCE] rounded-lg shadow-sm hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>

            <!-- 2. Khung ảnh vòm ĐỨNG GIỮA (Chỉ hiển thị trên Desktop: absolute nhô cao chạm sát đáy dải trắng) -->
            <div
              class="hidden md:flex relative flex-shrink-0 mx-auto overflow-visible reveal delay-200 pb-0 mb-0 z-30 justify-center items-end"
            >
              <div
                class="absolute bottom-0 rounded-t-full border border-b-0 border-[#A12F0C] md:w-[300px] md:h-[390px] lg:w-[360px] lg:h-[460px] overflow-hidden shadow-none mx-auto bg-white"
              >
                <img
                  [src]="data.coverImage"
                  alt="Ảnh cưới"
                  class="w-full h-full object-cover"
                  style="object-position: 50% 39.62%;"
                />
              </div>
              <!-- Placeholder desktop để giữ chiều rộng -->
              <div
                class="w-[240px] sm:w-[280px] md:w-[300px] lg:w-[360px] h-0 pointer-events-none"
              ></div>
            </div>

            <!-- 3. Mừng cưới đến cô dâu (Desktop: Bên phải - CĂN TRÁI) -->
            <div
              class="hidden md:flex flex-1 flex-col items-start text-left pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16 mb-0 px-2 reveal-right delay-300"
            >
              <h3
                class="z-20 text-lg md:text-xl lg:text-2xl font-prata mb-4 w-full text-left text-[#A12F0C] leading-none"
              >
                Mừng cưới đến cô dâu
              </h3>
              <div
                class="w-full flex flex-row items-center justify-start gap-3 lg:gap-4"
              >
                <div
                  class="flex-shrink-0 cursor-pointer"
                  (click)="openQrModal(data.imageBankBride)"
                >
                  <img
                    [src]="data.imageBankBride"
                    alt="QR Cô dâu"
                    class="w-[85px] h-[85px] lg:w-[95px] lg:h-[95px] object-cover border border-[#F4DBCE] rounded-lg shadow-sm hover:scale-105 transition-transform"
                  />
                </div>
                <div class="flex flex-col items-start text-left gap-1">
                  <p class="font-prata font-semibold text-stone-800 text-xs">
                    {{ data.bankNameBride }}
                  </p>
                  <p
                    class="font-prata font-bold text-sm lg:text-base text-[#A12F0C]"
                  >
                    {{ data.nameBride }}
                  </p>
                  <div class="flex items-center justify-start gap-1.5">
                    <p class="font-prata font-medium text-stone-700 text-xs">
                      {{ data.bankNumberBride }}
                    </p>
                    <button
                      type="button"
                      (click)="copyToClipboard(data.bankNumberBride, 'cô dâu')"
                      class="text-[#A12F0C] hover:text-[#7A2207] p-0.5 cursor-pointer"
                      title="Sao chép STK"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Bank Cards (Groom & Bride - Centered, Beautiful Symmetry) -->
            <div
              class="w-full flex flex-col items-center gap-6 py-6 px-4 md:hidden"
            >
              <!-- Mobile Groom Bank -->
              <div
                class="w-full max-w-sm flex flex-col items-center text-center reveal delay-100"
              >
                <h3
                  class="z-20 text-base sm:text-lg font-prata mb-3 w-full text-center text-[#A12F0C]"
                >
                  Mừng cưới đến chú rể
                </h3>
                <div
                  class="w-full flex flex-row items-center justify-center gap-3.5 sm:gap-4 bg-[#FBF7F5]/70 p-3.5 rounded-2xl border border-[#F4DBCE]/60 shadow-xs"
                >
                  <div
                    class="flex-shrink-0 cursor-pointer"
                    (click)="openQrModal(data.imageBankGroom)"
                  >
                    <img
                      [src]="data.imageBankGroom"
                      alt="QR Chú rể"
                      class="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] object-cover border border-[#F4DBCE] rounded-xl shadow-xs"
                    />
                  </div>
                  <div class="flex flex-col items-start text-left gap-0.5">
                    <p class="font-prata font-semibold text-stone-800 text-xs">
                      {{ data.bankNameGroom }}
                    </p>
                    <p
                      class="font-prata font-bold text-sm sm:text-base text-[#A12F0C]"
                    >
                      {{ data.nameGroom }}
                    </p>
                    <div class="flex items-center gap-1.5 pt-0.5">
                      <p class="font-prata font-medium text-stone-700 text-xs">
                        {{ data.bankNumberGroom }}
                      </p>
                      <button
                        type="button"
                        (click)="copyToClipboard(data.bankNumberGroom, 'chú rể')"
                        class="text-[#A12F0C] hover:text-[#7A2207] p-1 rounded-md bg-white border border-[#F4DBCE] shadow-2xs active:scale-90 transition-transform cursor-pointer"
                        title="Sao chép STK"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile Bride Bank -->
              <div
                class="w-full max-w-sm flex flex-col items-center text-center reveal delay-200"
              >
                <h3
                  class="z-20 text-base sm:text-lg font-prata mb-3 w-full text-center text-[#A12F0C]"
                >
                  Mừng cưới đến cô dâu
                </h3>
                <div
                  class="w-full flex flex-row items-center justify-center gap-3.5 sm:gap-4 bg-[#FBF7F5]/70 p-3.5 rounded-2xl border border-[#F4DBCE]/60 shadow-xs"
                >
                  <div
                    class="flex-shrink-0 cursor-pointer"
                    (click)="openQrModal(data.imageBankBride)"
                  >
                    <img
                      [src]="data.imageBankBride"
                      alt="QR Cô dâu"
                      class="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] object-cover border border-[#F4DBCE] rounded-xl shadow-xs"
                    />
                  </div>
                  <div class="flex flex-col items-start text-left gap-0.5">
                    <p class="font-prata font-semibold text-stone-800 text-xs">
                      {{ data.bankNameBride }}
                    </p>
                    <p
                      class="font-prata font-bold text-sm sm:text-base text-[#A12F0C]"
                    >
                      {{ data.nameBride }}
                    </p>
                    <div class="flex items-center gap-1.5 pt-0.5">
                      <p class="font-prata font-medium text-stone-700 text-xs">
                        {{ data.bankNumberBride }}
                      </p>
                      <button
                        type="button"
                        (click)="copyToClipboard(data.bankNumberBride, 'cô dâu')"
                        class="text-[#A12F0C] hover:text-[#7A2207] p-1 rounded-md bg-white border border-[#F4DBCE] shadow-2xs active:scale-90 transition-transform cursor-pointer"
                        title="Sao chép STK"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LAYOUT RIÊNG BIỆT: Tiêu đề & Lời chúc Mừng cưới (Nền #FBF7F5, độ cao x1.5: py-10 sm:py-14 md:py-16) -->
    <div
      class="w-full bg-[#FBF7F5] py-10 sm:py-14 md:py-16 text-center px-4 sm:px-[15px] reveal"
    >
      <h2
        class="text-[46px] sm:text-[56px] md:text-[64px] lg:text-[70px] font-pinyonScript italic text-[#A12F0C] leading-tight"
      >
        Mừng cưới
      </h2>
      <div
        class="mt-2.5 max-w-xl mx-auto text-center text-stone-600 font-light font-beVietnamPro text-sm sm:text-base leading-relaxed px-4"
      >
        <p>{{ data.description }}</p>
      </div>
    </div>

    <!-- QR Zoom Modal -->
    <div
      *ngIf="selectedQr"
      (click)="closeQrModal()"
      class="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative"
        (click)="$event.stopPropagation()"
      >
        <button
          (click)="closeQrModal()"
          class="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h4 class="font-playfair font-bold text-xl text-[#A12F0C] mb-4">
          Mã QR Chuyển Khoản
        </h4>
        <img
          [src]="selectedQr"
          alt="Mã QR"
          class="w-full h-auto rounded-xl mb-4"
        />
        <p class="text-xs text-stone-500">
          Quét mã QR qua ứng dụng ngân hàng bất kỳ
        </p>
      </div>
    </div>
  `,
})
export class BankGiftComponent {
  @Input({ required: true }) data!: BankData;
  toastService = inject(ToastService);
  private pageViewService = inject(PageViewService);

  selectedQr: string | null = null;

  openQrModal(qrUrl: string) {
    this.selectedQr = qrUrl;
    this.pageViewService.setLocked(true);
  }

  closeQrModal() {
    this.selectedQr = null;
    this.pageViewService.setLocked(false);
  }

  copyToClipboard(accountNumber: string, target: string) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(accountNumber)
        .then(() => {
          this.toastService.show(
            `Đã sao chép số tài khoản ${target}: ${accountNumber}`,
            "success",
          );
        })
        .catch(() => {
          this.fallbackCopy(accountNumber, target);
        });
    } else {
      this.fallbackCopy(accountNumber, target);
    }
  }

  private fallbackCopy(text: string, target: string) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    this.toastService.show(
      `Đã sao chép số tài khoản ${target}: ${text}`,
      "success",
    );
  }
}
