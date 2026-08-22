import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-5 right-5 z-[999999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      <div
        *ngFor="let t of toastService.toasts()"
        class="pointer-events-auto bg-[#2A1810] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#F4DBCE]/20 flex items-center justify-between gap-3 animate-fadeIn transition-all">
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
          <span class="text-xs md:text-sm font-medium leading-snug">{{ t.message }}</span>
        </div>
        <button
          type="button"
          (click)="toastService.remove(t.id)"
          class="text-stone-400 hover:text-white transition-colors p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
