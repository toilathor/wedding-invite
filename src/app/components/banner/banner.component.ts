import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BannerData } from "../../models/wedding-data.model";

@Component({
  selector: "app-banner",
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: block;
      overflow: visible;
    }

    .banner-photo-main,
    .banner-photo-secondary {
      height: auto;
      aspect-ratio: 0.8064516;
      flex: 0 1 auto;
    }

    .banner-photo-main {
      width: clamp(180px, 30vw, 500px);
    }

    .banner-photo-secondary {
      width: clamp(110px, 18vw, 310px);
      transform: translateX(clamp(-7rem, -7vw, -3rem));
    }

    @media (max-width: 767px) {
      .banner-photo-main {
        width: clamp(180px, 48vw, 250px);
      }

      .banner-photo-secondary {
        width: clamp(110px, 30vw, 155px);
        transform: translateX(clamp(-4rem, -12vw, -3rem));
      }
    }

    @media (min-width: 768px) and (max-width: 1180px) {
      .banner-section {
        min-height: clamp(600px, 82svh, 680px);
        padding-top: 4rem;
      }

      .banner-grid {
        gap: 2rem;
      }

      .banner-names-block {
        margin-bottom: 4rem;
      }

      .banner-photo-main {
        width: clamp(280px, 29vw, 340px);
      }

      .banner-photo-secondary {
        width: clamp(145px, 16vw, 185px);
        transform: translateX(clamp(-4.5rem, -7vw, -3.5rem));
      }
    }

    @media (min-width: 1024px) and (max-width: 1180px) {
      .banner-kicker {
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
      }

      .banner-name {
        font-size: 5rem;
      }

      .banner-ampersand {
        font-size: 3.5rem;
        margin-block: 0.5rem;
      }

      .banner-date {
        font-size: 3rem;
      }

      .banner-date > * + * {
        margin-left: 1.5rem !important;
      }
    }
  `],
  template: `
    <section
      class="banner-section relative bg-[#FBF7F5] overflow-visible pt-16 sm:pt-20 md:pt-28 lg:pt-36 xl:pt-44 pb-0 reveal min-h-[580px] sm:min-h-[700px] md:min-h-[820px] lg:min-h-[880px] xl:min-h-[920px] flex flex-col justify-end"
    >
      <!-- Top Left Floral Decor (Firmly glued to very top left of page) -->
      <img
        src="/assets/images/templates/sangtrong/7.png"
        alt="Floral Decor Top Left"
        class="absolute top-0 left-0 w-[140px] sm:w-[200px] md:w-[240px] lg:w-[300px] xl:w-[400px] h-auto pointer-events-none z-10 opacity-85 sm:opacity-95"
      />

      <div
        class="banner-grid max-w-[1443px] mx-auto grid md:grid-cols-[1fr,1.3fr] lg:grid-cols-[1.1fr,1.4fr] gap-6 sm:gap-8 md:gap-12 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-12 items-end pb-0 w-full"
      >
        <!-- Left: Titles, Names, Date Flush to Bottom 0px -->
        <div
          class="flex flex-col items-center justify-end pb-0 mb-0 text-center z-20 reveal-left delay-100"
        >
          <!-- Title & Names Block shifted noticeably higher -->
          <div class="banner-names-block mb-16 sm:mb-20 md:mb-32 lg:mb-40 xl:mb-48 flex flex-col items-center">
            <p
                class="banner-kicker text-xs sm:text-base md:text-lg lg:text-2xl font-prata uppercase tracking-[0.25em] text-stone-800 mb-3 sm:mb-5 md:mb-6 lg:mb-8"
            >
              {{ data.title }}
            </p>

            <!-- Couple Names: Short Name -->
            <div class="select-none">
              <h1
                class="banner-name text-[48px] sm:text-[64px] md:text-[70px] lg:text-[108px] xl:text-[120px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
              >
                {{ data.groom }}
              </h1>
              <div
                class="banner-ampersand text-[36px] sm:text-[48px] md:text-[50px] lg:text-[76px] leading-[0.85] my-1 sm:my-2 lg:my-3 items-center flex justify-center font-pinyonScript text-center text-[#A12F0C]"
              >
                &amp;
              </div>
              <h1
                class="banner-name text-[48px] sm:text-[64px] md:text-[70px] lg:text-[108px] xl:text-[120px] leading-[1.05] font-pinyonScript text-center text-[#A12F0C] drop-shadow-[0_1px_2px_rgba(161,47,12,0.12)] whitespace-nowrap"
              >
                {{ data.bride }}
              </h1>
            </div>
          </div>

          <!-- Date Split - Flush to Bottom -->
          <div
            class="banner-date flex space-x-[12px] sm:space-x-[18px] md:space-x-[20px] lg:space-x-[36px] text-[26px] sm:text-[36px] md:text-[46px] lg:text-[74px] items-center h-auto font-prata text-[#F4DBCE] pb-0 mb-0 leading-none"
          >
            <span class="leading-none text-[#F4DBCE]">{{ data.day }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.month }}</span>
            <div class="self-stretch w-[1.5px] lg:w-[2px] bg-[#F4DBCE]"></div>
            <span class="leading-none text-[#F4DBCE]">{{ data.year }}</span>
          </div>
        </div>

        <!-- Right: Overlapping Arched Photos Flush to Bottom -->
        <div class="relative min-w-0 pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-0 mb-0 reveal-right delay-200">
          <div class="flex items-end pl-2 sm:pl-5 lg:pl-8 justify-center pb-0 mb-0 max-w-full">
            <!-- Left Arch Frame (Flush bottom, taller) -->
            <div
              class="banner-photo-main relative mb-0"
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
              class="banner-photo-secondary relative z-30 mb-0"
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
                class="absolute -bottom-4 -right-6 sm:-bottom-6 sm:-right-8 md:-bottom-5 md:-right-7 lg:-bottom-8 lg:-right-10 xl:-bottom-10 xl:-right-14 z-40 w-[85px] sm:w-[120px] md:w-[125px] lg:w-[180px] xl:w-[260px] h-auto pointer-events-none"
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
