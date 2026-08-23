import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { InvitationData } from "../../models/wedding-data.model";
import { PageViewService } from "../../services/pageview.service";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: "app-invitation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative bg-white grid py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 text-center overflow-hidden reveal"
    >
      <!-- Title & Intro -->
      <div
        class="text-[#2A1810] max-w-[1443px] mx-auto px-4 sm:px-6 mb-3 sm:mb-6 md:mb-8 lg:mb-10"
      >
        <h2
          class="text-[34px] sm:text-[44px] md:text-[56px] lg:text-[68px] leading-tight font-pinyonScript bg-transparent w-full text-[#A12F0C] mb-2 lg:mb-3"
        >
          Trân trọng kính mời
        </h2>
        <div
          class="text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 font-beVietnamPro text-stone-700 max-w-3xl mx-auto leading-relaxed px-2 font-light"
          [innerHTML]="data.descriptionHtml"
        ></div>
      </div>

      <!-- Time, Date, Location & Countdown Banner Box -->
      <div
        class="relative px-3 sm:px-6 my-2 sm:my-4 md:my-6 lg:my-8 py-6 sm:py-8 md:py-12 lg:py-14 grid justify-center items-center bg-[#FBF7F5] text-[#A12F0C]"
      >
        <!-- Left & Right Ornaments -->
        <img
          src="/assets/images/templates/sangtrong/img/left.png"
          alt="Decor Left"
          class="absolute left-0 top-0 w-[180px] md:w-[272px] lg:w-[340px] h-[100%] hidden md:block pointer-events-none opacity-85"
        />
        <img
          src="/assets/images/templates/sangtrong/8.png"
          alt="Decor Right"
          class="absolute right-0 bottom-0 w-[180px] md:w-[272px] lg:w-[340px] h-[100%] hidden md:block pointer-events-none opacity-85"
        />

        <div class="max-w-[1443px] mx-auto z-10 w-full">
          <p class="text-base sm:text-xl md:text-[26px] lg:text-[32px] leading-relaxed font-prata">
            {{ data.time }}
          </p>

          <div
            class="flex space-x-[12px] sm:space-x-[20px] md:space-x-[35px] lg:space-x-[45px] text-[26px] sm:text-[34px] md:text-[52px] lg:text-[68px] items-center justify-center h-auto pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-6 md:pb-6 lg:pt-8 lg:pb-8 font-prata text-[#A12F0C]"
          >
            <span class="leading-none">{{ data.day }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none">{{ data.month }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none">{{ data.year }}</span>
          </div>

          <p
            class="text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed font-prata max-w-3xl mx-auto px-4"
          >
            {{ data.location }}
          </p>

          <!-- Countdown Timer -->
          <div class="mt-4 sm:mt-6 md:mt-8 lg:mt-10 max-w-xl mx-auto">
            <div class="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 px-2">
              <div
                class="bg-[#F4DBCE] rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3.5 md:p-4 lg:p-5 text-center shadow-xs"
              >
                <span
                  class="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.days) }}</span
                >
                <span
                  class="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Ngày</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3.5 md:p-4 lg:p-5 text-center shadow-xs"
              >
                <span
                  class="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.hours) }}</span
                >
                <span
                  class="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Giờ</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3.5 md:p-4 lg:p-5 text-center shadow-xs"
              >
                <span
                  class="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.minutes) }}</span
                >
                <span
                  class="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Phút</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3.5 md:p-4 lg:p-5 text-center shadow-xs"
              >
                <span
                  class="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.seconds) }}</span
                >
                <span
                  class="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Giây</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SubDescription & Action Buttons -->
      <div class="px-3">
        <p
          class="text-xs sm:text-sm md:text-base lg:text-lg pt-2 sm:pt-4 pb-4 sm:pb-6 md:pb-8 text-[#2A1810] max-w-2xl mx-auto px-4 font-beVietnamPro italic"
        >
          {{ data.subDescription }}
        </p>

        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-4 md:gap-6 px-4 max-w-lg lg:max-w-xl mx-auto"
        >
          <button
            type="button"
            (click)="scrollToGuestbook()"
            class="w-full sm:w-auto uppercase rounded-full text-white font-prata text-xs sm:text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4.5 bg-[#A12F0C] hover:bg-[#852509] transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Gửi lời chúc
          </button>
          <button
            type="button"
            id="btn-confirm-attendance"
            (click)="onOpenRsvp.emit()"
            class="w-full sm:w-auto uppercase rounded-full font-prata text-xs sm:text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4.5 bg-[#F4DBCE] text-[#A12F0C] hover:bg-[#ebd0c1] transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Xác nhận tham dự
          </button>
        </div>
      </div>
    </section>
  `,
})
export class InvitationComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: InvitationData;
  @Output() onOpenRsvp = new EventEmitter<void>();

  private pageViewService = inject(PageViewService);

  timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private timerInterval: any;

  ngOnInit() {
    this.calculateTimeLeft();
    this.timerInterval = setInterval(() => {
      this.calculateTimeLeft();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private calculateTimeLeft() {
    const target = new Date(this.data.countdownDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference > 0) {
      this.timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  formatDigits(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  scrollToGuestbook() {
    this.pageViewService.goToPage(7);
  }
}
