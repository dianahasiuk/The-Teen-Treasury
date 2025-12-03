// src/app/services/tips.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private fallbackTips = [
    "Set clear savings goals",
    "Track your spending daily",
    "Avoid impulse purchases",
    "Start saving at least 10% of income",
    "Review your budget weekly"
  ];

  getRandomTip(): string {
    const w = this.fallbackTips.length;
    return this.fallbackTips[Math.floor(Math.random() * w)];
  }
}