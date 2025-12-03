// src/app/components/achievements/achievements.component.ts
import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Achievement {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;  
  rarity: 'common' | 'rare' | 'epic';
}

  
@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="achievements-page">
  <header class="header">
    <div class="jar">🫙</div>
    
        <h1 class="title">
    <br>Achieve
    ments
</h1>
<p class="subtitle">
      complete goals and unlock<br>new achievements
    </p>
    
    <div class="gear">⚙️</div>
  </header>
      <div class="list">
        <div
          *ngFor="let item of achievements(); let i = index"
          class="card"
          [class.unlocked]="item.unlocked"
          [style.--delay]="(i * 100) + 'ms'"
          [class.rarity-common]="item.rarity === 'common'"
          [class.rarity-rare]="item.rarity === 'rare'"
          [class.rarity-epic]="item.rarity === 'epic'"
        >
          <div class="icon-wrapper">
            <div class="icon" [class.dimmed]="!item.unlocked">{{ item.icon }}</div>
            <div class="aura" *ngIf="item.unlocked"></div>
            <svg class="progress-ring" *ngIf="item.progress > 0 && item.progress < 100" viewBox="0 0 80 80">
              <circle class="ring-bg" cx="40" cy="40" r="36"></circle>
              <circle class="ring-fill" cx="40" cy="40" r="36" [attr.stroke-dashoffset]="progressOffset(item.progress)"></circle>
            </svg>
            <div class="lock" *ngIf="item.progress === 0">🔒</div>
          </div>
          <div class="text">
            <h3 class="achievement-title">{{ item.title }}</h3>
            <p class="achievement-desc">{{ item.description }}</p>
          </div>
          <div class="status" *ngIf="item.unlocked">✓</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100dvh;
      background: linear-gradient(180deg, #FFD7BA 0%, #FFE8D6 40%, #FFF4E6 100%);
    }
    .achievements-page {
      padding: 2.5rem 1.5rem 10rem;
      max-width: 500px;
      margin: 0 auto;
      position: relative;
      color: #000;
    }
    .header {
      text-align: left;
      margin-bottom: 4rem;
      position: relative;
    }
    .jar {
      font-size: 4rem;
      margin-bottom: 1.2rem;
      opacity: 0.9;
    }
    .title {
      font-size: 5rem;
      font-weight: 900;
      letter-spacing: -0.06em;
      line-height: 1;
      margin: 0 0 1rem;
      color: #000;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 500;
      opacity: 0.7;
      line-height: 1.4;
      margin: 0;
      color: #000;
    }
    .gear {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.6rem;
      opacity: 0.6;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .card {
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      padding: 1.2rem 1.6rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      opacity: 0;
      transform: translateY(20px);
      animation: fadeSlide 0.6s ease-out forwards;
      animation-delay: var(--delay, 0ms);
      transition: all 0.3s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }
    .card.unlocked {
      background: #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    }
    .card.rarity-common { --rarity-color: #b3ebfd; --rarity-glow: rgba(160,160,160,0.3); }
    .card.rarity-rare { --rarity-color:  #61c8e8; --rarity-glow: rgba(139,92,246,0.35); }
    .card.rarity-epic { --rarity-color: #ffc8d7; --rarity-glow: rgba(251,191,36,0.4); }
    .icon-wrapper {
      position: relative;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon {
      font-size: 2.2rem;
      transition: all 0.3s ease;
    }
    .icon.dimmed { opacity: 0.4; }
    .aura {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--rarity-glow) 20%, transparent 80%);
      filter: blur(8px);
      opacity: 0.8;
      animation: pulseAura 2s ease-in-out infinite;
    }
    .progress-ring {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transform: rotate(-90deg);
    }
    .ring-bg {
      fill: none;
      stroke: rgba(0,0,0,0.08);
      stroke-width: 4;
    }
    .ring-fill {
      fill: none;
      stroke: var(--rarity-color);
      stroke-width: 4;
      stroke-linecap: round;
      stroke-dasharray: 226;
      transition: stroke-dashoffset 0.8s ease;
    }
    .lock {
      position: absolute;
      font-size: 1.6rem;
      opacity: 0.5;
    }
    .text { flex: 1; }
    .achievement-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin: 0 0 0.2rem;
      line-height: 1.2;
      color: #000;
    }
    .achievement-desc {
      font-size: 1rem;
      opacity: 0.6;
      margin: 0;
      line-height: 1.3;
      color: #000;
    }
    .status {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 900;
      background: var(--rarity-color);
      color: #fff;
      box-shadow: 0 0 12px var(--rarity-glow);
      opacity: 0.9;
    }
    .title {
  font-size: 5.5rem;         
  font-weight: 900;
  letter-spacing: -0.08em;   
  line-height: 0.9;
  margin: 0 0 1.2rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.8;
  margin-top: -0.5rem;       
}

.jar {
  font-size: 1.8rem;        
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.85;
}

.gear {
  font-size: 1.8rem;        
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.6;
}


.header {
  position: relative;
  padding-top: 3.2rem;       
  text-align: center;        
  margin-bottom: 5rem;
}

.title {
  margin-top: 0.8rem;        
}
    @keyframes fadeSlide {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseAura {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.08); opacity: 0.9; }
    }
    @media (max-width: 480px) {
      .title { font-size: 4.5rem; }
      .card { padding: 1rem 1.4rem; gap: 1rem; border-radius: 18px; }
      .icon-wrapper { width: 44px; height: 44px; }
      .icon { font-size: 2rem; }
      .achievement-title { font-size: 1.4rem; }
      .achievement-desc { font-size: 0.95rem; }
      .status { width: 32px; height: 32px; font-size: 1.2rem; }
    }
  `]
})
export class AchievementsComponent {
  achievements = signal<Achievement[]>([
    { title: 'First deposit', description: 'Add money to a jar', icon: '🏦', unlocked: true, progress: 100, rarity: 'common' },
    { title: 'High Roller', description: 'Save 5000₴ total', icon: '🏆', unlocked: true, progress: 100, rarity: 'common' },
    { title: 'Cold Wallet', description: 'Zero expenses in 24h', icon: '🧊', unlocked: true, progress: 100, rarity: 'common' },
    { title: 'No-Spend Champion', description: 'No spending for 3 days', icon: '🚫', unlocked: true, progress: 100, rarity: 'common' },
    { title: '5 goals completed', description: 'Achieve five goals', icon: '⭐', unlocked: false, progress: 60, rarity: 'rare' },
    { title: 'Big Deposit', description: 'Add 1000₴ in one action', icon: '💰', unlocked: false, progress: 90, rarity: 'rare' },
    { title: 'Expert', description: 'Unlock all achievements', icon: '💸', unlocked: false, progress: 20, rarity: 'epic' },
    { title: 'The Jar Is Full', description: 'Reach 100% jar', icon: '🫙', unlocked: false, progress: 0, rarity: 'rare' },
    { title: 'The last goal', description: 'Reach the final goal', icon: '🎯', unlocked: false, progress: 0, rarity: 'rare' },

  ]);

  progressOffset(progress: number): number {
    return 226 * (1 - progress / 100);
  }
}