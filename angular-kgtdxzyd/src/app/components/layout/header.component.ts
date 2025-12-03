
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-40
      "
    >
      <div
        class="
          px-6 py-3
          rounded-full
          backdrop-blur-xl
          bg-white/30
          border border-white/40
          shadow-[0_8px_28px_rgba(0,0,0,0.12)]
          flex items-center gap-3
        "
      >
        <span
          class="
            inline-block
            w-1.5 h-5
            rounded-full
            bg-black
          "
        ></span>

        <h1
          class="
            text-[18px]
            font-semibold
            tracking-[0.16em]
            uppercase
          "
        >
          Teen Budget
        </h1>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
