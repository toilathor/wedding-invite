import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroData } from '../../models/wedding-data.model';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .edge-watermark {
      --watermark-size: 2.625rem;
      position: absolute;
      z-index: 10;
      width: max-content;
      color: rgb(244 219 206 / 0.8);
      font-family: Prata, serif;
      font-size: var(--watermark-size);
      line-height: 1;
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
    }

    .edge-watermark--left {
      top: 25%;
      left: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    .edge-watermark--right {
      top: 75%;
      right: 0;
      transform: translate(50%, -50%) rotate(-90deg);
    }

    @media (min-width: 768px) {
      .edge-watermark {
        --watermark-size: 5.625rem;
        z-index: 0;
        color: rgb(244 219 206 / 0.7);
      }
    }

    @media (min-width: 1024px) {
      .edge-watermark {
        --watermark-size: 8.125rem;
      }
    }
  `],
  template: `
    <section class="couple-screen-section relative mx-auto bg-[#FBF7F5] overflow-hidden py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20">
      <!-- Full labels are shifted half a line-height beyond the viewport edge. -->
      <div class="edge-watermark edge-watermark--left" aria-hidden="true">GROOM</div>
      <div class="edge-watermark edge-watermark--right" aria-hidden="true">BRIDE</div>

      <!-- Stack the couple vertically on mobile, side-by-side on larger screens. -->
      <div class="z-20 relative grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-y-10 sm:gap-y-12 md:gap-y-0 gap-x-4 sm:gap-x-6 md:gap-x-12 lg:gap-x-20 lg:px-[80px] xl:px-[140px] px-2 sm:px-4 max-w-[1443px] mx-auto">
        <!-- Groom Column -->
        <div class="relative flex flex-col items-center text-center w-full">
          <div class="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[460px] h-[320px] sm:h-[360px] md:h-[420px] lg:h-[530px] xl:h-[580px]">
            <!-- Arched Photo Frame -->
            <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full h-full overflow-hidden bg-white shadow-xl">
              <img
                [src]="data.imageGroom"
                alt="Chú rể"
                class="w-full h-full object-cover"
                style="object-position: center top;"
              />
            </div>
            <!-- Flower Decor Groom, anchored to the photo frame. -->
            <img
              src="/assets/images/templates/sangtrong/4.png"
              alt="Flower Decor Groom"
              class="w-[80px] sm:w-[110px] md:w-[120px] lg:w-[150px] xl:w-[190px] h-auto absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 xl:-bottom-14 -left-4 sm:-left-5 md:-left-6 lg:-left-8 xl:-left-10 z-10 pointer-events-none"
            />
          </div>

          <!-- Label -->
          <p class="text-[11px] sm:text-sm md:text-base lg:text-lg text-stone-700 font-prata mt-2 sm:mt-3 md:mt-5 lg:mt-6 tracking-widest uppercase">
            Chú rể
          </p>

          <!-- Groom Short Name -->
          <h2 class="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px] mt-0.5 sm:mt-1 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
            {{ data.nameGroom }}
          </h2>
        </div>

        <!-- Bride Column -->
        <div class="relative flex flex-col items-center text-center w-full">
          <div class="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[460px] h-[320px] sm:h-[360px] md:h-[420px] lg:h-[530px] xl:h-[580px]">
            <!-- Arched Photo Frame -->
            <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full h-full overflow-hidden bg-white shadow-xl">
              <img
                [src]="data.imageBride"
                alt="Cô dâu"
                class="w-full h-full object-cover"
                style="object-position: 50% 27.03%;"
              />
            </div>
            <!-- Flower Decor Bride, anchored to the photo frame. -->
            <img
              src="/assets/images/templates/sangtrong/5.png"
              alt="Flower Decor Bride"
              class="w-[80px] sm:w-[110px] md:w-[120px] lg:w-[150px] xl:w-[190px] h-auto absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 xl:-bottom-14 -right-4 sm:-right-5 md:-right-6 lg:-right-8 xl:-right-10 z-10 pointer-events-none"
            />
          </div>

          <!-- Label -->
          <p class="text-[11px] sm:text-sm md:text-base lg:text-lg text-stone-700 font-prata mt-2 sm:mt-3 md:mt-5 lg:mt-6 tracking-widest uppercase">
            Cô dâu
          </p>

          <!-- Bride Short Name -->
          <h2 class="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px] mt-0.5 sm:mt-1 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
            {{ data.nameBride }}
          </h2>
        </div>
      </div>
    </section>
  `
})
export class IntroductionComponent {
  @Input({ required: true }) data!: IntroData;
}
