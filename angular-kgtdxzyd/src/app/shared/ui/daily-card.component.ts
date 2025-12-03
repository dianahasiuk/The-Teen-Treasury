import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';

type CardType = 'tip' | 'quote' | 'fact';
interface CardContent { label: string; text: string; }

@Component({
  selector: 'daily-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="card-wrapper"
         (pointerdown)="onPointerDown($event)"
         (pointermove)="onPointerMove($event)"
         (pointerup)="onPointerUp($event)"
         (pointercancel)="onPointerUp($event)"
         (pointerleave)="onPointerUp($event)">

      <div class="card"
           [style.transform]="transform()"
           [style.opacity]="opacity()"
           [style.filter]="glow()"
           [class.swiping]="swiping()">

        <!-- Преміальний блік + верхній відблиск -->
        <div class="gloss"></div>
        <div class="top-glow"></div>

        <!-- Золотий чіп — залишаємо, бо це вогонь -->
        <div class="chip"></div>

        <!-- Контент -->
        <p class="label">{{ content().label }}</p>
        <p class="text">{{ content().text }}</p>

        <!-- Нижній рядок -->
        <div class="details">
          <span>daily spark</span>
          <span>est. 2025</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem 0;
      perspective: 1200px;
    }

    .card-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      touch-action: pan-y;
    }

    /* ==================== ОСНОВНА КАРТКА ==================== */
    .card {
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1.586 / 1;
      padding: 2.4rem;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      color: #fff;
      user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      cursor: grab;
      will-change: transform;

      /* Твій точний градієнт — 100% збігається */
      background: linear-gradient(135deg,
        #3296b6 0%,
        #4fb0cf 20%,
        #61c8e8 50%,
        #3296b6 80%,
        #007296 100%
      );

      border: 1.4px solid rgba(255,255,255,0.42);
      box-shadow:
        0 12px 38px rgba(0,0,0,0.38),
        0 32px 90px rgba(0,0,0,0.28),
        inset 0 1px 0 rgba(255,255,255,0.45),
        inset 0 -2px 6px rgba(0,0,0,0.22);

      transition: box-shadow 0.44s cubic-bezier(0.22,1,0.36,1);
    }

    .card.swiping { cursor: grabbing; }

    /* ==================== БЛІК — плавний і завжди всередині ==================== */
    .gloss {
      position: absolute;
      inset: -100%;
      background: radial-gradient(
        circle at 20% 20%,
        rgba(255,255,255,0.50) 0%,
        rgba(255,255,255,0.24) 38%,
        rgba(255,255,255,0.06) 65%,
        transparent 100%
      );
      mix-blend-mode: overlay;
      pointer-events: none;
      opacity: 0.92;
      transform: translate(10%, 10%);
      transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
    }
    .card:hover .gloss { transform: translate(-28%, -28%); }

    /* Верхній м'який відблиск */
    .top-glow {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 68%;
      background: linear-gradient(180deg,
        rgba(255,255,255,0.40) 0%,
        rgba(255,255,255,0.14) 50%,
        transparent 100%
      );
      pointer-events: none;
      border-radius: 20px 20px 0 0;
    }

    /* Золотий чіп */
    .chip {
      position: absolute;
      top: 36px;
      left: 36px;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #ffd700 0%, #f1e5a5 50%, #d4af37 100%);
      border-radius: 9px;
      box-shadow: inset 0 3px 8px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.5);
    }

    /* ==================== ТЕКСТ ==================== */
    .label {
      font-size: 0.84rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.28em;
      margin: 0 0 1.6rem 0;
      color: #ffffff;
      opacity: 0.96;
      text-shadow: 0 1px 3px rgba(0,0,0,0.6);
    }

    .text {
      font-size: 1.44rem;
      line-height: 1.48;
      letter-spacing: 0.02em;
      color: #ffffff;
      margin: 0;
      font-weight: 600;
      text-shadow: 0 2px 8px rgba(0,0,0,0.58);
      transition: transform 0.3s ease;
    }
    .card:hover .text { transform: translateY(-4px); }

    .details {
      position: absolute;
      bottom: 32px;
      left: 36px;
      right: 36px;
      display: flex;
      justify-content: space-between;
      font-size: 0.92rem;
      letter-spacing: 0.12em;
      color: #e8f9ff;
      opacity: 0.9;
      text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    }

    /* ==================== АДАПТИВ ==================== */
    @media (max-width: 480px) {
      .card {
        max-width: 340px;
        padding: 2rem;
      }
      .text { font-size: 1.32rem; }
      .chip { width: 48px; height: 48px; top: 32px; left: 32px; }
    }
  `]
})
export class DailyCardComponent implements OnDestroy {
  readonly x = signal(0);
  readonly y = signal(0);
  readonly swiping = signal(false);

  readonly opacity = computed(() => Math.max(0.45, 1 - Math.hypot(this.x(), this.y()) / 420));

  readonly transform = computed(() => {
    const dx = this.x();
    const dy = this.y();
    return `translate(${dx}px, ${dy}px) rotateY(${dx / -20}deg) rotateX(${dy / 25}deg)`;
  });

  readonly glow = computed(() => {
    const dist = Math.hypot(this.x(), this.y());
    const power = Math.min(dist / 140, 1);
    return power < 0.2 ? 'none' : `drop-shadow(0 0 ${power * 26}px rgba(100, 220, 255, 0.85))`;
  });

  readonly content = signal<CardContent>({ label: 'tip', text: 'Loading...' });
  private readonly type = signal<CardType>('tip');

  private readonly tips = [
    'Start with small daily savings.',
    'Always track where every ₴ goes.',
    'Save 10% of any income.',
    'Set a weekly savings goal.',
    'Create one “no-spend day” per week.',
  ] as const;

  private readonly quotes = [
    '“Discipline is choosing what you want most.”',
    '“Small steps make big results.”',
    '“A budget is freedom — not restriction.”',
  ] as const;

  private readonly facts = [
    'Daily savers are 42% more likely to reach goals.',
    'Impulse purchases = 40% of teen spending.',
    'Saving habits before 20 increase wealth x5.',
  ] as const;

  constructor() {
    effect(() => {
      const t = this.type();
      const pool = t === 'tip' ? this.tips : t === 'quote' ? this.quotes : this.facts;
      const label = t === 'fact' ? 'did you know?' : t;
      const text = pool[Math.floor(Math.random() * pool.length)];
      this.content.set({ label, text });
    }, { allowSignalWrites: true });
  }

  // Swipe logic
  private startX = 0;
  private startY = 0;
  private pid: number | null = null;

  onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.swiping.set(true);
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.pid = e.pointerId;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  onPointerMove(e: PointerEvent) {
    if (!this.swiping() || e.pointerId !== this.pid) return;
    this.x.set(e.clientX - this.startX);
    this.y.set(e.clientY - this.startY);
  }

  onPointerUp(e: PointerEvent) {
    if (!this.swiping()) return;
    const dx = this.x();
    const dy = this.y();
    const threshold = window.innerWidth < 480 ? 100 : 140;

    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      this.swipe(dx > 0 ? 'tip' : 'quote');
    } else if (Math.abs(dy) > threshold && dy > 0) {
      this.swipe('fact');
    } else {
      this.reset();
    }
    this.swiping.set(false);
  }

  private swipe(type: CardType) {
    this.type.set(type);
    this.x.set(this.x() > 0 ? 1600 : -1600);
    this.y.set(this.y() * 1.2);
    setTimeout(() => this.reset(), 420);
  }

  private reset() {
    this.x.set(0);
    this.y.set(0);
  }

  ngOnDestroy() {
    this.reset();
    this.swiping.set(false);
  }
}