import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineData } from '../../models/wedding-data.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative bg-white overflow-hidden pt-12 md:pt-20 lg:pt-24 xl:pt-28 pb-4 sm:pb-6 md:pb-8 reveal">
      <div class="max-w-[1443px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <!-- Section Header -->
        <div class="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <p class="text-xs sm:text-sm lg:text-base font-prata tracking-[0.25em] text-[#A12F0C]/80 uppercase">
            Hành trình yêu thương
          </p>
          <h2 class="text-center text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-tight font-pinyonScript text-[#A12F0C] mt-1">
            {{ data.mainTitle }}
          </h2>
          <div class="w-16 lg:w-24 h-[1.5px] bg-[#A12F0C]/30 mx-auto mt-2"></div>
        </div>

        <!-- 3 Cards Grid (Stacked on Mobile, 3-Column on Desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-0 md:gap-x-6 lg:gap-x-10 max-w-6xl mx-auto">
          <div
            *ngFor="let item of data.milestone; let idx = index"
            [ngClass]="'reveal delay-' + ((idx + 1) * 100)"
            class="relative flex flex-col max-w-[340px] md:max-w-none mx-auto w-full rounded-t-full overflow-hidden shadow-md bg-white border border-stone-100 hover:shadow-2xl transition-all duration-500 group"
          >
            <!-- Top Arched Image -->
            <div class="w-full relative h-[260px] sm:h-[300px] md:h-[260px] lg:h-[340px] xl:h-[380px] overflow-hidden bg-stone-50">
              <img
                [src]="item.picture"
                [alt]="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                [style.object-position]="item.imagePosition || '50% 20%'"
              />
            </div>

            <!-- Bottom Details Box with Flower on Top -->
            <div class="relative bg-[#FBF7F5] pt-10 sm:pt-12 px-5 sm:px-6 pb-6 sm:pb-8 flex flex-col justify-between flex-1">
              <!-- Overlay Flower Decor -->
              <div class="absolute -top-12 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
                <img
                  src="/assets/images/templates/sangtrong/1.png"
                  alt="Milestone Decor"
                  class="w-[130px] h-[110px] md:w-[140px] md:h-[120px] object-contain"
                />
              </div>

              <div>
                <!-- Title -->
                <h3 class="text-[28px] sm:text-[34px] md:text-[36px] font-pinyonScript text-[#A12F0C] leading-tight mb-2 text-center">
                  {{ item.title }}
                </h3>

                <!-- Content -->
                <p class="text-xs sm:text-sm text-stone-600 font-beVietnamPro leading-relaxed font-light mb-6 tracking-wide text-center">
                  {{ item.content }}
                </p>
              </div>

              <!-- Date Split -->
              <div class="flex justify-center items-center pt-3.5 border-t border-[#F4DBCE]/60">
                <div class="flex space-x-4 sm:space-x-5 text-[22px] sm:text-[26px] md:text-[28px] items-center font-prata text-[#F4DBCE] leading-none">
                  <span class="text-[#A12F0C] font-normal">{{ item.day }}</span>
                  <div class="self-stretch w-[1.5px] bg-[#A12F0C]/20"></div>
                  <span class="text-[#A12F0C] font-normal">{{ item.month }}</span>
                  <div class="self-stretch w-[1.5px] bg-[#A12F0C]/20"></div>
                  <span class="text-[#A12F0C] font-normal">{{ item.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TimelineComponent {
  @Input({ required: true }) data!: TimelineData;
}
