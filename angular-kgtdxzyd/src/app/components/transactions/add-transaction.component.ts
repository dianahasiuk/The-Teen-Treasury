// src/app/components/transactions/add-transaction.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

interface NewTransaction {
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal" (click)="$event.stopPropagation()">

        <!-- Заголовок -->
        <h1 class="modal-title">new transaction</h1>

        <!-- Форма -->
        <form (ngSubmit)="saveTransaction()" class="form">

          <!-- Тип транзакції -->
          <div class="type-toggle">
            <button
              type="button"
              (click)="form.type = 'expense'"
              [class.active]="form.type === 'expense'"
              class="toggle-btn expense"
            >Expense</button>
            <button
              type="button"
              (click)="form.type = 'income'"
              [class.active]="form.type === 'income'"
              class="toggle-btn income"
            >Income</button>
          </div>

          <!-- Сума -->
          <div class="input-group">
            <input
              type="number"
              [(ngModel)]="form.amount"
              name="amount"
              placeholder="0"
              required
              min="1"
              class="amount-input"
              autofocus
            />
            <span class="currency">₴</span>
          </div>

          <!-- Назва -->
          <div class="input-group">
            <input
              type="text"
              [(ngModel)]="form.title"
              name="title"
              placeholder="Назва (Groceries, Salary...)"
              required
              class="title-input"
            />
          </div>

          <!-- Дата та час -->
          <div class="input-group">
            <input
              type="datetime-local"
              [(ngModel)]="form.date"
              name="date"
              required
              class="date-input"
            />
          </div>

          <!-- Кнопки -->
          <div class="actions">
            <button type="button" (click)="close.emit()" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-save" [disabled]="!isValid">
              {{ form.type === 'income' ? '+ Add Income' : '- Add Expense' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host { position: fixed; inset: 0; z-index: 10000; display: block; }
    .modal-backdrop {
      background: rgba(0,0,0,0.44);
      backdrop-filter: blur(8px);
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .modal {
      background: linear-gradient(180deg, #FFD7BA 0%, #FFF4E6 100%);
      border-radius: 2.8rem;
      width: 100%;
      max-width: 420px;
      padding: 3rem 2rem 2.5rem;
      box-shadow: 0 32px 80px rgba(0,0,0,0.28);
      overflow: hidden;
    }
    .modal-title {
      font-size: 5.2rem;
      font-weight: 900;
      letter-spacing: -0.09em;
      text-transform: lowercase;
      margin: 0 0 3.5rem;
      line-height: 0.9;
      text-align: center;
      color: #000;
    }
    .type-toggle {
      display: flex;
      background: rgba(0,0,0,0.09);
      border-radius: 1.6rem;
      padding: 0.4rem;
      margin: 0 auto 2.5rem;
      width: fit-content;
    }
    .toggle-btn {
      padding: 0.8rem 1.8rem;
      border: none;
      border-radius: 1.2rem;
      font-weight: 700;
      font-size: 1.05rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.3s ease;
      min-width: 110px;
    }
    .toggle-btn.expense { color: #ef4444; }
    .toggle-btn.income { color: #22c55e; }
    .toggle-btn.active { background: #000; color: #fff; }
    .input-group { position: relative; margin-bottom: 2rem; }
    .amount-input {
      width: 100%;
      padding: 1.4rem 1rem 1.4rem 3.2rem;
      font-size: 3.6rem;
      font-weight: 800;
      letter-spacing: -0.06em;
      background: transparent;
      border: 2px solid rgba(0,0,0,0.15);
      border-radius: 1.8rem;
      text-align: center;
      color: #000;
    }
    .amount-input:focus {
      outline: none;
      border-color: #000;
      box-shadow: 0 0 0 4px rgba(0,0,0,0.08);
    }
    .currency {
      position: absolute;
      left: 1.8rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2.4rem;
      font-weight: 800;
      opacity: 0.7;
      pointer-events: none;
    }
    .title-input, .date-input {
      width: 100%;
      padding: 1.4rem 1.6rem;
      font-size: 1.35rem;
      font-weight: 600;
      background: rgba(0,0,0,0.06);
      border: none;
      border-radius: 1.6rem;
      color: #000;
    }
    .title-input::placeholder, .date-input::placeholder { opacity: 0.6; }
    .title-input:focus, .date-input:focus { background: rgba(0,0,0,0.1); outline: none; }
    .actions { display: flex; gap: 1.2rem; margin-top: 2.5rem; }
    .btn-cancel, .btn-save {
      flex: 1;
      padding: 1.3rem;
      border-radius: 1.6rem;
      font-size: 1.15rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.3s ease;
    }
    .btn-cancel {
      background: transparent;
      border: 2px solid rgba(0,0,0,0.2);
      color: #000;
    }
    .btn-save {
      background: #000;
      color: #fff;
      border: none;
    }
    .btn-save:disabled { opacity: 0.4; cursor: not-allowed; }
    @media (max-width: 480px) {
      .modal-title { font-size: 4.4rem; }
      .amount-input { font-size: 3.2rem; }
    }
  `]
})
export class AddTransactionComponent {
  @Output() save = new EventEmitter<NewTransaction>();
  @Output() close = new EventEmitter<void>();

  form: NewTransaction = {
    title: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 16),
    type: 'expense'
  };

  get isValid(): boolean {
    return !!this.form.title.trim() && this.form.amount > 0;
  }

  saveTransaction() {
    if (!this.isValid) return;

    const transaction: NewTransaction = {
      ...this.form,
      amount: this.form.type === 'income' ? this.form.amount : -this.form.amount
    };

    this.save.emit(transaction);
    this.close.emit();
  }
}