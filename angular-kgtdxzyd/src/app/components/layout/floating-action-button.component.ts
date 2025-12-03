import { Component } from '@angular/core';

@Component({
  selector: 'app-fab',
  standalone: true,
  host: {
    class: 'block fixed bottom-24 right-6 z-40',
  },
  template: `
    <button
      class="
        group
        relative
        flex items-center justify-center
        h-16 w-16
        rounded-full
        bg-black text-white
        shadow-[0_6px_18px_rgba(0,0,0,0.28)]
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        focus:outline-none
      "
      aria-label="Add"
    >

      <!-- INNER RING  -->
      <span
        class="
          absolute inset-[3px]
          rounded-full
          border border-white/15
          pointer-events-none
        "
      ></span>

      <!-- ICON  -->
      <svg
        class="w-8 h-8 relative z-10"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
      >
        <line x1="16" y1="8" x2="16" y2="24" />
        <line x1="8" y1="16"  x2="24" y2="16" />
      </svg>

      <!-- OUTER SKY-GLOW  -->
      <span
        class="
          absolute inset-0 rounded-full
          bg-[#b8dcfd]/40
          blur-2xl
          opacity-0
          transition-opacity duration-600
          group-hover:opacity-40
        "
      ></span>

      <!-- SUBTLE SHINE -->
      <span
        class="
          absolute top-0 left-0 right-0 mx-auto
          w-[70%] h-[30%]
          bg-white/15
          blur-lg
          rounded-full
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-60
        "
      ></span>

    </button>
  `,
})
export class FloatingActionButtonComponent {}