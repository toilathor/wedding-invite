import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BannerData } from "../../models/wedding-data.model";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative bg-[#FBF7F5] overflow-hidden py-10 md:py-16 lg:py-20 reveal"
    >
      <!-- Top Left Floral Decor -->
      <img
        src="/assets/images/templates/sangtrong/7.png"
        alt="Floral Decor Top Left"
        class="absolute top-0 left-0 max-w-[188px] max-h-[174px] md:max-w-[327px] md:max-h-[303px] pointer-events-none z-10 opacity-90"
      />

      <div
        class="max-w-[1443px] mx-auto grid md:grid-cols-[1fr,1.4fr] gap-10 md:gap-14 lg:gap-20 px-4 sm:px-6 md:px-10 items-center"
      >
        <!-- Left: Titles, Names, Date -->
        <div
          class="flex flex-col items-center justify-center pt-6 md:pt-12 lg:pt-16 text-center z-20 reveal-left delay-100"
        >
          <p
            class="text-sm md:text-xl lg:text-2xl font-prata uppercase tracking-[0.2em] text-stone-800"
          >
            {{ data.title }}
          </p>

          <!-- Couple Names: Short Name -->
          <div class="mt-5 md:mt-8 mb-8 md:mb-14 select-none">
            <h1
              class="text-[60px] sm:text-[72px] md:text-[84px] lg:text-[96px] leading-[1.08] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
            >
              {{ data.groom }}
            </h1>
            <div
              class="text-[48px] md:text-[64px] leading-[0.85] my-2 items-center flex justify-center font-pinyonScript text-center text-[#A12F0C]"
            >
              &amp;
            </div>
            <h1
              class="text-[60px] sm:text-[72px] md:text-[84px] lg:text-[96px] leading-[1.08] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
            >
              {{ data.bride }}
            </h1>
          </div>

          <!-- Date Split -->
          <div
            class="flex space-x-[15px] md:space-x-[30px] text-[32px] md:text-[72px] items-center h-auto font-prata text-[#F4DBCE]"
          >
            <span class="leading-none text-[#F4DBCE]">{{ data.day }}</span>
            <div class="self-stretch w-[1.66px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.month }}</span>
            <div class="self-stretch w-[1.66px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.year }}</span>
          </div>
        </div>

        <!-- Right: Overlapping Arched Photos -->
        <div class="relative py-6 md:py-8 reveal-right delay-200">
          <div class="flex items-end pl-2 sm:pl-5 justify-center">
            <!-- Left Arch Frame -->
            <div
              class="relative w-[210px] h-[250px] sm:w-[260px] sm:h-[310px] md:w-[460px] md:h-[560px] lg:w-[490px] lg:h-[590px]"
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
                class="z-10 absolute bottom-0 translate-x-4 md:translate-x-8 rounded-t-full border-r-[1px] border-[#A12F0C] w-full h-full"
              ></div>
            </div>

            <!-- Right Overlapping Arch Frame -->
            <div
              class="relative w-[125px] h-[150px] sm:w-[160px] sm:h-[190px] md:w-[270px] md:h-[325px] lg:w-[290px] lg:h-[345px] z-30 -translate-x-16 sm:-translate-x-20 md:-translate-x-24"
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
            class="absolute -bottom-6 md:-bottom-12 right-0 z-30 w-[115px] h-[96px] md:w-[240px] md:h-[200px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  `,
})
export class BannerComponent {
  @Input({ required: true }) data!: BannerData;
}
