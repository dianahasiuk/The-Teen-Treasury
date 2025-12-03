// src/app/components/layout/bottom-nav.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" role="navigation" aria-label="Bottom navigation">
      
      <a routerLink="/" routerLinkActive="active" class="nav-item" aria-label="Dashboard">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>dashboard</span>
      </a>

      <a routerLink="/goals" routerLinkActive="active" class="nav-item" aria-label="Goals">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
          <path d="m15 9 3 3-3 3"/>
          <path d="m9 9-3 3 3 3"/>
        </svg>
        <span>goals</span>
      </a>

      <a routerLink="/transactions" routerLinkActive="active" class="nav-item" aria-label="Transactions">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>transactions</span>
      </a>

      <a routerLink="/achievements" routerLinkActive="active" class="nav-item" aria-label="Achievements">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>achievements</span>
      </a>
    </nav>
  `,
  styles: [`
    :host { display: block; pointer-events: none; }

    .bottom-nav {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border-radius: 32px;
      padding: 16px 36px;
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.18),
        0 4px 12px rgba(0, 0, 0, 0.12);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 48px);
      max-width: 420px;
      margin: 0 auto;
      pointer-events: all;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: #666;
      font-size: 11px;
      font-weight: 500;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 16px;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .nav-item svg {
      width: 26px;
      height: 26px;
      stroke-width: 2.1;
      transition: all 0.35s ease;
    }

    .nav-item.active {
      color: #000;
      font-weight: 700;
      background: rgba(0, 0, 0, 0.06);
    }

    .nav-item.active svg {
      stroke: #000;
      transform: scale(1.08);
    }

    .nav-item:hover:not(.active) {
      color: #222;
      background: rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 480px) {
      .bottom-nav { padding: 14px 28px; width: calc(100% - 32px); }
      .nav-item { gap: 4px; font-size: 10.5px; padding: 8px 10px; }
    }
  `]
})
export class BottomNavComponent {}