import { Injectable, signal } from '@angular/core';
import { WEDDING_DATA } from '../core/wedding-data';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  isPlaying = signal<boolean>(false);
  currentTrackIndex = signal<number>(0);
  private playlist: string[] = [];
  private userInteracted = false;

  constructor() {
    this.playlist = WEDDING_DATA.audioUrls?.length
      ? WEDDING_DATA.audioUrls
      : (WEDDING_DATA.audioUrl ? [WEDDING_DATA.audioUrl] : []);
    this.initAudio();
  }

  private initAudio() {
    if (typeof window === 'undefined' || this.playlist.length === 0) return;

    this.audio = new Audio(this.playlist[this.currentTrackIndex()]);
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => this.isPlaying.set(true));
    this.audio.addEventListener('pause', () => this.isPlaying.set(false));
    this.audio.addEventListener('ended', () => this.nextTrack());

    // 1. Thử phát nhạc ngay lập tức (Autoplay)
    this.audio.play()
      .then(() => {
        this.isPlaying.set(true);
        this.userInteracted = true;
      })
      .catch(() => {
        // Trình duyệt chặn autoplay khi chưa có tương tác -> Lắng nghe cử chỉ đầu tiên
        const handleFirstGesture = () => {
          if (this.userInteracted) return;
          this.userInteracted = true;
          if (this.audio && !this.isPlaying()) {
            this.audio.play()
              .then(() => this.isPlaying.set(true))
              .catch((err) => console.warn('Could not start audio playback', err));
          }
          this.cleanupGestureListeners(handleFirstGesture);
        };

        document.addEventListener('click', handleFirstGesture, { once: true, passive: true });
        document.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });
        document.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
        document.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });
        document.addEventListener('mousemove', handleFirstGesture, { once: true, passive: true });
      });
  }

  nextTrack() {
    if (this.playlist.length === 0) return;
    const nextIdx = (this.currentTrackIndex() + 1) % this.playlist.length;
    this.playTrack(nextIdx);
  }

  playTrack(index: number) {
    if (index < 0 || index >= this.playlist.length) return;
    this.currentTrackIndex.set(index);

    if (this.audio) {
      this.audio.pause();
      this.audio.src = this.playlist[index];
      this.audio.load();
      this.audio.play()
        .then(() => this.isPlaying.set(true))
        .catch(err => console.warn('Error playing next track', err));
    }
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
