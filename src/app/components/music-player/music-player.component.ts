import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bii-player"
      [class.is-playing]="audioService.isPlaying()"
      [style.--theme-color]="'#A12F0C'"
      [style.--pulse-color]="'#A12F0C4D'"
    >
      <!-- Floating Musical Notes when Playing -->
      <div
        *ngIf="audioService.isPlaying()"
        class="absolute inset-0 pointer-events-none overflow-visible z-0"
      >
        <span class="floating-note floating-note-1 text-[#A12F0C] select-none">♪</span>
        <span class="floating-note floating-note-2 text-[#C04A26] select-none">♫</span>
        <span class="floating-note floating-note-3 text-[#A12F0C] select-none">♬</span>
        <span class="floating-note floating-note-4 text-[#D4AF37] select-none">♩</span>
      </div>

      <button
        type="button"
        class="playerIcon"
        (click)="audioService.toggle()"
        [attr.aria-label]="
          audioService.isPlaying() ? 'Tắt nhạc nền' : 'Bật nhạc nền'
        "
        [title]="audioService.isPlaying() ? 'Tắt nhạc' : 'Bật nhạc'"
      >
        <!-- Spinning Musical Note Icon -->
        <div
          class="flex items-center justify-center text-white"
          [class.animate-spin-music]="audioService.isPlaying()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-xs"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
            />
          </svg>
        </div>

        <!-- Diagonal mute indicator bar when paused -->
        <div
          *ngIf="!audioService.isPlaying()"
          class="absolute w-6 sm:w-7 h-[2px] bg-white/90 rotate-45 rounded-full shadow-xs pointer-events-none"
        ></div>
      </button>
    </div>
  `
})
export class MusicPlayerComponent {
  audioService = inject(AudioService);
}
