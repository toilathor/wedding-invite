import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PageViewService {
  private container: HTMLElement | null = null;
  private sections: HTMLElement[] = [];

  currentPageIndex = signal<number>(0);
  totalPages = signal<number>(0);

  private isLocked = false;

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

  goToPage(index: number, immediate = false) {
    if (this.sections.length === 0) return;
    const targetIndex = Math.max(0, Math.min(index, this.sections.length - 1));

    this.currentPageIndex.set(targetIndex);
    this.updateActiveSectionClass();

    const targetSection = this.sections[targetIndex];
    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: immediate ? "auto" : "smooth",
      block: "start",
    });
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
        sec.classList.add("pageview-active");
        // Trigger reveal of children if any
        sec
          .querySelectorAll(".reveal, .reveal-left, .reveal-right")
          .forEach((el) => {
            el.classList.add("revealed");
          });
      } else {
        sec.classList.remove("pageview-active");
      }
    });
  }

  // --- Keyboard Handler ---
  handleKeyDown(event: KeyboardEvent) {
    if (this.isLocked) return;

    // Ignore when focused in input/textarea
    const target = event.target as HTMLElement;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable)
    ) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
      case "PageDown":
        event.preventDefault();
        this.nextPage();
        break;
      case "ArrowUp":
      case "PageUp":
        event.preventDefault();
        this.prevPage();
        break;
      case "Home":
        event.preventDefault();
        this.goToPage(0);
        break;
      case "End":
        event.preventDefault();
        this.goToPage(this.sections.length - 1);
        break;
      case " ":
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
    this.container = null;
    this.sections = [];
  }
}
