import { Component, Input, signal, computed } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

export type AchievementRarity = 'common' | 'rare' | 'epic';

@Component({
  selector: 'app-achievement-card',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div
      class="card"
      [class.earned]="state() === 'earned'"
      [class.in-progress]="state() === 'in-progress'"
      [class.locked]="state() === 'locked'"
      [class.rare]="rarity === 'rare'"
      [class.epic]="rarity === 'epic'"
    >

      <div class="aura" *ngIf="rarity === 'epic' && state() === 'earned'"></div>

      <div class="circle-wrapper">
        <div class="circle">

          <div class="progress-glow" *ngIf="state() === 'in-progress'"></div>

          <svg class="progress-ring" viewBox="0 0 140 140" *ngIf="state() !== 'locked'">
            <circle class="track" cx="70" cy="70" r="64"></circle>
            <circle
              class="progress"
              cx="70" cy="70" r="64"
              [style.stroke-dashoffset]="dashOffset()"
            ></circle>
          </svg>

          <div class="icon">{{ icon }}</div>
          <div class="lock-overlay" *ngIf="state() === 'locked'">🔒</div>
        </div>
      </div>

      <div class="content">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>

      <div class="progress-badge" *ngIf="state() === 'in-progress'">
        {{ progress }}%
      </div>
    </div>
  `
})
export class AchievementCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) progress!: number;
  @Input() rarity: AchievementRarity = 'common';

  state = computed(() => {
    if (this.progress === 0) return 'locked';
    if (this.progress === 100) return 'earned';
    return 'in-progress';
  });

  dashOffset = computed(() => {
    const c = 402;
    return c - (c * this.progress / 100);
  });
}