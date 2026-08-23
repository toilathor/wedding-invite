import { Component, EventEmitter, Output, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViewService } from '../../services/pageview.service';

@Component({
  selector: 'app-quick-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-3 right-2.5 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-[9990] flex flex-col items-end select-none" (click)="$event.stopPropagation()">
      <!-- Speed Dial Menu Items (Expanded Upwards on the Right) -->
      <div
        *ngIf="isOpen"
        class="flex flex-col items-end gap-1.5 sm:gap-2 mb-2 sm:mb-3 animate-photo-expand">

        <!-- 1. Gửi lời chúc -->
        <button
          type="button"
          (click)="scrollToGuestbook()"
          class="flex items-center gap-2 pl-3 pr-1.5 py-1 sm:pl-3.5 sm:pr-2 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#A12F0C] hover:bg-[#A12F0C] hover:text-white shadow-xl transition-all group active:scale-95 cursor-pointer">
          <span class="font-prata text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide">Gửi lời chúc</span>
          <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F4DBCE]/60 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </button>

        <!-- 2. Xác nhận tham dự -->
        <button
          type="button"
          (click)="triggerRsvp()"
          class="flex items-center gap-2 pl-3 pr-1.5 py-1 sm:pl-3.5 sm:pr-2 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#A12F0C] hover:bg-[#A12F0C] hover:text-white shadow-xl transition-all group active:scale-95 cursor-pointer">
          <span class="font-prata text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide">Xác nhận tham dự</span>
          <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F4DBCE]/60 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </button>

        <!-- 3. Mừng cưới -->
        <button
          type="button"
          (click)="scrollToBankGift()"
          class="flex items-center gap-2 pl-3 pr-1.5 py-1 sm:pl-3.5 sm:pr-2 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#A12F0C] hover:bg-[#A12F0C] hover:text-white shadow-xl transition-all group active:scale-95 cursor-pointer">
          <span class="font-prata text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide">Mừng cưới</span>
          <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F4DBCE]/60 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
        </button>
      </div>

      <!-- Main Quick Action Trigger Button -->
      <button
        type="button"
        (click)="toggleMenu()"
        [ngClass]="isOpen ? 'bg-stone-800' : 'bg-[#A12F0C]'"
        class="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        title="Menu tác vụ nhanh">

        <!-- Hamburger Icon (When Closed) -->
        <svg *ngIf="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <!-- Close 'X' Icon (When Open) -->
        <svg *ngIf="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <!-- Subtle Pulse Ring when Closed -->
        <span *ngIf="!isOpen" class="absolute -inset-1 rounded-full bg-[#A12F0C]/25 animate-ping pointer-events-none"></span>
      </button>
    </div>
  `
})
export class QuickMenuComponent {
  @Output() onOpenRsvp = new EventEmitter<void>();

  private pageViewService = inject(PageViewService);
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click')
  closeMenu() {
    this.isOpen = false;
  }

  scrollToGuestbook() {
    this.isOpen = false;
    this.pageViewService.goToPage(7);
  }

  scrollToBankGift() {
    this.isOpen = false;
    this.pageViewService.goToPage(8);
  }

  triggerRsvp() {
    this.isOpen = false;
    this.onOpenRsvp.emit();
  }
}
