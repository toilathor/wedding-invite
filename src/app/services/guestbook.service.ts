import { Injectable, signal } from '@angular/core';
import { GuestMessage } from '../models/wedding-data.model';
import { WEDDING_DATA } from '../core/wedding-data';

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {
  private readonly STORAGE_KEY = 'wedding_wishes_vuonghang';
  messages = signal<GuestMessage[]>([]);

  constructor() {
    this.loadMessages();
  }

  private loadMessages() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.messages.set(parsed);
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved wishes', e);
      }
    }
    this.messages.set([...WEDDING_DATA.messages]);
  }

  addMessage(name: string, content: string): GuestMessage {
    const newMessage: GuestMessage = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    this.messages.update(list => [newMessage, ...list]);
    this.saveToStorage();
    return newMessage;
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages()));
    } catch (e) {
      console.warn('Could not save wishes to localStorage', e);
    }
  }
}
