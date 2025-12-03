import { Component, signal, computed, OnInit } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { GlassJarComponent } from '../../shared/ui/glass-jar.component';
import { DailyCardComponent } from '../../shared/ui/daily-card.component';
import { TransactionsService } from '../../services/transactions.service';
import { TipsService } from '../../services/tips.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe, GlassJarComponent, DailyCardComponent, NgIf],
  template: `
    <div class="dashboard-wrapper">

      <!-- TITLE -->
      <header class="header-section">
        <h1 class="main-title">TEEN BUDGET</h1>
        <p class="balance-label">balance</p>
      </header>

      <!-- BALANCE + JAR -->
      <div class="balance-jar-section">
        <div class="balance-amount">
          ₴{{ balance() | number:'1.0-0' }}
        </div>

        <glass-jar [fill]="jarFill()" class="jar"></glass-jar>
      </div>

      <!-- DAILY MOTIVATION CARD -->
      <section class="motivation-section">
        <daily-card></daily-card>
      </section>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      padding-bottom: 160px;
    }

    .dashboard-wrapper {
      padding: 2rem 1.5rem;
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }

    .header-section {
      margin-bottom: 3rem;
      animation: fadeUp 0.8s ease-out forwards;
    }

    .main-title {
      font-size: 2.6rem;
      font-weight: 900;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      margin: 0;
      color: #000;
    }

    .balance-label {
      font-size: 1.15rem;
      font-weight: 500;
      opacity: 0.75;
      margin-top: 0.4rem;
    }

    .balance-jar-section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2.6rem;
      flex-wrap: wrap;
      margin: 4rem 0 5rem;
      animation: fadeUp 0.8s ease-out 0.2s forwards;
    }

    .balance-amount {
      font-size: 5rem;
      font-weight: 900;
      letter-spacing: -0.06em;
      margin: 0;
    }

    .jar {
      width: 148px;
      height: 188px;
      filter: drop-shadow(0 16px 40px rgba(0,0,0,0.18));
    }

    .motivation-section {
      margin-top: 2rem;
      animation: fadeUp 0.8s ease-out 0.35s forwards;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .main-title { font-size: 2.3rem; }
      .balance-amount { font-size: 4.2rem; }
      .jar { width: 130px; height: 170px; }
    }
  `],
})
export class DashboardComponent implements OnInit {

  // === BALANCE ===
  balance = computed(() => this.tx.balance());

  jarFill = computed(() => {
    const percent = (this.balance() / 10000) * 100; // goal = ₴10,000
    return Math.min(100, Math.max(0, Math.round(percent)));
  });

  constructor(
    private tx: TransactionsService,
    private tips: TipsService
  ) {}

  ngOnInit(): void {}
}