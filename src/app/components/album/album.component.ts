import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { AlbumData } from "../../models/wedding-data.model";

@Component({
  selector: "app-album",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 1. Page Gallery Section -->
    <section
      id="wedding-album-section"
      class="relative max-w-[1443px] mx-auto py-12 md:py-[72px] px-4 md:px-[15px] reveal"
    >
      <!-- Title -->
      <h2
        class="text-center text-[48px] md:text-[72px] leading-[60px] md:leading-[90px] font-pinyonScript text-[#A12F0C] mb-6 md:mb-10"
      >
        {{ data.title }}
      </h2>

      <!-- Gallery Grid: Initial Photos (Always Visible) -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <div
          *ngFor="let img of initialAlbums; let idx = index"
          (click)="openLightbox(idx)"
          class="group relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 bg-stone-100"
        >
          <img
            [src]="img"
            [alt]="'Ảnh cưới ' + (idx + 1)"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <!-- Hover Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none"
          >
            <div
              class="flex items-center justify-between text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              <span
                class="text-xs md:text-sm font-prata tracking-wider uppercase"
                >Xem ảnh</span
              >
              <div
                class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#A12F0C] shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expandable / Collapsible Container with Silky Smooth Transition -->
      <div
        *ngIf="extraAlbums.length > 0"
        class="grid transition-all duration-600 ease-in-out overflow-hidden"
        [ngStyle]="{
          'grid-template-rows': showAll ? '1fr' : '0fr',
          opacity: showAll ? '1' : '0',
          'margin-top': showAll ? '0.75rem' : '0px',
        }"
      >
        <div class="overflow-hidden min-h-0">
          <div
            class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pt-0 md:pt-3"
          >
            <div
              *ngFor="let img of extraAlbums; let i = index"
              (click)="openLightbox(initialCount + i)"
              class="group relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out bg-stone-100 transform"
              [style.transform]="
                showAll
                  ? 'translateY(0) scale(1)'
                  : 'translateY(-15px) scale(0.96)'
              "
              [style.transition-delay]="showAll ? i * 40 + 'ms' : '0ms'"
            >
              <img
                [src]="img"
                [alt]="'Ảnh cưới ' + (initialCount + i + 1)"
                class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none"
              >
                <div
                  class="flex items-center justify-between text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <span
                    class="text-xs md:text-sm font-prata tracking-wider uppercase"
                    >Xem ảnh</span
                  >
                  <div
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#A12F0C] shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expand / Collapse Button (No count badge, smooth animated arrow) -->
      <div
        class="flex justify-center mt-8 md:mt-[60px]"
        *ngIf="data.albums.length > initialCount"
      >
        <button
          type="button"
          (click)="toggleExpand()"
          class="group uppercase rounded-full text-white font-prata text-xs sm:text-sm tracking-wider px-8 py-3.5 md:py-4 bg-[#A12F0C] hover:bg-[#852509] transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2.5"
        >
          <span>{{ showAll ? "Thu gọn album" : "Xem thêm ảnh" }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-500 ease-out"
            [class.rotate-180]="showAll"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- 2. Ultra-Smooth Lightbox Modal (Placed outside section to avoid transform/reveal container bugs) -->
    <div
      *ngIf="lightboxOpen"
      class="fixed inset-0 z-[999999] w-screen h-[100dvh] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh cưới"
      (click)="closeLightbox()"
    >
      <!-- Top Navigation & Control Bar -->
      <div
        class="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 text-white z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        (click)="$event.stopPropagation()"
      >
        <!-- Left: Photo Counter & Album Title -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div
            class="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-sm"
          >
            <span
              class="text-xs sm:text-sm font-prata tracking-wider text-[#F4DBCE]"
            >
              {{ currentIndex + 1 }} / {{ data.albums.length }}
            </span>
          </div>
          <span
            class="text-xs sm:text-sm font-light text-stone-300 tracking-wider hidden sm:inline-block font-prata"
          >
            {{ data.title }}
          </span>
        </div>

        <!-- Right: Action Buttons (Slideshow, Zoom, Download, Close) -->
        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Slideshow Toggle -->
          <button
            type="button"
            (click)="toggleSlideshow()"
            class="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white relative"
            [title]="
              isSlideshow
                ? 'Tạm dừng trình chiếu (Phím Space)'
                : 'Bắt đầu tự động trình chiếu (Phím Space)'
            "
            aria-label="Tự động trình chiếu"
          >
            <svg
              *ngIf="!isSlideshow"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <svg
              *ngIf="isSlideshow"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>

          <!-- Zoom Toggle -->
          <button
            type="button"
            (click)="toggleZoom()"
            class="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white"
            [title]="
              isZoomed ? 'Thu nhỏ ảnh (Phím -)' : 'Phóng to ảnh (Phím +)'
            "
            aria-label="Phóng to / Thu nhỏ"
          >
            <svg
              *ngIf="!isZoomed"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
            <svg
              *ngIf="isZoomed"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </button>

          <!-- Download Photo Button -->
          <a
            [href]="data.albums[currentIndex]"
            [download]="'wedding_photo_' + (currentIndex + 1) + '.webp'"
            target="_blank"
            class="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white"
            title="Tải ảnh về máy"
            aria-label="Tải ảnh về máy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>

          <!-- Close Modal Button -->
          <button
            type="button"
            (click)="closeLightbox()"
            class="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#A12F0C] active:scale-90 transition-all text-white"
            title="Đóng xem ảnh (Phím Esc hoặc Vuốt xuống)"
            aria-label="Đóng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Photo Viewing Stage with Touch Gestures -->
      <div
        class="relative w-full flex-1 flex items-center justify-center overflow-hidden px-2 sm:px-14 md:px-20"
        (click)="$event.stopPropagation()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      >
        <!-- Floating Left Arrow -->
        <button
          type="button"
          (click)="prevImage()"
          class="absolute left-2 sm:left-4 md:left-6 z-40 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-[#A12F0C] backdrop-blur-md text-white border border-white/15 transition-all active:scale-90 shadow-xl flex items-center justify-center cursor-pointer"
          title="Ảnh trước (Phím mũi tên trái hoặc Vuốt sang phải)"
          aria-label="Ảnh trước"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Centered Main Image Container -->
        <div
          class="relative max-w-full max-h-full flex items-center justify-center select-none transition-transform duration-300 ease-out"
          [style.transform]="isZoomed ? 'scale(1.45)' : 'scale(1)'"
          [class.cursor-zoom-out]="isZoomed"
          [class.cursor-zoom-in]="!isZoomed"
          (click)="toggleZoom()"
          (dblclick)="toggleZoom()"
        >
          <img
            [src]="data.albums[currentIndex]"
            [alt]="'Ảnh cưới ' + (currentIndex + 1)"
            class="max-w-[92vw] sm:max-w-[85vw] md:max-w-5xl max-h-[64vh] sm:max-h-[70vh] md:max-h-[74vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl transition-opacity duration-200"
            [class.opacity-100]="!changing"
            [class.opacity-40]="changing"
            draggable="false"
          />
        </div>

        <!-- Floating Right Arrow -->
        <button
          type="button"
          (click)="nextImage()"
          class="absolute right-2 sm:right-4 md:right-6 z-40 p-2.5 sm:p-3.5 rounded-full bg-black/40 hover:bg-[#A12F0C] backdrop-blur-md text-white border border-white/15 transition-all active:scale-90 shadow-xl flex items-center justify-center cursor-pointer"
          title="Ảnh tiếp theo (Phím mũi tên phải hoặc Vuốt sang trái)"
          aria-label="Ảnh tiếp theo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Bottom Thumbnail Carousel Strip -->
      <div
        class="w-full max-w-4xl py-2 sm:py-3 px-3 sm:px-6 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        (click)="$event.stopPropagation()"
      >
        <div
          #thumbnailStrip
          class="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth"
        >
          <button
            *ngFor="let thumb of data.albums; let idx = index"
            [id]="'lightbox-thumb-' + idx"
            type="button"
            (click)="selectImage(idx)"
            class="relative w-12 h-14 sm:w-16 sm:h-18 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none"
            [ngClass]="{
              'border-[#A12F0C] ring-2 ring-[#A12F0C]/60 scale-105 opacity-100 shadow-lg':
                currentIndex === idx,
              'border-transparent opacity-40 hover:opacity-80 scale-95':
                currentIndex !== idx,
            }"
          >
            <img
              [src]="thumb"
              [alt]="'Thumbnail ' + (idx + 1)"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AlbumComponent implements OnDestroy {
  @Input({ required: true }) data!: AlbumData;
  @ViewChild("thumbnailStrip") thumbnailStrip?: ElementRef<HTMLDivElement>;

  initialCount = 6;
  showAll = false;
  lightboxOpen = false;
  currentIndex = 0;
  isSlideshow = false;
  isZoomed = false;
  changing = false;
  private slideshowTimer: any;

  // Touch Swipe coordinates
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;
  private lastTapTime = 0;

  get initialAlbums(): string[] {
    return this.data?.albums
      ? this.data.albums.slice(0, this.initialCount)
      : [];
  }

  get extraAlbums(): string[] {
    return this.data?.albums ? this.data.albums.slice(this.initialCount) : [];
  }

  toggleExpand() {
    if (this.showAll) {
      // Smoothly scroll back if user is scrolled past the album section top
      const albumSection = document.getElementById("wedding-album-section");
      if (albumSection) {
        const rect = albumSection.getBoundingClientRect();
        if (rect.top < -50) {
          albumSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    this.showAll = !this.showAll;
  }

  openLightbox(index: number) {
    this.currentIndex = index;
    this.isZoomed = false;
    this.lightboxOpen = true;
    document.body.style.overflow = "hidden";
    this.preloadAdjacentImages();
    setTimeout(() => this.scrollThumbIntoView(), 80);
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.isZoomed = false;
    this.stopSlideshow();
    document.body.style.overflow = "";
  }

  selectImage(index: number) {
    if (this.currentIndex === index) return;
    this.triggerChange(() => {
      this.currentIndex = index;
      this.isZoomed = false;
      this.preloadAdjacentImages();
      this.scrollThumbIntoView();
    });
  }

  nextImage() {
    this.triggerChange(() => {
      this.currentIndex = (this.currentIndex + 1) % this.data.albums.length;
      this.isZoomed = false;
      this.preloadAdjacentImages();
      this.scrollThumbIntoView();
    });
  }

  prevImage() {
    this.triggerChange(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.data.albums.length) %
        this.data.albums.length;
      this.isZoomed = false;
      this.preloadAdjacentImages();
      this.scrollThumbIntoView();
    });
  }

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
  }

  toggleSlideshow() {
    if (this.isSlideshow) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
    }
  }

  private startSlideshow() {
    this.isSlideshow = true;
    this.slideshowTimer = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  private stopSlideshow() {
    this.isSlideshow = false;
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = null;
    }
  }

  private triggerChange(action: () => void) {
    this.changing = true;
    setTimeout(() => {
      action();
      this.changing = false;
    }, 120);
  }

  private scrollThumbIntoView() {
    const el = document.getElementById("lightbox-thumb-" + this.currentIndex);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  private preloadAdjacentImages() {
    if (!this.data?.albums?.length) return;
    const len = this.data.albums.length;
    const nextIdx = (this.currentIndex + 1) % len;
    const prevIdx = (this.currentIndex - 1 + len) % len;

    const img1 = new Image();
    img1.src = this.data.albums[nextIdx];

    const img2 = new Image();
    img2.src = this.data.albums[prevIdx];
  }

  // Touch Swipe Handlers (Swipe left/right to change photo, swipe down to close)
  onTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.touchEndX = e.touches[0].clientX;
      this.touchEndY = e.touches[0].clientY;

      // Double-tap detection
      const now = Date.now();
      if (now - this.lastTapTime < 300) {
        this.toggleZoom();
      }
      this.lastTapTime = now;
    }
  }

  onTouchMove(e: TouchEvent) {
    if (e.touches.length === 1) {
      this.touchEndX = e.touches[0].clientX;
      this.touchEndY = e.touches[0].clientY;
    }
  }

  onTouchEnd() {
    const deltaX = this.touchStartX - this.touchEndX;
    const deltaY = this.touchStartY - this.touchEndY;
    const swipeThreshold = 40;

    // If zoomed, don't trigger swipe navigation
    if (this.isZoomed) return;

    // Vertical swipe down to close modal
    if (deltaY < -80 && Math.abs(deltaX) < 60) {
      this.closeLightbox();
      return;
    }

    // Horizontal swipe for next / prev
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > swipeThreshold) {
        // Swiped Left -> Next Image
        this.nextImage();
      } else if (deltaX < -swipeThreshold) {
        // Swiped Right -> Previous Image
        this.prevImage();
      }
    }
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (event.key === "Escape") this.closeLightbox();
    if (event.key === "ArrowRight") this.nextImage();
    if (event.key === "ArrowLeft") this.prevImage();
    if (event.key === "+" || event.key === "=") this.isZoomed = true;
    if (event.key === "-" || event.key === "_") this.isZoomed = false;
    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      this.toggleSlideshow();
    }
  }

  ngOnDestroy() {
    this.stopSlideshow();
    document.body.style.overflow = "";
  }
}
