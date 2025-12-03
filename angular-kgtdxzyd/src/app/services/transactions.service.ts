// src/app/services/transactions.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';

export interface Transaction {
  id: string;
  title: string;
  amount: number;        // + = дохід, - = витрата
  date: string;          // ISO string
  category?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  // Сигнал з усіма транзакціями
  private _transactions = signal<Transaction[]>([]);

  // Публічні read-only сигнали
  transactions = this._transactions.asReadonly();

  // Підрахунок балансу (для Dashboard)
  balance = computed(() =>
    this._transactions().reduce((sum, t) => sum + t.amount, 0)
  );

  // Підрахунок доходів
  totalIncome = computed(() =>
    this._transactions()
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  // Підрахунок витрат
  totalExpenses = computed(() =>
    Math.abs(
      this._transactions()
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    )
  );

  constructor() {
    this.loadFromStorage();

    // Автозбереження при кожній зміні
    effect(() => {
      this.saveToStorage();
    });
  }

  // Завантаження з localStorage
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('teen-budget-transactions');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          this._transactions.set(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load transactions from storage');
    }

    // Якщо нічого немає — створюємо демо-даних як на скріншоті
    this.setDemoData();
  }

  // Демо-данні (як на твоєму скріншоті Transactions)
  private setDemoData(): void {
    this._transactions.set([
      {
        id: '1',
        title: 'Groceries',
        amount: -600,
        date: '2025-04-01T11:20:00',
        category: 'food',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Receipt',
        amount: 3000,
        date: '2025-03-31T16:45:00',
        category: 'income',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Shopping',
        amount: -890,
        date: '2025-03-30T14:10:00',
        category: 'fun',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Utilities',
        amount: -450,
        date: '2025-03-29T09:15:00',
        category: 'bills',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  // Збереження в localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem(
        'teen-budget-transactions',
        JSON.stringify(this._transactions())
      );
    } catch (e) {
      console.warn('Failed to save transactions');
    }
  }

  // Додати транзакцію
  addTransaction(data: {
    title: string;
    amount: number;  // вже з правильним знаком (+ або -)
    date: string;
    category?: string;
  }): void {
    if (!data.title.trim() || data.amount === 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: data.title.trim().toUpperCase(),
      amount: data.amount,
      date: data.date,
      category: data.category,
      createdAt: new Date().toISOString()
    };

    this._transactions.update(txs => [...txs, newTx]);
  }

  // Видалити транзакцію (на майбутнє)
  deleteTransaction(id: string): void {
    this._transactions.update(txs => txs.filter(t => t.id !== id));
  }

  // Очистити всі транзакції (для тесту)
  clearAll(): void {
    this._transactions.set([]);
  }
}