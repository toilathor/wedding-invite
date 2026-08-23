import { CommonModule } from "@angular/common";
import { Component, HostListener, Input } from "@angular/core";
import { WeddingEventItem } from "../../models/wedding-data.model";

@Component({
  selector: "app-events",
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: block;
      position: relative;
      z-index: 30;
    }
  `],
  template: `
    <section
      class="relative grid pt-0 pb-16 sm:pb-20 md:pb-16 text-center bg-[#FBF7F5] overflow-visible reveal"
    >
      <!-- Side Corner Decorations -->
      <img
        src="/assets/images/templates/sangtrong/img/left.png"
        alt="Ornament Left"
        class="absolute top-0 left-0 md:w-[280px] md:h-[340px] lg:w-[340px] lg:h-[400px] w-[170px] h-[180px] pointer-events-none opacity-85 z-0"
      />
      <img
        src="/assets/images/templates/sangtrong/img/right.png"
        alt="Ornament Right"
        class="absolute -bottom-0 -right-0 md:w-[260px] md:h-[320px] lg:w-[320px] lg:h-[380px] w-[160px] h-[170px] pointer-events-none opacity-85"
      />

      <div
        class="max-w-[1443px] mx-auto py-2 md:py-6 lg:py-8 w-full z-10 px-4 md:px-8 lg:px-12"
      >
        <!-- Title -->
        <h2
          class="text-center text-[34px] sm:text-[44px] md:text-[58px] lg:text-[70px] md:leading-[70px] font-pinyonScript mb-4 sm:mb-8 md:mb-12 lg:mb-16 text-[#A12F0C] reveal"
        >
          Sự kiện cưới
        </h2>

        <!-- Events List -->
        <div class="flex flex-col relative max-w-6xl mx-auto w-full">
          <!-- Continuous Connecting Line on Desktop (Centered behind badges) -->
          <!-- Top calculation: icon height (95px) + gap (20px) + half badge height (~24px) = ~139px -->
          <div
            class="hidden md:block absolute left-[15%] right-[15%] h-[2px] bg-[#A12F0C] top-[139px] z-0 pointer-events-none"
          ></div>

          <div
            class="flex flex-col md:flex-row relative gap-10 md:gap-4 lg:gap-8 justify-evenly z-10"
          >
            <div
              *ngFor="let item of events; let idx = index"
              [ngClass]="'reveal delay-' + (idx + 1) * 100"
              [style.z-index]="openCalendarIndex === idx ? 50 : (20 - idx)"
              class="relative flex-1 flex flex-col justify-center items-center gap-3.5 sm:gap-4 md:gap-5"
            >
              <!-- Icon -->
              <div
                class="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] md:w-[95px] md:h-[95px] flex items-center justify-center"
              >
                <img
                  [src]="item.icon"
                  [alt]="item.title"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Event Title Badge -->
              <div class="w-full relative flex justify-center items-center">
                <!-- Badge Button -->
                <div
                  class="relative z-10 uppercase rounded-full text-white font-prata text-xs sm:text-sm md:text-base min-w-[160px] sm:min-w-[180px] md:min-w-[190px] lg:min-w-[230px] px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 bg-[#A12F0C] shadow-md text-center"
                >
                  {{ item.title }}
                </div>
              </div>

              <!-- Time, Date, Address -->
              <div class="px-3 sm:px-4 text-center">
                <div
                  class="flex text-base sm:text-lg md:text-xl gap-2.5 sm:gap-3 md:gap-4 justify-center items-center text-stone-800 font-prata"
                >
                  <div>{{ item.displayTime }}</div>
                  <p class="w-[12px] h-[1.5px] bg-stone-400"></p>
                  <div
                    class="flex space-x-1.5 sm:space-x-2 md:space-x-3 items-center h-auto text-stone-800"
                  >
                    <span class="leading-none">{{ getEventDay(item) }}</span>
                    <div class="self-stretch w-[1.5px] bg-stone-300"></div>
                    <span class="leading-none">{{ getEventMonth(item) }}</span>
                    <div class="self-stretch w-[1.5px] bg-stone-300"></div>
                    <span class="leading-none">{{ getEventYear(item) }}</span>
                  </div>
                </div>

                <div
                  class="font-prata text-xs sm:text-sm md:text-sm text-stone-600 font-normal pt-2 leading-relaxed max-w-xs mx-auto"
                >
                  <div>{{ item.address }}</div>
                </div>

                <!-- Action Buttons: Chỉ đường & Thêm vào lịch -->
                <div
                  class="mt-3 sm:mt-4 flex items-center justify-center gap-0 relative"
                  [style.z-index]="openCalendarIndex === idx ? 50 : 1"
                >
                  <!-- Chỉ đường Google Maps -->
                  <a
                    [href]="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center text-xs md:text-xs font-semibold uppercase tracking-wider text-white bg-[#A12F0C] hover:bg-[#852509] rounded-none px-4 py-2 sm:py-2.5 transition-all font-prata shadow-xs active:scale-95 whitespace-nowrap"
                  >
                    Chỉ đường
                  </a>

                  <!-- Thêm vào lịch Button -->
                  <button
                    type="button"
                    (click)="toggleCalendarMenu(idx, $event)"
                    class="inline-flex items-center justify-center gap-1.5 text-xs md:text-xs font-semibold uppercase tracking-wider text-[#A12F0C] hover:text-[#7A2207] bg-[#F5E5DC] hover:bg-[#EAD4C7] rounded-none px-4 py-2 sm:py-2.5 transition-all font-prata shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
                    title="Thêm sự kiện vào Google / Apple Calendar"
                  >
                    <span>Thêm vào lịch</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 transition-transform duration-300"
                      [class.rotate-180]="openCalendarIndex === idx"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <!-- Calendar Options Menu Popover (Right-Aligned Flush with Button) -->
                  <div
                    *ngIf="openCalendarIndex === idx"
                    (click)="$event.stopPropagation()"
                    class="absolute top-full right-0 mt-2 w-52 sm:w-56 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-[#F4DBCE] p-2 z-[9999] animate-photo-expand text-left"
                  >
                    <!-- Pointer Arrow (Positioned above 'Thêm vào lịch' button) -->
                    <div
                      class="absolute -top-1.5 right-[48px] sm:right-[56px] w-3 h-3 bg-white border-t border-l border-[#F4DBCE] rotate-45 pointer-events-none"
                    ></div>

                    <!-- Google Calendar Option -->
                    <a
                      [href]="getGoogleCalendarUrl(item)"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="openCalendarIndex = null"
                      class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-[#F4DBCE]/40 hover:text-[#A12F0C] transition-colors text-xs font-medium group relative z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-[#A12F0C]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
                        />
                      </svg>
                      <span>Google Calendar</span>
                    </a>

                    <!-- Apple / Outlook (.ics) Option -->
                    <button
                      type="button"
                      (click)="downloadIcs(item)"
                      class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-[#F4DBCE]/40 hover:text-[#A12F0C] transition-colors text-xs font-medium group text-left relative z-10 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-stone-800 group-hover:text-[#A12F0C]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-0.93 2.74 1.01.08 2.03-.5 2.64-1.24z"
                        />
                      </svg>
                      <span>Apple Calendar (.ics)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EventsComponent {
  @Input({ required: true }) events!: WeddingEventItem[];

  openCalendarIndex: number | null = null;

  getEventDay(item: WeddingEventItem): string {
    const parts = item.displayDate.split(".").map((p) => p.trim());
    return parts[0] || "28";
  }

  getEventMonth(item: WeddingEventItem): string {
    const parts = item.displayDate.split(".").map((p) => p.trim());
    return parts[1] || "11";
  }

  getEventYear(item: WeddingEventItem): string {
    const parts = item.displayDate.split(".").map((p) => p.trim());
    return parts[2] || "2026";
  }

  toggleCalendarMenu(index: number, event: Event) {
    event.stopPropagation();
    this.openCalendarIndex = this.openCalendarIndex === index ? null : index;
  }

  @HostListener("document:click")
  closeMenu() {
    this.openCalendarIndex = null;
  }

  getGoogleCalendarUrl(item: WeddingEventItem): string {
    const title = `${item.title} - Đám Cưới Quang Thọ & Thúy Hiền`;
    const details = `Trân trọng kính mời bạn đến tham dự ${item.title} của Quang Thọ & Thúy Hiền.\nĐịa điểm: ${item.address}`;
    const location = item.address;

    const startDate = new Date(item.dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");
    const dates = `${formatUtc(startDate)}/${formatUtc(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title,
    )}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  }

  downloadIcs(item: WeddingEventItem) {
    this.openCalendarIndex = null;

    const title = `${item.title} - Đám Cưới Quang Thọ & Thúy Hiền`;
    const description = `Trân trọng kính mời bạn đến tham dự ${item.title} của Quang Thọ & Thúy Hiền.\nĐịa điểm: ${item.address}`;
    const location = item.address;

    const startDate = new Date(item.dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//QuangThoThuyHien//Wedding//VI",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-${startDate.getTime()}-${Math.floor(Math.random() * 10000)}@linhvuongthuhang.com`,
      `DTSTAMP:${formatUtc(new Date())}`,
      `DTSTART:${formatUtc(startDate)}`,
      `DTEND:${formatUtc(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${item.title.toLowerCase().replace(/\s+/g, "-")}-dam-cuoi.ics`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
