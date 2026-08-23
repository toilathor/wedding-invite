import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { AlbumComponent } from "./components/album/album.component";
import { BankGiftComponent } from "./components/bank-gift/bank-gift.component";
import { BannerComponent } from "./components/banner/banner.component";
import { EventsComponent } from "./components/events/events.component";
import { GuestbookComponent } from "./components/guestbook/guestbook.component";
import { IntroductionComponent } from "./components/introduction/introduction.component";
import { InvitationComponent } from "./components/invitation/invitation.component";
import { MusicPlayerComponent } from "./components/music-player/music-player.component";
import { QuickMenuComponent } from "./components/quick-menu/quick-menu.component";
import { RsvpModalComponent } from "./components/rsvp-modal/rsvp-modal.component";
import { StoryComponent } from "./components/story/story.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ToastComponent } from "./components/toast/toast.component";
import { WEDDING_DATA } from "./core/wedding-data";
import { PageViewService } from "./services/pageview.service";

export interface PageInfo {
  id: string;
  title: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    InvitationComponent,
    IntroductionComponent,
    StoryComponent,
    TimelineComponent,
    EventsComponent,
    AlbumComponent,
    GuestbookComponent,
    BankGiftComponent,
    MusicPlayerComponent,
    RsvpModalComponent,
    ToastComponent,
    QuickMenuComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  weddingData = WEDDING_DATA;
  pageViewService = inject(PageViewService);
  isRsvpOpen = false;

  @ViewChild("pageContainer") pageContainerRef?: ElementRef<HTMLDivElement>;

  pages: PageInfo[] = [
    { id: "page-banner", title: "Trang đầu" },
    { id: "page-invitation", title: "Lời mời & Đếm ngược" },
    { id: "page-introduction", title: "Cô dâu & Chú rể" },
    { id: "page-story", title: "Chuyện chúng mình" },
    { id: "page-timeline", title: "Cột mốc tình yêu" },
    { id: "page-events", title: "Sự kiện cưới" },
    { id: "page-album", title: "Album ảnh cưới" },
    { id: "page-guestbook", title: "Sổ lưu bút" },
    { id: "page-bank-gift", title: "Mừng cưới & Cảm ơn" },
  ];

  private observer: IntersectionObserver | null = null;

  openRsvp() {
    this.isRsvpOpen = true;
    this.pageViewService.setLocked(true);
  }

  closeRsvp() {
    this.isRsvpOpen = false;
    this.pageViewService.setLocked(false);
  }

  goToPage(index: number) {
    this.pageViewService.goToPage(index);
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.pageViewService.handleKeyDown(event);
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (typeof window === "undefined") return;
    this.updateActiveSectionOnScroll();
  }

  private updateActiveSectionOnScroll() {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".pageview-section"),
    );
    if (sections.length === 0) return;

    const viewportTarget = window.innerHeight * 0.35;
    let closestIndex = 0;
    let minDistance = Infinity;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= viewportTarget && rect.bottom >= viewportTarget) {
        closestIndex = idx;
        minDistance = 0;
      } else {
        const distance = Math.abs(rect.top - viewportTarget);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      }
    });

    if (this.pageViewService.currentPageIndex() !== closestIndex) {
      this.pageViewService.currentPageIndex.set(closestIndex);
    }
  }

  ngAfterViewInit() {
    if (typeof window === "undefined") return;

    const container = this.pageContainerRef?.nativeElement;
    if (container) {
      const sectionElements = Array.from(
        container.querySelectorAll<HTMLElement>(".pageview-section"),
      );
      this.pageViewService.init(container, sectionElements);

      // Setup IntersectionObserver for reveal animations
      if ("IntersectionObserver" in window) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
              }
            });
          },
          {
            root: null, // observe against viewport for seamless scroll in both modes
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px",
          },
        );

        const observeElements = () => {
          container
            .querySelectorAll(".reveal, .reveal-left, .reveal-right")
            .forEach((el) => {
              this.observer?.observe(el);
            });
        };

        observeElements();
        setTimeout(observeElements, 300);
        setTimeout(observeElements, 1000);
      }
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.pageViewService.destroy();
  }
}
