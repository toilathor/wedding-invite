import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageViewService {
  private container: HTMLElement | null = null;
  private sections: HTMLElement[] = [];
  
  currentPageIndex = signal<number>(0);
  totalPages = signal<number>(0);

  private isLocked = false;
  private isTransitioning = false;
  private transitionCooldownTimer: any = null;

  // Trackpad inertia suppression
  private lastWheelTime = 0;
  private wheelCooldown = 650; // ms to lock transitions while animating

  // Touch tracking
  private touchStartY = 0;
  private touchStartX = 0;
  private touchStartTime = 0;
  private touchStartSectionScrollTop = 0;
  private isTrackingTouch = false;

  init(container: HTMLElement, sections: HTMLElement[]) {
    this.container = container;
    this.sections = sections;
    this.totalPages.set(sections.length);
    this.currentPageIndex.set(0);
    this.updateActiveSectionClass();
  }

  updateSections(sections: HTMLElement[]) {
    this.sections = sections;
    this.totalPages.set(sections.length);
  }

  setLocked(locked: boolean) {
    this.isLocked = locked;
  }

  getCurrentPageIndex(): number {
    return this.currentPageIndex();
  }

  private isDesktop(): boolean {
    return typeof window !== 'undefined' && window.innerWidth >= 1024;
  }

  goToPage(index: number, immediate = false) {
    if (this.sections.length === 0) return;
    const targetIndex = Math.max(0, Math.min(index, this.sections.length - 1));
    
    this.currentPageIndex.set(targetIndex);
    this.updateActiveSectionClass();

    const targetSection = this.sections[targetIndex];
    if (!targetSection) return;

    if (!this.isDesktop()) {
      targetSection.scrollIntoView({
        behavior: immediate ? 'auto' : 'smooth',
        block: 'start'
      });
      return;
    }

    if (!this.container) return;
    this.isTransitioning = true;
    clearTimeout(this.transitionCooldownTimer);

    // Scroll container to the top of the target section
    const targetTop = targetSection.offsetTop;
    this.container.scrollTo({
      top: targetTop,
      behavior: immediate ? 'auto' : 'smooth'
    });

    this.transitionCooldownTimer = setTimeout(() => {
      this.isTransitioning = false;
    }, immediate ? 50 : this.wheelCooldown);
  }

  nextPage() {
    if (this.currentPageIndex() < this.sections.length - 1) {
      this.goToPage(this.currentPageIndex() + 1);
    }
  }

  prevPage() {
    if (this.currentPageIndex() > 0) {
      this.goToPage(this.currentPageIndex() - 1);
    }
  }

  private updateActiveSectionClass() {
    this.sections.forEach((sec, idx) => {
      if (idx === this.currentPageIndex()) {
        sec.classList.add('pageview-active');
        // Trigger reveal of children if any
        sec.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
          el.classList.add('revealed');
        });
      } else {
        sec.classList.remove('pageview-active');
      }
    });
  }

  // --- Wheel & Trackpad Handler (Desktop only) ---
  handleWheel(event: WheelEvent) {
    if (!this.isDesktop() || this.isLocked || this.sections.length === 0 || !this.container) return;

    const now = Date.now();
    const currentIdx = this.currentPageIndex();
    const currentSection = this.sections[currentIdx];
    if (!currentSection) return;

    // Check if inner content is scrollable
    const scrollHeight = currentSection.scrollHeight;
    const clientHeight = currentSection.clientHeight;
    const isTallerThanViewport = scrollHeight > clientHeight + 6;

    const deltaY = event.deltaY;
    const isMovingDown = deltaY > 0;
    const isMovingUp = deltaY < 0;

    // Check inner section boundary
    if (isTallerThanViewport) {
      const scrollTop = currentSection.scrollTop;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;
      const isAtTop = scrollTop <= 8;

      if (isMovingDown && !isAtBottom) {
        // Allow inner scroll downwards
        return;
      }
      if (isMovingUp && !isAtTop) {
        // Allow inner scroll upwards
        return;
      }
    }

    // Prevent default browser multi-page jump / fast momentum
    event.preventDefault();

    // Check if in transition or cooldown
    if (this.isTransitioning || now - this.lastWheelTime < this.wheelCooldown) {
      return;
    }

    // Ignore tiny accidental wheel jitters
    if (Math.abs(deltaY) < 12) {
      return;
    }

    this.lastWheelTime = now;

    if (isMovingDown) {
      this.nextPage();
    } else if (isMovingUp) {
      this.prevPage();
    }
  }

  // --- Touch Swipe Handlers (Desktop touch devices only) ---
  handleTouchStart(event: TouchEvent) {
    if (!this.isDesktop() || this.isLocked || event.touches.length !== 1 || this.sections.length === 0) {
      this.isTrackingTouch = false;
      return;
    }

    const touch = event.touches[0];
    this.touchStartY = touch.clientY;
    this.touchStartX = touch.clientX;
    this.touchStartTime = Date.now();
    this.isTrackingTouch = true;

    const currentSection = this.sections[this.currentPageIndex()];
    this.touchStartSectionScrollTop = currentSection ? currentSection.scrollTop : 0;
  }

  handleTouchMove(event: TouchEvent) {
    if (!this.isDesktop() || !this.isTrackingTouch || this.isLocked || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const diffX = Math.abs(touch.clientX - this.touchStartX);
    const diffY = Math.abs(touch.clientY - this.touchStartY);

    // If user is swiping horizontally (e.g. image carousel), ignore pageview
    if (diffX > diffY * 1.5 && diffX > 15) {
      this.isTrackingTouch = false;
      return;
    }

    const currentSection = this.sections[this.currentPageIndex()];
    if (!currentSection) return;

    const scrollHeight = currentSection.scrollHeight;
    const clientHeight = currentSection.clientHeight;
    const isTallerThanViewport = scrollHeight > clientHeight + 6;

    if (isTallerThanViewport) {
      const deltaY = this.touchStartY - touch.clientY;
      const scrollTop = currentSection.scrollTop;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;
      const isAtTop = scrollTop <= 8;

      if (deltaY > 0 && !isAtBottom) {
        return;
      }
      if (deltaY < 0 && !isAtTop) {
        return;
      }
    }
  }

  handleTouchEnd(event: TouchEvent) {
    if (!this.isDesktop() || !this.isTrackingTouch || this.isLocked || this.isTransitioning) {
      this.isTrackingTouch = false;
      return;
    }

    this.isTrackingTouch = false;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaY = this.touchStartY - touch.clientY;
    const deltaX = this.touchStartX - touch.clientX;
    const duration = Date.now() - this.touchStartTime;

    // Ignore horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.3) return;

    const minSwipeDistance = 30;
    const velocity = Math.abs(deltaY) / Math.max(duration, 1);
    const isFlick = velocity > 0.3 && Math.abs(deltaY) > 18;

    if (Math.abs(deltaY) < minSwipeDistance && !isFlick) return;

    const currentSection = this.sections[this.currentPageIndex()];
    if (!currentSection) return;

    const scrollHeight = currentSection.scrollHeight;
    const clientHeight = currentSection.clientHeight;
    const isTallerThanViewport = scrollHeight > clientHeight + 12;

    if (isTallerThanViewport) {
      if (deltaY > 0) {
        const isAtBottom = currentSection.scrollTop + clientHeight >= scrollHeight - 20;
        const wasAtBottom = this.touchStartSectionScrollTop + clientHeight >= scrollHeight - 20;
        if (isAtBottom && wasAtBottom) {
          this.nextPage();
        }
      } else {
        const isAtTop = currentSection.scrollTop <= 20;
        const wasAtTop = this.touchStartSectionScrollTop <= 20;
        if (isAtTop && wasAtTop) {
          this.prevPage();
        }
      }
    } else {
      if (deltaY > 0) {
        this.nextPage();
      } else {
        this.prevPage();
      }
    }
  }

  // --- Keyboard Handler ---
  handleKeyDown(event: KeyboardEvent) {
    if (this.isLocked) return;

    // Ignore when focused in input/textarea
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        event.preventDefault();
        this.nextPage();
        break;
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        this.prevPage();
        break;
      case 'Home':
        event.preventDefault();
        this.goToPage(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToPage(this.sections.length - 1);
        break;
      case ' ':
        if (!event.shiftKey) {
          event.preventDefault();
          this.nextPage();
        } else {
          event.preventDefault();
          this.prevPage();
        }
        break;
    }
  }

  destroy() {
    clearTimeout(this.transitionCooldownTimer);
    this.container = null;
    this.sections = [];
  }
}
