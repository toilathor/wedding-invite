import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroData } from '../../models/wedding-data.model';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative mx-auto bg-[#FBF7F5] overflow-hidden py-14 md:py-24 lg:py-28 reveal">
      <!-- Watermark Background Labels on Desktop -->
      <div class="absolute left-0 top-0 w-full h-[574px] bg-[#FBF7F5] pointer-events-none select-none z-0">
        <h1 class="hidden md:block absolute top-1/3 -left-[12%] text-[110px] font-prata rotate-90 text-[#F4DBCE]">
          GROOM
        </h1>
      </div>
      <div class="z-0 absolute right-0 bottom-0 w-[488px] h-[574px] bg-[#FBF7F5] pointer-events-none select-none">
        <h1 class="hidden md:block absolute top-1/3 -right-[40%] text-[110px] font-prata -rotate-90 text-[#F4DBCE]">
          BRIDE
        </h1>
      </div>

      <!-- Main 2-Column Grid with Top Alignment for Equal Baselines -->
      <div class="z-20 relative grid md:grid-cols-2 justify-center items-start lg:px-[140px] xl:px-[200px] gap-12 md:gap-14 lg:gap-20 px-4 max-w-[1443px] mx-auto">
        <!-- Groom Column -->
        <div class="relative flex flex-col items-center text-center mt-4 md:mt-0 reveal-left delay-100 w-full">
          <!-- Flower Decor Groom -->
          <img
            src="/assets/images/templates/sangtrong/4.png"
            alt="Flower Decor Groom"
            class="md:block md:w-[206px] md:h-[209px] w-[140px] h-[140px] absolute bottom-24 md:bottom-28 md:-left-16 -left-8 z-10 pointer-events-none"
          />
          <!-- Arched Photo Frame -->
          <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full max-w-[300px] md:max-w-[440px] h-[400px] md:h-[580px] overflow-hidden bg-white shadow-md">
            <img
              [src]="data.imageGroom"
              alt="Chú rể"
              class="w-full h-full object-cover"
              style="object-position: center top;"
            />
          </div>

          <!-- Label -->
          <p class="text-base md:text-xl text-stone-700 font-prata mt-6 md:mt-8 tracking-wider uppercase">
            Chú rể
          </p>

          <!-- Groom Short Name -->
          <h2 class="text-[56px] md:text-[72px] mt-3 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
            {{ data.nameGroom }}
          </h2>
        </div>

        <!-- Bride Column -->
        <div class="relative flex flex-col items-center text-center mt-8 md:mt-0 reveal-right delay-200 w-full">
          <!-- Flower Decor Bride -->
          <img
            src="/assets/images/templates/sangtrong/5.png"
            alt="Flower Decor Bride"
            class="md:block md:w-[206px] md:h-[209px] w-[140px] h-[140px] absolute bottom-24 md:bottom-28 md:-right-16 -right-8 z-10 pointer-events-none"
          />
          <!-- Arched Photo Frame -->
          <div class="relative border border-[#A12F0C] rounded-t-[300px] block w-full max-w-[300px] md:max-w-[440px] h-[400px] md:h-[580px] overflow-hidden bg-white shadow-md">
            <img
              [src]="data.imageBride"
              alt="Cô dâu"
              class="w-full h-full object-cover"
              style="object-position: 50% 27.03%;"
            />
          </div>

          <!-- Label -->
          <p class="text-base md:text-xl text-stone-700 font-prata mt-6 md:mt-8 tracking-wider uppercase">
            Cô dâu
          </p>

          <!-- Bride Short Name -->
          <h2 class="text-[56px] md:text-[72px] mt-3 font-pinyonScript text-[#A12F0C] leading-none whitespace-nowrap select-none">
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
