import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BannerData } from "../../models/wedding-data.model";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative bg-[#FBF7F5] overflow-hidden py-4 sm:py-6 md:py-8 lg:py-12 reveal"
    >
      <!-- Top Left Floral Decor -->
      <img
        src="/assets/images/templates/sangtrong/7.png"
        alt="Floral Decor Top Left"
        class="absolute top-0 left-0 max-w-[130px] max-h-[120px] sm:max-w-[188px] sm:max-h-[174px] md:max-w-[327px] md:max-h-[303px] pointer-events-none z-10 opacity-80 sm:opacity-90"
      />

      <div
        class="max-w-[1443px] mx-auto grid md:grid-cols-[1fr,1.3fr] gap-4 sm:gap-6 md:gap-10 lg:gap-16 px-4 sm:px-6 md:px-8 items-center"
      >
        <!-- Left: Titles, Names, Date -->
        <div
          class="flex flex-col items-center justify-center pt-2 sm:pt-4 md:pt-8 text-center z-20 reveal-left delay-100"
        >
          <p
            class="text-xs sm:text-base md:text-xl lg:text-2xl font-prata uppercase tracking-[0.2em] text-stone-800"
          >
            {{ data.title }}
          </p>

          <!-- Couple Names: Short Name -->
          <div class="mt-2 sm:mt-4 md:mt-6 mb-3 sm:mb-6 md:mb-10 select-none">
            <h1
              class="text-[46px] sm:text-[60px] md:text-[76px] lg:text-[90px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
            >
              {{ data.groom }}
            </h1>
            <div
              class="text-[34px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[0.85] my-1 sm:my-2 items-center flex justify-center font-pinyonScript text-center text-[#A12F0C]"
            >
              &amp;
            </div>
            <h1
              class="text-[46px] sm:text-[60px] md:text-[76px] lg:text-[90px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
            >
              {{ data.bride }}
            </h1>
          </div>

          <!-- Date Split -->
          <div
            class="flex space-x-[12px] sm:space-x-[18px] md:space-x-[28px] text-[24px] sm:text-[32px] md:text-[54px] lg:text-[64px] items-center h-auto font-prata text-[#F4DBCE]"
          >
            <span class="leading-none text-[#F4DBCE]">{{ data.day }}</span>
            <div class="self-stretch w-[1.5px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.month }}</span>
            <div class="self-stretch w-[1.5px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.year }}</span>
          </div>
        </div>

        <!-- Right: Overlapping Arched Photos -->
        <div class="relative py-2 sm:py-4 md:py-6 reveal-right delay-200">
          <div class="flex items-end pl-2 sm:pl-5 justify-center">
            <!-- Left Arch Frame -->
            <div
              class="relative w-[160px] h-[195px] sm:w-[220px] sm:h-[270px] md:w-[360px] md:h-[440px] lg:w-[440px] lg:h-[530px]"
            >
              <div
                class="absolute w-full h-full z-20 p-0 rounded-t-full border-[1px] border-[#A12F0C] overflow-hidden bg-white shadow-lg"
              >
                <img
                  [src]="data.image1"
                  alt="Ảnh cưới"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="z-10 absolute bottom-0 rounded-t-full border-[1px] border-[#A12F0C] w-full h-full"
              ></div>
              <div
                class="z-10 absolute bottom-0 translate-x-3 sm:translate-x-4 md:translate-x-6 rounded-t-full border-r-[1px] border-[#A12F0C] w-full h-full"
              ></div>
            </div>

            <!-- Right Overlapping Arch Frame -->
            <div
              class="relative w-[95px] h-[115px] sm:w-[135px] sm:h-[165px] md:w-[210px] md:h-[260px] lg:w-[260px] lg:h-[310px] z-30 -translate-x-12 sm:-translate-x-16 md:-translate-x-20"
            >
              <div
                class="absolute w-full h-full z-20 rounded-t-full border-[2px] border-[#A12F0C] p-0 overflow-hidden bg-white shadow-xl"
              >
                <img
                  [src]="data.image2"
                  alt="Ảnh cưới"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="z-10 absolute bottom-0 rounded-t-full border-[1px] border-[#A12F0C] w-full h-full"
              ></div>
            </div>
          </div>

          <!-- Bottom Right Flower Decor -->
          <img
            src="/assets/images/templates/sangtrong/img/04.png"
            alt="Decor Bottom Right"
            class="absolute -bottom-4 sm:-bottom-6 md:-bottom-10 right-0 z-30 w-[80px] h-[68px] sm:w-[115px] sm:h-[96px] md:w-[200px] md:h-[170px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  `,
})
export class BannerComponent {
  @Input({ required: true }) data!: BannerData;
}
