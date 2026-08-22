import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_DATA } from './core/wedding-data';
import { BannerComponent } from './components/banner/banner.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { StoryComponent } from './components/story/story.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { EventsComponent } from './components/events/events.component';
import { AlbumComponent } from './components/album/album.component';
import { GuestbookComponent } from './components/guestbook/guestbook.component';
import { BankGiftComponent } from './components/bank-gift/bank-gift.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { RsvpModalComponent } from './components/rsvp-modal/rsvp-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { QuickMenuComponent } from './components/quick-menu/quick-menu.component';

@Component({
  selector: 'app-root',
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
    QuickMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  weddingData = WEDDING_DATA;
  isRsvpOpen = false;

  openRsvp() {
    this.isRsvpOpen = true;
  }

  closeRsvp() {
    this.isRsvpOpen = false;
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      const observeElements = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
          if (!el.classList.contains('revealed')) {
            observer.observe(el);
          }
        });
      };

      observeElements();
      setTimeout(observeElements, 400);
      setTimeout(observeElements, 1200);
    }
  }
}
