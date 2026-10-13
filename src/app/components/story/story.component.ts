import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { StoryData } from "../../models/wedding-data.model";

@Component({
  selector: "app-story",
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .story-edge-watermark {
      --watermark-size: 2.625rem;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 0;
      width: max-content;
      color: rgb(244 219 206 / 0.8);
      font-family: Prata, serif;
      font-size: var(--watermark-size);
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      pointer-events: none;
      user-select: none;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    @media (min-width: 768px) {
      .story-edge-watermark {
        --watermark-size: 5.625rem;
        color: rgb(244 219 206 / 0.7);
      }
    }

    @media (min-width: 1024px) {
      .story-edge-watermark {
        --watermark-size: 6.875rem;
      }
    }
  `],
  template: `
    <section
      class="relative grid text-center bg-[#FBF7F5] overflow-visible pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-0 reveal"
    >
      <!-- Full label shifted half a line-height beyond the left edge. -->
      <div class="story-edge-watermark" aria-hidden="true">Love story</div>

      <div
        class="max-w-[1443px] mx-auto pt-2 sm:pt-4 md:pt-6 pb-0 w-full px-4 md:px-[15px] z-10"
      >
        <!-- Title -->
        <h2
          class="text-center text-[36px] sm:text-[48px] md:text-[68px] leading-tight md:leading-[84px] font-pinyonScript md:mb-3 px-4 text-[#A12F0C] reveal delay-100"
        >
          {{ data.title }}
        </h2>

        <!-- Content (Soft, non-bold, elegant typography) -->
        <div class="w-full max-w-[820px] mx-auto px-2 sm:px-4 reveal delay-200">
          <div
            class="text-xs sm:text-sm md:text-base lg:text-lg font-light font-beVietnamPro text-stone-700 leading-relaxed tracking-wide"
            [innerHTML]="data.contentHtml"
          ></div>
        </div>

        <!-- Arch Frame Photo with Flower Decor - Flush to Bottom Edge -->
        <div
          class="relative mt-4 sm:mt-6 md:mt-8 max-w-[320px] sm:max-w-[420px] md:max-w-[660px] lg:max-w-[740px] h-[280px] sm:h-[380px] md:h-[480px] lg:h-[560px] px-[10px] mx-auto mb-0 reveal delay-300 overflow-visible"
        >
          <!-- Main Image Frame (Aligned flush to bottom 0) -->
          <div
            class="z-30 absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-3 w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-none border border-b-0 border-[#A12F0C] rounded-tl-[160px] rounded-tr-[160px] md:rounded-tl-[320px] md:rounded-tr-[320px] overflow-hidden bg-white shadow-xl"
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
            class="absolute bg-transparent bottom-0 left-1/2 -translate-x-1/2 md:left-[12px] md:translate-x-0 top-0 z-20 border-r border-[#A12F0C] rounded-tl-[160px] rounded-tr-[160px] md:rounded-tl-[320px] md:rounded-tr-[320px] w-full max-w-[300px] sm:max-w-[400px] md:max-w-full h-full pointer-events-none"
          ></div>

          <!-- Flower Decor Ornament -->
          <img
            src="/assets/images/templates/sangtrong/6.png"
            alt="Decor Flower"
            class="z-30 absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-2 md:-bottom-8 md:-right-4 lg:-right-6 xl:-right-[40px] w-[90px] sm:w-[120px] md:w-[160px] lg:w-[190px] xl:w-[240px] h-auto pointer-events-none"
          />
        </div>
      </div>
    </section>
  `,
})
export class StoryComponent {
  @Input({ required: true }) data!: StoryData;
}
