import { Component, EventEmitter, Output, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { RsvpService } from '../../services/rsvp.service';
import confetti from 'canvas-confetti';

interface GuestOption {
  value: number;
  label: string;
  sub: string;
}

@Component({
  selector: 'app-rsvp-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 z-[99999] bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-photo-expand"
      (click)="onClose.emit()">

      <!-- Modal Card Frame with Luxury Arch Top -->
      <div
        class="bg-[#FBF7F5] border-2 border-[#F4DBCE] rounded-3xl md:rounded-[36px] max-w-lg w-full shadow-2xl relative my-auto overflow-hidden text-center transition-all duration-500 ease-out"
        (click)="$event.stopPropagation()">

        <!-- Top Right Flower Ornament -->
        <img
          src="/assets/images/templates/sangtrong/img/04.png"
          alt="Decor Flower"
          class="absolute -top-6 -right-6 w-[120px] md:w-[150px] opacity-80 pointer-events-none z-10"
        />

        <!-- Top Left Corner Accent -->
        <div class="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#F4DBCE]/40 to-transparent pointer-events-none rounded-br-full"></div>

        <!-- Close Button -->
        <button
          type="button"
          (click)="onClose.emit()"
          class="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-800 transition-all shadow-sm active:scale-90"
          title="Đóng">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-6 md:p-8 pt-8 md:pt-10">
          <!-- Header -->
          <div class="mb-6 relative z-10">
            <p class="text-xs uppercase tracking-[0.2em] text-[#A12F0C] font-prata font-semibold mb-1">
              R.S.V.P
            </p>
            <h3 class="text-[38px] md:text-[46px] font-pinyonScript text-[#A12F0C] leading-tight">
              Xác nhận tham dự
            </h3>
            <p class="text-stone-600 text-xs md:text-sm font-beVietnamPro italic mt-1 max-w-xs mx-auto">
              Sự hiện diện của bạn là niềm vinh hạnh to lớn của Quang Thọ &amp; Thúy Hiền
            </p>
            <div class="w-16 h-[1.5px] bg-[#A12F0C]/30 mx-auto mt-3"></div>
          </div>

          <!-- Smooth Sliding Pill Toggle -->
          <div class="relative mb-5 p-1 bg-stone-200/60 rounded-2xl border border-stone-200 flex select-none">
            <!-- Sliding Indicator Highlight -->
            <div
              class="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-out shadow-md"
              [ngClass]="isAttending ? 'left-1 bg-[#A12F0C]' : 'left-[calc(50%+2px)] bg-stone-700'">
            </div>

            <!-- Option 1: Sẽ tham dự -->
            <button
              type="button"
              (click)="isAttending = true"
              class="relative z-10 flex-1 py-2.5 px-3 rounded-xl font-prata text-xs md:text-sm transition-colors duration-300 font-semibold flex items-center justify-center"
              [ngClass]="isAttending ? 'text-white' : 'text-stone-600 hover:text-stone-900'">
              <span>Sẽ tham dự</span>
            </button>

            <!-- Option 2: Rất tiếc vắng mặt -->
            <button
              type="button"
              (click)="isAttending = false"
              class="relative z-10 flex-1 py-2.5 px-3 rounded-xl font-prata text-xs md:text-sm transition-colors duration-300 font-semibold flex items-center justify-center"
              [ngClass]="!isAttending ? 'text-white' : 'text-stone-600 hover:text-stone-900'">
              <span>Rất tiếc vắng mặt</span>
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitRsvp()" class="space-y-4 text-left">
            <!-- Name Input -->
            <div>
              <label class="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1 font-prata">
                Tên của bạn <span class="text-[#A12F0C]">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="name"
                name="rsvpName"
                placeholder="Nhập họ và tên của bạn..."
                required
                class="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F4DBCE] text-stone-800 text-[16px] sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all shadow-inner font-beVietnamPro"
              />
            </div>

            <!-- Phone Input -->
            <div>
              <label class="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1 font-prata">
                Số điện thoại <span class="text-[#A12F0C]">*</span>
              </label>
              <input
                type="tel"
                inputmode="numeric"
                maxlength="10"
                [(ngModel)]="phone"
                (keydown)="onPhoneKeyDown($event)"
                (input)="onPhoneInput($event)"
                (paste)="onPhonePaste($event)"
                (blur)="onPhoneBlur()"
                name="rsvpPhone"
                placeholder="VD: 0912345678 (10 số)..."
                required
                [ngClass]="phoneError ? 'border-red-500 focus:border-red-600 focus:ring-red-500' : 'border-[#F4DBCE] focus:border-[#A12F0C] focus:ring-[#A12F0C]'"
                class="w-full px-4 py-2.5 rounded-xl bg-white border text-stone-800 text-[16px] sm:text-sm focus:outline-none focus:ring-1 transition-all shadow-inner font-beVietnamPro"
              />
              <p *ngIf="phoneError" class="text-[11px] text-red-600 font-beVietnamPro mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span>{{ phoneError }}</span>
              </p>
            </div>

            <!-- Smooth Collapsible Section for Events & Guest Count -->
            <div
              class="grid transition-all duration-400 ease-out"
              [ngStyle]="{
                'grid-template-rows': isAttending ? '1fr' : '0fr',
                'opacity': isAttending ? '1' : '0',
                'transform': isAttending ? 'translateY(0)' : 'translateY(-8px)'
              }">
              <div class="overflow-visible space-y-4 pt-1">
                <!-- Event Selection Cards -->
                <div>
                  <label class="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-2 font-prata">
                    Sự kiện bạn sẽ tham dự
                  </label>
                  <div class="grid grid-cols-1 gap-2">
                    <label
                      (click)="attendParty = !attendParty"
                      class="flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none"
                      [ngClass]="attendParty ? 'bg-[#F4DBCE]/40 border-[#A12F0C] shadow-sm' : 'bg-white border-stone-200 hover:border-stone-300'">
                      <div>
                        <p class="text-xs md:text-sm font-semibold font-prata text-[#2A1810]">Tiệc cưới</p>
                        <p class="text-[11px] text-stone-500 font-beVietnamPro">10:30, Thứ Bảy - 28/11/2026</p>
                      </div>
                      <div class="w-5 h-5 rounded-md border flex items-center justify-center transition-colors duration-200" [ngClass]="attendParty ? 'bg-[#A12F0C] border-[#A12F0C]' : 'border-stone-300 bg-white'">
                        <svg *ngIf="attendParty" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </label>

                    <label
                      (click)="attendGroom = !attendGroom"
                      class="flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none"
                      [ngClass]="attendGroom ? 'bg-[#F4DBCE]/40 border-[#A12F0C] shadow-sm' : 'bg-white border-stone-200 hover:border-stone-300'">
                      <div>
                        <p class="text-xs md:text-sm font-semibold font-prata text-[#2A1810]">Lễ nhà trai</p>
                        <p class="text-[11px] text-stone-500 font-beVietnamPro">09:00, 28/11/2026 - Mỹ Hòa</p>
                      </div>
                      <div class="w-5 h-5 rounded-md border flex items-center justify-center transition-colors duration-200" [ngClass]="attendGroom ? 'bg-[#A12F0C] border-[#A12F0C]' : 'border-stone-300 bg-white'">
                        <svg *ngIf="attendGroom" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </label>

                    <label
                      (click)="attendBride = !attendBride"
                      class="flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none"
                      [ngClass]="attendBride ? 'bg-[#F4DBCE]/40 border-[#A12F0C] shadow-sm' : 'bg-white border-stone-200 hover:border-stone-300'">
                      <div>
                        <p class="text-xs md:text-sm font-semibold font-prata text-[#2A1810]">Lễ nhà gái</p>
                        <p class="text-[11px] text-stone-500 font-beVietnamPro">07:00, 28/11/2026 - La Tháp</p>
                      </div>
                      <div class="w-5 h-5 rounded-md border flex items-center justify-center transition-colors duration-200" [ngClass]="attendBride ? 'bg-[#A12F0C] border-[#A12F0C]' : 'border-stone-300 bg-white'">
                        <svg *ngIf="attendBride" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Custom Luxury Dropdown for Guest Count (Pure Minimalist Typography) -->
                <div class="relative" (click)="$event.stopPropagation()">
                  <label class="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5 font-prata">
                    Số người tham dự
                  </label>

                  <!-- Dropdown Trigger Box -->
                  <div
                    (click)="isDropdownOpen = !isDropdownOpen"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#F4DBCE] hover:border-[#A12F0C] transition-all cursor-pointer shadow-sm select-none">
                    <div>
                      <p class="text-xs md:text-sm font-semibold text-stone-800 font-prata">{{ selectedGuestOption.label }}</p>
                      <p class="text-[11px] text-stone-500 font-beVietnamPro">{{ selectedGuestOption.sub }}</p>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-[#A12F0C] transition-transform duration-300"
                      [class.rotate-180]="isDropdownOpen"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <!-- Custom Floating Menu -->
                  <div
                    *ngIf="isDropdownOpen"
                    class="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl border border-[#F4DBCE] shadow-2xl p-1.5 z-50 animate-photo-expand max-h-60 overflow-y-auto space-y-1">
                    <div
                      *ngFor="let opt of guestOptions"
                      (click)="selectGuest(opt)"
                      class="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors"
                      [ngClass]="selectedGuestCount === opt.value ? 'bg-[#FBF7F5] border border-[#A12F0C]/30 text-[#A12F0C]' : 'hover:bg-stone-50 text-stone-700'">
                      <div>
                        <p class="text-xs md:text-sm font-semibold font-prata">{{ opt.label }}</p>
                        <p class="text-[10px] text-stone-500 font-beVietnamPro">{{ opt.sub }}</p>
                      </div>

                      <svg
                        *ngIf="selectedGuestCount === opt.value"
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-[#A12F0C]"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wish / Message Note -->
            <div class="transition-all duration-300">
              <label class="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1 font-prata">
                {{ isAttending ? 'Gửi lời nhắn đến dâu rể (nếu có)' : 'Lời chúc mừng gửi dâu rể' }}
              </label>
              <textarea
                [(ngModel)]="note"
                name="rsvpNote"
                rows="2"
                [placeholder]="isAttending ? 'Nhập lời nhắn hoặc lưu ý...' : 'Gửi lời chúc mừng hạnh phúc đến hai bạn...'"
                class="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F4DBCE] text-stone-800 text-[16px] sm:text-sm focus:outline-none focus:border-[#A12F0C] focus:ring-1 focus:ring-[#A12F0C] transition-all resize-none shadow-inner font-beVietnamPro"></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                [disabled]="!name.trim() || !phone.trim() || isSubmitting"
                class="w-full py-3.5 rounded-full bg-[#A12F0C] hover:bg-[#852509] disabled:opacity-50 text-white font-prata text-sm md:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                <svg *ngIf="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{{ isSubmitting ? 'Đang gửi...' : (isAttending ? 'Gửi xác nhận tham dự' : 'Gửi lời chúc mừng') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RsvpModalComponent {
  @Output() onClose = new EventEmitter<void>();
  private toastService = inject(ToastService);
  private rsvpService = inject(RsvpService);

  isAttending = true;
  name = '';
  phone = '';
  phoneError = '';
  attendParty = true;
  attendGroom = false;
  attendBride = false;
  selectedGuestCount = 1;
  isDropdownOpen = false;
  note = '';
  isSubmitting = false;

  guestOptions: GuestOption[] = [
    { value: 1, label: '1 người', sub: 'Đi một mình' },
    { value: 2, label: '2 người', sub: 'Đi cùng người thương / bạn bè' },
    { value: 3, label: '3 người', sub: 'Đi cùng người thân' },
    { value: 4, label: '4 người', sub: 'Đi cùng gia đình' },
    { value: 5, label: '5 người trở lên', sub: 'Đi cùng đại gia đình' },
  ];

  get selectedGuestOption(): GuestOption {
    return this.guestOptions.find(o => o.value === this.selectedGuestCount) || this.guestOptions[0];
  }

  selectGuest(opt: GuestOption) {
    this.selectedGuestCount = opt.value;
    this.isDropdownOpen = false;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onPhoneKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Enter',
      'Home',
      'End',
    ];
    // Cho phép các phím điều hướng và tổ hợp Ctrl / Cmd + A, C, V, X...
    if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const isTextSelected = (input.selectionEnd ?? 0) - (input.selectionStart ?? 0) > 0;

    // Chặn tất cả các ký tự không phải chữ số 0-9
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Giới hạn đúng 10 chữ số
    if (input.value.length >= 10 && !isTextSelected) {
      event.preventDefault();
    }
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/[^0-9]/g, '');
    // Giới hạn tối đa 10 chữ số
    if (val.length > 10) {
      val = val.slice(0, 10);
    }
    this.phone = val;
    input.value = val;

    if (this.phoneError) {
      const validation = this.rsvpService.validatePhone(this.phone);
      if (validation.isValid) {
        this.phoneError = '';
      }
    }
  }

  onPhonePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = (event.clipboardData?.getData('text') || '').trim();
    let cleaned = pasteData.replace(/[\s.\-()]/g, '');
    // Tự động chuyển đầu số +84 hoặc 84 về 0
    if (cleaned.startsWith('+84')) {
      cleaned = '0' + cleaned.slice(3);
    } else if (cleaned.startsWith('84') && cleaned.length === 11) {
      cleaned = '0' + cleaned.slice(2);
    }
    // Chỉ giữ lại chữ số và cắt tối đa 10 số
    cleaned = cleaned.replace(/[^0-9]/g, '').slice(0, 10);
    this.phone = cleaned;
    this.onPhoneBlur();
  }

  onPhoneBlur() {
    if (this.phone.trim()) {
      const validation = this.rsvpService.validatePhone(this.phone);
      this.phoneError = validation.isValid ? '' : (validation.errorMessage || 'Số điện thoại không hợp lệ.');
    } else {
      this.phoneError = '';
    }
  }

  async submitRsvp() {
    if (!this.name.trim() || !this.phone.trim() || this.isSubmitting) return;

    const phoneValidation = this.rsvpService.validatePhone(this.phone);
    if (!phoneValidation.isValid) {
      this.phoneError = phoneValidation.errorMessage || 'Số điện thoại không hợp lệ.';
      this.toastService.show(this.phoneError, 'error');
      return;
    }

    this.phoneError = '';
    this.isSubmitting = true;

    try {
      const res = await this.rsvpService.submitRsvp({
        name: this.name,
        phone: this.phone,
        isAttending: this.isAttending,
        attendParty: this.attendParty,
        attendGroom: this.attendGroom,
        attendBride: this.attendBride,
        guestsCount: this.selectedGuestCount,
        note: this.note,
      });

      if (!res.success) {
        this.toastService.show(res.error || 'Có lỗi xảy ra, vui lòng thử lại!', 'error');
        this.isSubmitting = false;
        return;
      }

      if (this.isAttending) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A12F0C', '#F4DBCE', '#D4AF37']
        });
        this.toastService.show(`Cảm ơn ${this.name.trim()}! Chúng mình rất mong chờ được đón tiếp bạn. 💕`, 'success', 4000);
      } else {
        this.toastService.show(`Cảm ơn ${this.name.trim()} đã gửi lời chúc tốt đẹp đến hai đứa mình! 💌`, 'info', 4000);
      }

      setTimeout(() => {
        this.isSubmitting = false;
        this.onClose.emit();
      }, 600);
    } catch (error) {
      console.error('Lỗi khi gửi xác nhận RSVP:', error);
      this.toastService.show('Không thể gửi xác nhận, vui lòng thử lại sau!', 'error');
      this.isSubmitting = false;
    }
  }
}
