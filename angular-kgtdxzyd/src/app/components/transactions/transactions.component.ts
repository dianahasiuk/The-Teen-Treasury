// src/app/components/transactions/transactions.component.ts
import { Component } from '@angular/core';
import { NgFor, NgClass, DatePipe, CurrencyPipe } from '@angular/common';

interface Transaction {
  id: string;
  title: string;
  amount: number; 
  date: Date;
  category: string;
}

type FilterType = 'all' | 'income' | 'expense';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [NgFor, NgClass, DatePipe, CurrencyPipe],
  template: `
<div class="page">

  <!-- HEADER -->
  <h1 class="title">
    TRANSAC<br>
    TIONS
</h1>

  <!-- FILTERS -->
  <div class="filters">
    <button
      *ngFor="let f of filters"
      (click)="activeFilter = f.value"
      class="filter-btn"
      [class.active]="activeFilter === f.value"
    >
      {{ f.label }}
    </button>
  </div>

  <!-- LIST -->
  <div class="list">
    <div
      *ngFor="let tx of filteredTransactions()"
      class="item"
      [class.income]="tx.amount > 0"
      [class.expense]="tx.amount < 0"
    >
      <div class="left">
        <h3>{{ tx.title }}</h3>
        <p>{{ tx.date | date:'MMM d, HH:mm' }}</p>
      </div>

      <div class="amount">
        {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount | currency:'₴':'symbol':'1.0-0' }}
      </div>
    </div>
  </div>

  <!-- FAB BUTTON -->
  <button class="fab">+</button>

</div>
  `,
  styles: [`

/* PAGE */
.page {
  padding: 4rem 1.8rem 11rem;
  max-width: 520px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  color: #000;
}

/* TITLE */
.title {
  font-size: 4.4rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  margin-bottom: 3rem;
}

/* FILTERS */
.filters {
  display: flex;
  gap: 2.6rem;
  margin-bottom: 4rem;
}

.filter-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding-bottom: 0.4rem;
  cursor: pointer;
  color: #000;
  opacity: 0.5;
  position: relative;
}

.filter-btn.active {
  opacity: 1;
}

.filter-btn.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 3px;
  background: #000;
  border-radius: 2px;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* left side */
.left h3 {
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 0.2rem 0;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.left p {
  font-size: 1rem;
  opacity: 0.65;
}

/* AMOUNT COLORS */
.amount {
  font-size: 2.1rem;
  font-weight: 900;
  margin-top: -0.2rem;
}

/* витрати = чорний */
.expense .amount {
  color: #000;
}

/* доходи = білий */
.income .amount {
  color: #ffffff;
  text-shadow: 0 0 6px rgba(0,0,0,0.35);
}

/* FAB BUTTON */
.fab {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  font-size: 48px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 18px 44px rgba(0,0,0,0.32);
}

@media (max-width: 480px) {
  .title {
    font-size: 3.8rem;
  }
  .left h3 {
    font-size: 2rem;
  }
  .amount {
    font-size: 1.9rem;
  }
}
  `]
})
export class TransactionsComponent {

  activeFilter: FilterType = 'all';

  filters = [
    { label: 'ALL', value: 'all' as const },
    { label: 'INCOME', value: 'income' as const },
    { label: 'EXPENSE', value: 'expense' as const }
  ];

  transactions: Transaction[] = [
    { id: '1', title: 'GROCERIES', amount: -600, date: new Date('2025-04-01T11:20:00'), category: 'food' },
    { id: '2', title: 'RECEIPT', amount: 3000, date: new Date('2025-03-31T16:45:00'), category: 'income' },
    { id: '3', title: 'SHOPPING', amount: -890, date: new Date('2025-03-30T14:10:00'), category: 'fun' },
    { id: '4', title: 'UTILITIES', amount: -450, date: new Date('2025-03-29T09:15:00'), category: 'bills' }
  ];

  filteredTransactions() {
    if (this.activeFilter === 'all') return this.transactions;
    return this.transactions.filter(t =>
      this.activeFilter === 'income' ? t.amount > 0 : t.amount < 0
    );
  }
}

