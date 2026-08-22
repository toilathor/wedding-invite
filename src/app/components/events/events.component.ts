import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingEventItem } from '../../models/wedding-data.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative grid py-[88px] text-center bg-[#FBF7F5] overflow-hidden reveal">
      <!-- Side Corner Decorations -->
      <img
        src="/assets/images/templates/sangtrong/img/left.png"
        alt="Ornament Left"
        class="absolute -top-0 -left-0 md:w-[280px] md:h-[356px] w-[199px] h-[208px] pointer-events-none"
      />
      <img
        src="/assets/images/templates/sangtrong/img/right.png"
        alt="Ornament Right"
        class="absolute -bottom-0 -right-0 md:w-[280px] md:h-[356px] w-[199px] h-[208px] pointer-events-none"
      />

      <div class="max-w-[1443px] mx-auto py-[40px] md:py-[60px] w-full z-10 px-4 md:px-[15px]">
        <!-- Title -->
        <h2 class="text-center text-[48px] md:text-[72px] md:leading-[90px] font-pinyonScript mb-8 md:mb-14 text-[#A12F0C] reveal">
          Sự kiện cưới
        </h2>

        <!-- Events List -->
        <div class="flex flex-col relative">
          <div class="flex flex-col md:flex-row relative gap-[80px] md:gap-0 justify-evenly z-10">
            <div
              *ngFor="let item of events; let idx = index"
              [ngClass]="'reveal delay-' + ((idx + 1) * 100)"
              class="z-20 flex-1 flex flex-col justify-center items-center gap-[24px] md:gap-[30px]">

              <!-- Icon -->
              <div class="w-[100px] h-[100px] md:w-[110px] md:h-[110px] flex items-center justify-center">
                <img
                  [src]="item.icon"
                  [alt]="item.title"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Event Title Badge with GUARANTEED Center-Aligned Connecting Line -->
              <div class="w-full relative flex justify-center items-center">
                <!-- Segment 1: From center of 1st badge to right -->
                <div
                  *ngIf="idx === 0"
                  class="hidden md:block absolute left-1/2 right-0 h-[2px] bg-[#A12F0C] top-1/2 -translate-y-1/2 z-0">
                </div>

                <!-- Segment 2: Across entire middle column -->
                <div
                  *ngIf="idx === 1"
                  class="hidden md:block absolute left-0 right-0 h-[2px] bg-[#A12F0C] top-1/2 -translate-y-1/2 z-0">
                </div>

                <!-- Segment 3: From left to center of 3rd badge -->
                <div
                  *ngIf="idx === 2"
                  class="hidden md:block absolute left-0 right-1/2 h-[2px] bg-[#A12F0C] top-1/2 -translate-y-1/2 z-0">
                </div>

                <!-- Badge Button (Sits on top of the centered connecting line) -->
                <div class="relative z-10 uppercase rounded-full text-white font-prata text-sm md:text-[18px] min-w-[180px] md:min-w-[250px] px-6 py-3.5 md:py-4 bg-[#A12F0C] shadow-md text-center">
                  {{ item.title }}
                </div>
              </div>

              <!-- Time, Date, Address -->
              <div class="px-4 md:px-9 text-center">
                <div class="flex text-xl md:text-2xl gap-3 md:gap-5 justify-center items-center text-stone-800 font-prata">
                  <div>{{ item.displayTime }}</div>
                  <p class="w-[15px] h-[1.5px] bg-stone-400"></p>
                  <div class="flex space-x-2 md:space-x-[18px] items-center h-auto text-stone-800">
                    <span class="leading-none">{{ getEventDay(item) }}</span>
                    <div class="self-stretch w-[1.5px] bg-stone-300"></div>
                    <span class="leading-none">{{ getEventMonth(item) }}</span>
                    <div class="self-stretch w-[1.5px] bg-stone-300"></div>
                    <span class="leading-none">{{ getEventYear(item) }}</span>
                  </div>
                </div>

                <div class="font-prata text-sm md:text-base text-stone-600 font-normal pt-3 leading-relaxed">
                  <div>{{ item.address }}</div>
                </div>

                <!-- Action Buttons: Chỉ đường & Thêm vào lịch -->
                <div class="mt-5 flex items-center justify-center gap-3 flex-wrap relative">
                  <!-- Chỉ đường Google Maps -->
                  <a
                    [href]="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#A12F0C] hover:text-[#7A2207] border border-[#A12F0C]/40 hover:border-[#A12F0C] rounded-full px-4 py-2 transition-all font-prata shadow-sm bg-white/90 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Chỉ đường
                  </a>

                  <!-- Thêm vào lịch Dropdown Trigger -->
                  <div class="relative">
                    <button
                      type="button"
                      (click)="toggleCalendarMenu(idx, $event)"
                      class="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white bg-[#A12F0C] hover:bg-[#852509] rounded-full px-4 py-2 transition-all font-prata shadow-sm active:scale-95"
                      title="Thêm sự kiện vào Google / Apple Calendar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                        <line x1="12" y1="14" x2="12" y2="18"/>
                        <line x1="10" y1="16" x2="14" y2="16"/>
                      </svg>
                      Thêm vào lịch
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform" [class.rotate-180]="openCalendarIndex === idx" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <!-- Calendar Options Menu Popover -->
                    <div
                      *ngIf="openCalendarIndex === idx"
                      (click)="$event.stopPropagation()"
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-white rounded-2xl shadow-xl border border-[#F4DBCE] p-2 z-50 animate-photo-expand text-left">
                      <!-- Google Calendar Option -->
                      <a
                        [href]="getGoogleCalendarUrl(item)"
                        target="_blank"
                        rel="noopener noreferrer"
                        (click)="openCalendarIndex = null"
                        class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FBF7F5] text-stone-700 text-xs md:text-sm font-medium transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#A12F0C]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        <span>Google Calendar</span>
                      </a>

                      <!-- Apple Calendar / iCal Option -->
                      <button
                        type="button"
                        (click)="downloadIcs(item)"
                        class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#FBF7F5] text-stone-700 text-xs md:text-sm font-medium transition-colors text-left">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-0.93 2.74 1.01.08 2.03-.5 2.64-1.24z"/>
                        </svg>
                        <span>Apple Calendar (iCal)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class EventsComponent {
  @Input({ required: true }) events!: WeddingEventItem[];

  openCalendarIndex: number | null = null;

  getEventDay(item: WeddingEventItem): string {
    const parts = item.displayDate.split('.').map(p => p.trim());
    return parts[0] || '28';
  }

  getEventMonth(item: WeddingEventItem): string {
    const parts = item.displayDate.split('.').map(p => p.trim());
    return parts[1] || '11';
  }

  getEventYear(item: WeddingEventItem): string {
    const parts = item.displayDate.split('.').map(p => p.trim());
    return parts[2] || '2026';
  }

  toggleCalendarMenu(index: number, event: Event) {
    event.stopPropagation();
    this.openCalendarIndex = this.openCalendarIndex === index ? null : index;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openCalendarIndex = null;
  }

  getGoogleCalendarUrl(item: WeddingEventItem): string {
    const title = `${item.title} - Đám Cưới Quang Thọ & Thúy Hiền`;
    const details = `Trân trọng kính mời bạn đến tham dự ${item.title} của Quang Thọ & Thúy Hiền.\nĐịa điểm: ${item.address}`;
    const location = item.address;

    const startDate = new Date(item.dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
    const dates = `${formatUtc(startDate)}/${formatUtc(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  }

  downloadIcs(item: WeddingEventItem) {
    this.openCalendarIndex = null;

    const title = `${item.title} - Đám Cưới Quang Thọ & Thúy Hiền`;
    const description = `Trân trọng kính mời bạn đến tham dự ${item.title} của Quang Thọ & Thúy Hiền.\nĐịa điểm: ${item.address}`;
    const location = item.address;

    const startDate = new Date(item.dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//QuangThoThuyHien//Wedding//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${startDate.getTime()}-${Math.floor(Math.random() * 10000)}@linhvuongthuhang.com`,
      `DTSTAMP:${formatUtc(new Date())}`,
      `DTSTART:${formatUtc(startDate)}`,
      `DTEND:${formatUtc(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.title.toLowerCase().replace(/\s+/g, '-')}-dam-cuoi.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
