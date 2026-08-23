import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroData } from '../../models/wedding-data.model';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative mx-auto bg-[#FBF7F5] overflow-hidden py-4 sm:py-6 md:py-10 lg:py-14 reveal">
      <!-- Watermark Background Labels on Desktop -->
      <div class="absolute left-0 top-0 w-full h-[574px] bg-[#FBF7F5] pointer-events-none select-none z-0">
        <h1 class="hidden md:block absolute top-1/3 -left-[12%] text-[80px] lg:text-[110px] font-prata rotate-90 text-[#F4DBCE]">
          GROOM
        </h1>
      </div>
      <div class="z-0 absolute right-0 bottom-0 w-[488px] h-[574px] bg-[#FBF7F5] pointer-events-none select-none">
        <h1 class="hidden md:block absolute top-1/3 -right-[40%] text-[80px] lg:text-[110px] font-prata -rotate-90 text-[#F4DBCE]">
          BRIDE
        </h1>
      </div>

      <!-- Main 2-Column Grid Side-by-Side (Both Mobile & Desktop) -->
      <div class="z-20 relative grid grid-cols-2 justify-center items-start lg:px-[100px] xl:px-[180px] gap-3 sm:gap-6 md:gap-10 lg:gap-16 px-2 sm:px-4 max-w-[1443px] mx-auto">
        <!-- Groom Column -->
        <div class="relative flex flex-col items-center text-center reveal-left delay-100 w-full">
          <!-- Flower Decor Groom -->
          <img
            src="/assets/images/templates/sangtrong/4.png"
            alt="Flower Decor Groom"
            class="w-[65px] h-[65px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] absolute bottom-12 sm:bottom-16 md:bottom-20 -left-2 sm:-left-4 md:-left-8 z-10 pointer-events-none"
          />
          <!-- Arched Photo Frame -->
          <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full max-w-[145px] sm:max-w-[220px] md:max-w-[320px] lg:max-w-[380px] h-[190px] sm:h-[280px] md:h-[400px] lg:h-[480px] overflow-hidden bg-white shadow-md">
            <img
              [src]="data.imageGroom"
              alt="Chú rể"
              class="w-full h-full object-cover"
              style="object-position: center top;"
            />
          </div>

          <!-- Label -->
          <p class="text-[11px] sm:text-sm md:text-base text-stone-700 font-prata mt-2 sm:mt-3 md:mt-5 tracking-wider uppercase">
            Chú rể
          </p>

          <!-- Groom Short Name -->
          <h2 class="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] mt-0.5 sm:mt-1 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
            {{ data.nameGroom }}
          </h2>
        </div>

        <!-- Bride Column -->
        <div class="relative flex flex-col items-center text-center reveal-right delay-200 w-full">
          <!-- Flower Decor Bride -->
          <img
            src="/assets/images/templates/sangtrong/5.png"
            alt="Flower Decor Bride"
            class="w-[65px] h-[65px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] absolute bottom-12 sm:bottom-16 md:bottom-20 -right-2 sm:-right-4 md:-right-8 z-10 pointer-events-none"
          />
          <!-- Arched Photo Frame -->
          <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full max-w-[145px] sm:max-w-[220px] md:max-w-[320px] lg:max-w-[380px] h-[190px] sm:h-[280px] md:h-[400px] lg:h-[480px] overflow-hidden bg-white shadow-md">
            <img
              [src]="data.imageBride"
              alt="Cô dâu"
              class="w-full h-full object-cover"
              style="object-position: 50% 27.03%;"
            />
          </div>

          <!-- Label -->
          <p class="text-[11px] sm:text-sm md:text-base text-stone-700 font-prata mt-2 sm:mt-3 md:mt-5 tracking-wider uppercase">
            Cô dâu
          </p>

          <!-- Bride Short Name -->
          <h2 class="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] mt-0.5 sm:mt-1 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
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
