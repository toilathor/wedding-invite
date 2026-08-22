import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { InvitationData } from "../../models/wedding-data.model";

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
      class="relative bg-white grid py-16 md:py-24 lg:py-28 text-center overflow-hidden reveal"
    >
      <!-- Title & Intro -->
      <div
        class="text-[#2A1810] max-w-[1443px] md:mx-auto mx-[15px] mb-6 md:mb-10"
      >
        <h2
          class="text-[42px] md:text-[56px] leading-[60px] font-pinyonScript bg-transparent w-full text-[#A12F0C] mb-3"
        >
          Trân trọng kính mời
        </h2>
        <div
          class="text-sm md:text-base mt-2 font-beVietnamPro text-stone-700 max-w-2xl mx-auto leading-relaxed"
          [innerHTML]="data.descriptionHtml"
        ></div>
      </div>

      <!-- Time, Date, Location & Countdown Banner Box -->
      <div
        class="relative px-[15px] my-6 md:my-12 py-10 md:py-16 grid justify-center items-center bg-[#FBF7F5] text-[#A12F0C]"
      >
        <!-- Left & Right Ornaments -->
        <img
          src="/assets/images/templates/sangtrong/img/left.png"
          alt="Decor Left"
          class="absolute left-0 top-0 w-[272px] h-[100%] hidden md:block pointer-events-none opacity-80"
        />
        <img
          src="/assets/images/templates/sangtrong/8.png"
          alt="Decor Right"
          class="absolute right-0 bottom-0 w-[272px] h-[100%] hidden md:block pointer-events-none opacity-80"
        />

        <div class="max-w-[1443px] mx-auto z-10">
          <p class="text-xl md:text-[28px] leading-relaxed font-prata">
            {{ data.time }}
          </p>

          <div
            class="flex space-x-[20px] md:space-x-[35px] text-[32px] md:text-[56px] items-center justify-center h-auto pt-8 pb-8 md:pt-10 md:pb-10 font-prata text-[#A12F0C]"
          >
            <span class="leading-none">{{ data.day }}</span>
            <div class="self-stretch w-[1.66px] bg-[#F4DBCE]"></div>
            <span class="leading-none">{{ data.month }}</span>
            <div class="self-stretch w-[1.66px] bg-[#F4DBCE]"></div>
            <span class="leading-none">{{ data.year }}</span>
          </div>

          <p
            class="text-xl md:text-[28px] leading-relaxed font-prata max-w-2xl mx-auto px-4"
          >
            {{ data.location }}
          </p>

          <!-- Countdown Timer -->
          <div class="mt-8 md:mt-10 max-w-lg mx-auto">
            <div class="grid grid-cols-4 gap-3 md:gap-5 px-2">
              <div
                class="bg-[#F4DBCE] rounded-2xl p-3 md:p-4 text-center shadow-sm"
              >
                <span
                  class="block text-2xl md:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.days) }}</span
                >
                <span
                  class="text-[11px] md:text-xs uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Ngày</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-2xl p-3 md:p-4 text-center shadow-sm"
              >
                <span
                  class="block text-2xl md:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.hours) }}</span
                >
                <span
                  class="text-[11px] md:text-xs uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Giờ</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-2xl p-3 md:p-4 text-center shadow-sm"
              >
                <span
                  class="block text-2xl md:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.minutes) }}</span
                >
                <span
                  class="text-[11px] md:text-xs uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Phút</span
                >
              </div>
              <div
                class="bg-[#F4DBCE] rounded-2xl p-3 md:p-4 text-center shadow-sm"
              >
                <span
                  class="block text-2xl md:text-4xl font-bold font-prata text-[#A12F0C]"
                  >{{ formatDigits(timeLeft.seconds) }}</span
                >
                <span
                  class="text-[11px] md:text-xs uppercase tracking-wider text-[#A12F0C] font-semibold"
                  >Giây</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SubDescription & Action Buttons -->
      <div>
        <p
          class="text-base pt-[30px] pb-10 md:pb-[56px] text-[#2A1810] mx-[15px] font-beVietnamPro italic"
        >
          {{ data.subDescription }}
        </p>

        <div
          class="flex md:mb-10 flex-row justify-center items-center gap-4 md:gap-8 px-4 md:px-[15px] pb-10 md:pb-0"
        >
          <button
            type="button"
            (click)="scrollToGuestbook()"
            class="uppercase rounded-full text-white font-prata text-sm md:text-[18px] min-w-[180px] md:min-w-[250px] p-3 md:p-6 bg-[#A12F0C] hover:bg-[#852509] transition-all shadow-md active:scale-95"
          >
            Gửi lời chúc
          </button>
          <button
            type="button"
            id="btn-confirm-attendance"
            (click)="onOpenRsvp.emit()"
            class="uppercase rounded-full font-prata text-sm md:text-[18px] min-w-[180px] md:min-w-[250px] p-3 md:p-6 bg-[#F4DBCE] text-[#A12F0C] hover:bg-[#ebd0c1] transition-all shadow-sm active:scale-95"
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
    const el = document.getElementById("sangtrong-message-id");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}
