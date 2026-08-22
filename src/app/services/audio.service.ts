import { Injectable, signal } from '@angular/core';
import { WEDDING_DATA } from '../core/wedding-data';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  isPlaying = signal<boolean>(false);
  private userInteracted = false;

  constructor() {
    this.initAudio();
  }

  private initAudio() {
    if (typeof window === 'undefined') return;

    this.audio = new Audio(WEDDING_DATA.audioUrl);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => this.isPlaying.set(true));
    this.audio.addEventListener('pause', () => this.isPlaying.set(false));
    this.audio.addEventListener('ended', () => this.isPlaying.set(false));

    // Listen for any user interaction on the page to trigger background audio safely
    const handleFirstGesture = () => {
      if (this.userInteracted) return;
      this.userInteracted = true;
      if (this.audio && !this.isPlaying()) {
        this.audio.play()
          .then(() => this.isPlaying.set(true))
          .catch(() => {
            // Autoplay blocked, wait for direct toggle click
          });
      }
      this.cleanupGestureListeners(handleFirstGesture);
    };

    document.addEventListener('click', handleFirstGesture, { once: true });
    document.addEventListener('scroll', handleFirstGesture, { once: true });
    document.addEventListener('touchstart', handleFirstGesture, { once: true });
  }

  private cleanupGestureListeners(handler: () => void) {
    document.removeEventListener('click', handler);
    document.removeEventListener('scroll', handler);
    document.removeEventListener('touchstart', handler);
  }

  toggle() {
    this.userInteracted = true;
    if (!this.audio) return;
    if (this.isPlaying()) {
      this.audio.pause();
    } else {
      this.audio.play()
        .then(() => this.isPlaying.set(true))
        .catch(err => console.warn('Play interrupted', err));
    }
  }

  play() {
    this.userInteracted = true;
    if (this.audio && !this.isPlaying()) {
      this.audio.play().catch(e => console.warn(e));
    }
  }

  pause() {
    if (this.audio && this.isPlaying()) {
      this.audio.pause();
    }
  }
}
