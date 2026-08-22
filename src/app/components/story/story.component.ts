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
        class="max-w-[1443px] mx-auto pt-[55px] md:pt-[95px] w-full px-4 md:px-[15px]"
      >
        <!-- Title -->
        <h2
          class="text-center text-[40px] md:text-[72px] leading-[50px] md:leading-[90px] font-pinyonScript md:mb-6 px-4 text-[#A12F0C] reveal delay-100"
        >
          {{ data.title }}
        </h2>

        <!-- Content (Soft, non-bold, elegant typography) -->
        <div class="w-full max-w-[760px] mx-auto px-4 reveal delay-200">
          <div
            class="text-sm md:text-base font-light font-beVietnamPro text-stone-700 leading-relaxed tracking-wide"
            [innerHTML]="data.contentHtml"
          ></div>
        </div>

        <!-- Arch Frame Photo with Flower Decor - Taller (~20% higher) & Flush to Bottom -->
        <div
          class="relative mt-8 md:mt-12 max-w-[340px] sm:max-w-[420px] md:max-w-[720px] h-[360px] sm:h-[460px] md:h-[624px] lg:h-[675px] px-[12px] mx-auto mb-0 reveal delay-300"
        >
          <!-- Main Image Frame -->
          <div
            class="z-30 absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-3 w-full h-full max-w-[320px] sm:max-w-[400px] md:max-w-none border border-[#A12F0C] rounded-tl-[180px] rounded-tr-[180px] md:rounded-tl-[320px] md:rounded-tr-[320px] overflow-hidden bg-white shadow-xl"
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
            class="absolute bg-transparent left-1/2 -translate-x-1/2 md:left-[12px] md:translate-x-0 top-0 z-20 border-r border-[#A12F0C] rounded-tl-[180px] rounded-tr-[180px] md:rounded-tl-[320px] md:rounded-tr-[320px] w-full max-w-[320px] sm:max-w-[400px] md:max-w-full h-full pointer-events-none"
          ></div>

          <!-- Flower Decor Ornament -->
          <img
            src="/assets/images/templates/sangtrong/6.png"
            alt="Decor Flower"
            class="z-30 absolute -bottom-6 right-0 md:-bottom-10 md:-right-[60px] w-[120px] h-[105px] md:w-[320px] md:h-[240px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  `,
})
export class StoryComponent {
  @Input({ required: true }) data!: StoryData;
}
