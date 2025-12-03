// src/app/components/transactions/transaction-item.component.ts
import { Component, Input } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

export interface Transaction {
  id: string;
  title: string;
  amount: number;        
  date: Date;
  category?: string;
}

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  host: { class: 'block' },
  template: `
    <div
      class="transaction-item"
      [class.income]="transaction.amount > 0"
      [class.expense]="transaction.amount < 0"
    >
      <!-- Ліва частина: назва + дата -->
      <div class="tx-info">
        <h3 class="tx-title">{{ transaction.title }}</h3>
        <p class="tx-date">
          {{ transaction.date | date:'MMM d, HH:mm' }}
        </p>
      </div>

      <!-- Права частина: сума -->
      <div class="tx-amount">
        {{ transaction.amount > 0 ? '+' : '' }}
        {{ transaction.amount | currency:'₴':'symbol':'1.0-0' }}
      </div>
    </div>
  `,
  styles: [`
    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .tx-info h3 {
      font-size: 2.35rem;
      font-weight: 850;
      margin: 0 0 0.35rem 0;
      line-height: 1;
      letter-spacing: -0.04em;
      color: #000;
      text-transform: uppercase;
    }

    .tx-date {
      font-size: 0.98rem;
      font-weight: 500;
      opacity: 0.68;
      margin: 0;
      letter-spacing: 0.02em;
      color: #000;
    }

    .tx-amount {
      font-size: 2.1rem;
      font-weight: 850;
      letter-spacing: -0.03em;
      margin-top: -0.15rem;
      white-space: nowrap;
    }

    
    .income .tx-amount {
      color: #22c55e; 
    }

    
    .expense .tx-amount {
      color: #ef4444;
    }

    
    @media (max-width: 480px) {
      .tx-info h3 { font-size: 2.1rem; }
      .tx-amount { font-size: 1.9rem; }
    }
  `]
})
export class TransactionItemComponent {
  @Input({ required: true }) transaction!: Transaction;
}