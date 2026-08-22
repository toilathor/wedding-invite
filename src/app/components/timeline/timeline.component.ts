import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineData } from '../../models/wedding-data.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative grid text-center bg-white overflow-x-hidden py-16 md:py-24 reveal">
      <div class="max-w-[1443px] mx-auto w-full px-[15px]">
        <!-- Title -->
        <h2 class="text-center text-[48px] md:text-[72px] leading-[40px] md:leading-[90px] font-pinyonScript md:mb-10 px-4 text-[#A12F0C] reveal">
          {{ data.mainTitle }}
        </h2>

        <!-- 3 Cards Grid -->
        <div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-12 w-full">
          <div
            *ngFor="let item of data.milestone; let idx = index"
            [ngClass]="'reveal delay-' + ((idx + 1) * 100)"
            class="relative flex flex-col max-w-[380px] md:max-w-none mx-auto w-full rounded-t-full overflow-hidden shadow-md">

            <!-- Top: Arched Image optimized for mobile and desktop -->
            <div class="w-full relative h-[340px] sm:h-[380px] md:h-[385px] overflow-hidden bg-stone-50">
              <img
                [src]="item.picture"
                [alt]="item.title"
                class="w-full h-full object-cover"
                [style.object-position]="item.imagePosition || '50% 20%'"
              />
            </div>

            <!-- Bottom: Details Box with Flower on Top -->
            <div class="relative bg-[#FBF7F5] pt-14 px-6 md:px-8 pb-8 md:pb-10 flex flex-col justify-between flex-1">
              <!-- Overlay Flower Decor -->
              <div class="absolute -top-16 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
                <img
                  src="/assets/images/templates/sangtrong/1.png"
                  alt="Milestone Decor"
                  class="w-[160px] h-[140px] md:w-[210px] md:h-[160px] object-contain"
                />
              </div>

              <div>
                <!-- Title -->
                <h3 class="text-[32px] md:text-[40px] font-pinyonScript text-[#A12F0C] leading-tight mb-3">
                  {{ item.title }}
                </h3>

                <!-- Content with softer, warm text color -->
                <p class="text-sm md:text-[15px] text-stone-600 font-beVietnamPro leading-relaxed font-light line-clamp-5 mb-6 tracking-wide">
                  {{ item.content }}
                </p>
              </div>

              <!-- Date Split -->
              <div class="flex justify-center items-center pt-4 border-t border-[#F4DBCE]/60">
                <div class="flex space-x-[12px] md:space-x-[28px] text-[26px] md:text-[34px] items-center font-prata text-[#F4DBCE] leading-none">
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
