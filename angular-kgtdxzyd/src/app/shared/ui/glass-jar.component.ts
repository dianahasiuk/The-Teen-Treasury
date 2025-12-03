
// src/app/shared/ui/glass-jar.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'glass-jar',
  standalone: true,
  host: { class: 'block select-none pointer-events-none' },
  template: `
    <div class="jar-container">
      <!-- Основна банка -->
      <div class="jar-emoji">🫙</div>

      <!-- Наповнення (рідина) -->
      <div
        class="jar-fill"
        [style.height.%]="safeFill"
        [style.opacity]="safeFill > 2 ? 1 : 0"
      ></div>

      <!-- Glow під банкою -->
      <div
        class="jar-glow"
        [style.opacity]="safeFill > 8 ? 0.8 : 0"
      ></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 200px;
      height: 300px;
      margin: 0 auto;
    }

    .jar-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .jar-emoji {
      font-size: 184px;
      line-height: 1;
      user-select: none;
      pointer-events: none;
      position: relative;
      z-index: 30;
    }

    .jar-fill {
      position: absolute;
      bottom: 68px;
      left: 50%;
      transform: translateX(-50%);
      width: 112px;
      background: linear-gradient(to top,
        #d08a55 0%,
        #e8b890 30%,
        #f3c99b 55%,
        #ffe7d1 80%,
        #fff4e6 100%
      );
      border-radius: 0 0 28px 28px;
      transition: all 800ms cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 10;

      /* Маскування під форму банки */
      mask-image: linear-gradient(to top, black 82%, transparent 100%);
      -webkit-mask-image: linear-gradient(to top, black 82%, transparent 100%);
      mask-size: 100% 100%;
      mask-position: center bottom;
      mask-repeat: no-repeat;

      /* Легкий блік і об'єм */
      filter: blur(0.5px);
      box-shadow:
        0 8px 20px rgba(208, 138, 85, 0.25),
        inset 0 6px 12px rgba(255, 255, 255, 0.3);
    }

    .jar-glow {
      position: absolute;
      bottom: 44px;
      left: 50%;
      transform: translateX(-50%);
      width: 160px;
      height: 28px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      filter: blur(32px);
      transition: opacity 800ms ease;
      z-index: 5;
    }

    /* Адаптивність */
    @media (max-width: 480px) {
      :host {
        width: 180px;
        height: 270px;
      }
      .jar-emoji { font-size: 164px; }
      .jar-fill { width: 100px; bottom: 62px; }
      .jar-glow { width: 140px; height: 24px; bottom: 40px; }
    }
  `]
})
export class GlassJarComponent implements OnChanges {
  @Input() fill: number = 0;

  safeFill = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fill']) {
      const value = changes['fill'].currentValue;
      const num = Number(value);
      this.safeFill = Math.max(0, Math.min(100, isNaN(num) ? 0 : num));
    }
  }
}