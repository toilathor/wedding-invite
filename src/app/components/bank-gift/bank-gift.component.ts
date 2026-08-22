import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankData } from '../../models/wedding-data.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bank-gift',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="bank-gift-section" class="w-full relative bg-[#FBF7F5] reveal">
      <!-- Side Flora Ornaments -->
      <img
        src="/assets/images/templates/sangtrong/9.png"
        alt="Decor Left"
        class="absolute bottom-[35%] -left-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block pointer-events-none"
      />
      <img
        src="/assets/images/templates/sangtrong/8.png"
        alt="Decor Right"
        class="absolute bottom-[35%] -right-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block pointer-events-none"
      />

      <div class="max-w-[1443px] mx-auto relative px-[15px]">
        <!-- Mobile Title -->
        <div class="md:hidden block text-center pt-10 pb-4 reveal">
          <h2 class="text-[48px] font-pinyonScript italic text-[#A12F0C]">
            Mừng cưới
          </h2>
          <div class="mt-4 max-w-xl mx-auto text-center text-stone-600 font-light font-beVietnamPro text-sm px-4 leading-relaxed">
            {{ data.description }}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-end pt-4 md:pt-[100px] h-auto md:gap-8">
          <!-- Groom Bank (Desktop: Left | Mobile: Bottom) -->
          <div class="hidden md:flex flex-col items-end text-right pb-8 md:pb-16 px-[15px] reveal-left delay-100">
            <h3 class="z-20 text-xl md:text-2xl font-prata mb-4 text-[#A12F0C]">
              Mừng cưới đến chú rể
            </h3>
            <div class="w-full flex flex-row items-center justify-end gap-6">
              <!-- QR Code -->
              <div class="flex-shrink-0 cursor-pointer" (click)="selectedQr = data.imageBankGroom">
                <img
                  [src]="data.imageBankGroom"
                  alt="QR Chú rể"
                  class="w-[100px] h-[100px] object-cover border border-[#F4DBCE] rounded-lg shadow-sm"
                />
              </div>
              <!-- Text details -->
              <div class="flex flex-col items-start text-left gap-1">
                <p class="font-prata font-semibold text-stone-800 text-sm">{{ data.bankNameGroom }}</p>
                <p class="font-prata font-bold text-base text-[#A12F0C]">{{ data.nameGroom }}</p>
                <div class="flex items-center gap-2">
                  <p class="font-prata font-medium text-stone-700 text-sm">{{ data.bankNumberGroom }}</p>
                  <button
                    type="button"
                    (click)="copyToClipboard(data.bankNumberGroom, 'chú rể')"
                    class="text-[#A12F0C] hover:text-[#7A2207] p-1"
                    title="Sao chép STK">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Center Arched Photo -->
          <div class="relative md:w-[402px] mx-auto pt-0 md:pt-[72px] bg-[#FBF7F5] overflow-visible reveal delay-200">
            <div class="relative rounded-t-full border border-[#A12F0C] md:w-[402px] w-[300px] h-[360px] md:h-[465px] overflow-hidden shadow-xl mx-auto bg-white">
              <img
                [src]="data.coverImage"
                alt="Ảnh cưới"
                class="w-full h-full object-cover"
                style="object-position: 50% 39.62%;"
              />
            </div>
          </div>

          <!-- Bride Bank (Desktop: Right) -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left py-8 md:py-16 px-[15px] reveal-right delay-300">
            <h3 class="z-20 text-xl md:text-2xl font-prata mb-4 w-full text-center md:text-left text-[#A12F0C]">
              Mừng cưới đến cô dâu
            </h3>
            <div class="w-full flex flex-row items-center justify-center md:justify-start gap-6">
              <!-- Text details -->
              <div class="flex flex-col items-start text-left gap-1">
                <p class="font-prata font-semibold text-stone-800 text-sm">{{ data.bankNameBride }}</p>
                <p class="font-prata font-bold text-base text-[#A12F0C]">{{ data.nameBride }}</p>
                <div class="flex items-center gap-2">
                  <p class="font-prata font-medium text-stone-700 text-sm">{{ data.bankNumberBride }}</p>
                  <button
                    type="button"
                    (click)="copyToClipboard(data.bankNumberBride, 'cô dâu')"
                    class="text-[#A12F0C] hover:text-[#7A2207] p-1"
                    title="Sao chép STK">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <!-- QR Code -->
              <div class="flex-shrink-0 cursor-pointer" (click)="selectedQr = data.imageBankBride">
                <img
                  [src]="data.imageBankBride"
                  alt="QR Cô dâu"
                  class="w-[100px] h-[100px] object-cover border border-[#F4DBCE] rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          <!-- Mobile Groom Bank -->
          <div class="flex flex-col items-center text-center pb-10 px-[15px] md:hidden reveal">
            <h3 class="z-20 text-xl font-prata mb-4 w-full text-center text-[#A12F0C]">
              Mừng cưới đến chú rể
            </h3>
            <div class="w-full flex flex-row items-center justify-center gap-6">
              <div class="flex-shrink-0 cursor-pointer" (click)="selectedQr = data.imageBankGroom">
                <img
                  [src]="data.imageBankGroom"
                  alt="QR Chú rể"
                  class="w-[100px] h-[100px] object-cover border border-[#F4DBCE] rounded-lg shadow-sm"
                />
              </div>
              <div class="flex flex-col items-start text-left gap-1">
                <p class="font-prata font-semibold text-stone-800 text-sm">{{ data.bankNameGroom }}</p>
                <p class="font-prata font-bold text-base text-[#A12F0C]">{{ data.nameGroom }}</p>
                <div class="flex items-center gap-2">
                  <p class="font-prata font-medium text-stone-700 text-sm">{{ data.bankNumberGroom }}</p>
                  <button
                    type="button"
                    (click)="copyToClipboard(data.bankNumberGroom, 'chú rể')"
                    class="text-[#A12F0C] p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Title & Description at bottom -->
      <div class="py-[75px] text-center px-[15px] md:block hidden bg-[#FBF7F5] reveal">
        <h2 class="text-[56px] md:text-[72px] font-pinyonScript italic text-[#A12F0C]">
          Mừng cưới
        </h2>
        <div class="mt-6 max-w-xl mx-auto text-center text-stone-600 font-light font-beVietnamPro text-base leading-relaxed">
          <p>{{ data.description }}</p>
        </div>
      </div>

      <!-- QR Zoom Modal -->
      <div
        *ngIf="selectedQr"
        (click)="selectedQr = null"
        class="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative" (click)="$event.stopPropagation()">
          <button
            (click)="selectedQr = null"
            class="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h4 class="font-playfair font-bold text-xl text-[#A12F0C] mb-4">Mã QR Chuyển Khoản</h4>
          <img [src]="selectedQr" alt="Mã QR" class="w-full h-auto rounded-xl mb-4" />
          <p class="text-xs text-stone-500">Quét mã QR qua ứng dụng ngân hàng bất kỳ</p>
        </div>
      </div>
    </div>
  `
})
export class BankGiftComponent {
  @Input({ required: true }) data!: BankData;
  toastService = inject(ToastService);
  selectedQr: string | null = null;

  copyToClipboard(accountNumber: string, target: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(accountNumber).then(() => {
        this.toastService.show(`Đã sao chép số tài khoản ${target}: ${accountNumber}`, 'success');
      }).catch(() => {
        this.fallbackCopy(accountNumber, target);
      });
    } else {
      this.fallbackCopy(accountNumber, target);
    }
  }

  private fallbackCopy(text: string, target: string) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.toastService.show(`Đã sao chép số tài khoản ${target}: ${text}`, 'success');
  }
}
