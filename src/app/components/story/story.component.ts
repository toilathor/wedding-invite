import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { StoryData } from "../../models/wedding-data.model";

@Component({
  selector: "app-story",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative grid text-center bg-[#FBF7F5] overflow-hidden pb-0 reveal"
    >
      <!-- Watermark on Desktop -->
      <div
        class="hidden md:block uppercase absolute top-1/3 -left-[335px] font-prata rotate-90 text-[110px] text-[#F4DBCE] opacity-80 pointer-events-none select-none"
      >
        Love story
      </div>

      <div
        class="max-w-[1443px] mx-auto pt-3 sm:pt-6 md:pt-10 w-full px-4 md:px-[15px]"
      >
        <!-- Title -->
        <h2
          class="text-center text-[34px] sm:text-[46px] md:text-[64px] leading-tight md:leading-[80px] font-pinyonScript md:mb-3 px-4 text-[#A12F0C] reveal delay-100"
        >
          {{ data.title }}
        </h2>

        <!-- Content (Soft, non-bold, elegant typography) -->
        <div class="w-full max-w-[760px] mx-auto px-2 sm:px-4 reveal delay-200">
          <div
            class="text-xs sm:text-sm md:text-base font-light font-beVietnamPro text-stone-700 leading-relaxed tracking-wide"
            [innerHTML]="data.contentHtml"
          ></div>
        </div>

        <!-- Arch Frame Photo with Flower Decor - Flush to Bottom -->
        <div
          class="relative mt-4 sm:mt-6 md:mt-8 max-w-[280px] sm:max-w-[380px] md:max-w-[580px] lg:max-w-[640px] h-[250px] sm:h-[340px] md:h-[420px] lg:h-[480px] px-[10px] mx-auto mb-0 reveal delay-300"
        >
          <!-- Main Image Frame -->
          <div
            class="z-30 absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-3 w-full h-full max-w-[260px] sm:max-w-[360px] md:max-w-none border border-[#A12F0C] rounded-tl-[160px] rounded-tr-[160px] md:rounded-tl-[300px] md:rounded-tr-[300px] overflow-hidden bg-white shadow-xl"
          >
            <img
              [src]="data.image"
              alt="Chuyện chúng mình"
              class="w-full h-full object-cover"
              style="object-position: 50% 22.25%;"
            />
          </div>

          <!-- Secondary Arched Border Frame -->
          <div
            class="absolute bg-transparent left-1/2 -translate-x-1/2 md:left-[12px] md:translate-x-0 top-0 z-20 border-r border-[#A12F0C] rounded-tl-[160px] rounded-tr-[160px] md:rounded-tl-[300px] md:rounded-tr-[300px] w-full max-w-[260px] sm:max-w-[360px] md:max-w-full h-full pointer-events-none"
          ></div>

          <!-- Flower Decor Ornament -->
          <img
            src="/assets/images/templates/sangtrong/6.png"
            alt="Decor Flower"
            class="z-30 absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-2 md:-bottom-8 md:-right-[40px] w-[90px] h-[78px] sm:w-[120px] sm:h-[105px] md:w-[240px] md:h-[180px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  `,
})
export class StoryComponent {
  @Input({ required: true }) data!: StoryData;
}
