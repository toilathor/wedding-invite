import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BannerData } from "../../models/wedding-data.model";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative bg-[#FBF7F5] overflow-visible pt-16 sm:pt-20 md:pt-28 lg:pt-36 xl:pt-44 pb-0 reveal min-h-[580px] sm:min-h-[700px] md:min-h-[820px] lg:min-h-[880px] xl:min-h-[920px] flex flex-col justify-end"
    >
      <!-- Top Left Floral Decor (Firmly glued to very top left of page) -->
      <img
        src="/assets/images/templates/sangtrong/7.png"
        alt="Floral Decor Top Left"
        class="absolute -top-0 -left-0 max-w-[140px] max-h-[130px] sm:max-w-[200px] sm:max-h-[185px] md:max-w-[340px] md:max-h-[315px] lg:max-w-[400px] lg:max-h-[370px] pointer-events-none z-10 opacity-85 sm:opacity-95"
      />

      <div
        class="max-w-[1443px] mx-auto grid md:grid-cols-[1fr,1.3fr] lg:grid-cols-[1.1fr,1.4fr] gap-6 sm:gap-8 md:gap-12 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-12 items-end pb-0 w-full"
      >
        <!-- Left: Titles, Names, Date Flush to Bottom 0px -->
        <div
          class="flex flex-col items-center justify-end pb-0 mb-0 text-center z-20 reveal-left delay-100"
        >
          <!-- Title & Names Block shifted noticeably higher -->
          <div class="mb-16 sm:mb-20 md:mb-32 lg:mb-40 xl:mb-48 flex flex-col items-center">
            <p
              class="text-xs sm:text-base md:text-xl lg:text-2xl font-prata uppercase tracking-[0.25em] text-stone-800 mb-3 sm:mb-5 md:mb-8"
            >
              {{ data.title }}
            </p>

            <!-- Couple Names: Short Name -->
            <div class="select-none">
              <h1
                class="text-[48px] sm:text-[64px] md:text-[84px] lg:text-[108px] xl:text-[120px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
              >
                {{ data.groom }}
              </h1>
              <div
                class="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[76px] leading-[0.85] my-1 sm:my-2 lg:my-3 items-center flex justify-center font-pinyonScript text-center text-[#A12F0C]"
              >
                &amp;
              </div>
              <h1
                class="text-[48px] sm:text-[64px] md:text-[84px] lg:text-[108px] xl:text-[120px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
              >
                {{ data.bride }}
              </h1>
            </div>
          </div>

          <!-- Date Split - Flush to Bottom -->
          <div
            class="flex space-x-[12px] sm:space-x-[18px] md:space-x-[28px] lg:space-x-[36px] text-[26px] sm:text-[36px] md:text-[58px] lg:text-[74px] items-center h-auto font-prata text-[#F4DBCE] pb-0 mb-0 leading-none"
          >
            <span class="leading-none text-[#F4DBCE]">{{ data.day }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.month }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.year }}</span>
          </div>
        </div>

        <!-- Right: Overlapping Arched Photos Flush to Bottom -->
        <div class="relative pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-0 mb-0 reveal-right delay-200">
          <div class="flex items-end pl-2 sm:pl-5 lg:pl-8 justify-center pb-0 mb-0">
            <!-- Left Arch Frame (Flush bottom, taller) -->
            <div
              class="relative w-[180px] h-[225px] sm:w-[250px] sm:h-[310px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[620px] xl:w-[550px] xl:h-[680px] mb-0"
            >
              <div
                class="absolute bottom-0 w-full h-full z-20 p-0 rounded-t-full border-[1px] lg:border-[1.5px] border-b-0 border-[#A12F0C] overflow-hidden bg-white shadow-none"
              >
                <img
                  [src]="data.image1"
                  alt="Ảnh cưới"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="z-10 absolute bottom-0 rounded-t-full border-[1px] border-b-0 border-[#A12F0C] w-full h-full"
              ></div>
              <div
                class="z-10 absolute bottom-0 translate-x-3 sm:translate-x-4 md:translate-x-6 lg:translate-x-8 rounded-t-full border-r-[1px] border-[#A12F0C] w-full h-full"
              ></div>
            </div>

            <!-- Right Overlapping Arch Frame (Flush bottom, taller) -->
            <div
              class="relative w-[110px] h-[135px] sm:w-[155px] sm:h-[190px] md:w-[240px] md:h-[300px] lg:w-[310px] lg:h-[385px] xl:w-[340px] xl:h-[425px] z-30 -translate-x-12 sm:-translate-x-16 md:-translate-x-20 lg:-translate-x-28 mb-0"
            >
              <div
                class="absolute bottom-0 w-full h-full z-20 rounded-t-full border-[2px] border-b-0 border-[#A12F0C] p-0 overflow-hidden bg-white shadow-none"
              >
                <img
                  [src]="data.image2"
                  alt="Ảnh cưới"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="z-10 absolute bottom-0 rounded-t-full border-[1px] border-b-0 border-[#A12F0C] w-full h-full"
              ></div>

              <!-- Bottom Right Flower Decor - Attached directly to photo corner -->
              <img
                src="/assets/images/templates/sangtrong/img/04.png"
                alt="Decor Bottom Right"
                class="absolute -bottom-4 -right-6 sm:-bottom-6 sm:-right-8 md:-bottom-8 md:-right-12 lg:-bottom-10 lg:-right-14 z-40 w-[85px] h-[72px] sm:w-[120px] sm:h-[100px] md:w-[200px] md:h-[170px] lg:w-[260px] lg:h-[220px] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BannerComponent {
  @Input({ required: true }) data!: BannerData;
}
