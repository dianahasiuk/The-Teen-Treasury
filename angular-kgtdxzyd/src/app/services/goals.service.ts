// src/app/services/goals.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Goal } from '../models/goal.interface';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private _goals = signal<Goal[]>([]);

  // Публічні сигнали
  goals$ = this._goals.asReadonly();
  totalSaved = computed(() => this._goals().reduce((sum, g) => sum + g.saved, 0));

  constructor() {
    this.loadFromStorage();
  }

  // Завантаження з localStorage
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('teen-budget-goals');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._goals.set(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load goals from storage');
    }

    // Якщо нічого немає — створюємо дефолтні (як на референсі)
    this.setDefaultGoals();
  }

  // Дефолтні цілі — точно як на твоєму скріншоті
  private setDefaultGoals(): void {
    this._goals.set([
      { id: '1', title: 'New Phone', target: 12000, saved: 4000 },
      { id: '2', title: 'Vacation', target: 35000, saved: 0 },
      { id: '3', title: 'Car', target: 100000, saved: 45000 }
    ]);
    this.saveToStorage();
  }

  // Збереження в localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem('teen-budget-goals', JSON.stringify(this._goals()));
    } catch (e) {
      console.warn('Failed to save goals to storage');
    }
  }

  // Додати нову ціль
  addGoal(title: string, target: number): void {
    if (!title?.trim() || target <= 0) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: title.trim(),
      target: Math.round(target),
      saved: 0
    };

    this._goals.update(goals => [...goals, newGoal]);
    this.saveToStorage();
  }

  // Оновити суму накопиченого (наприклад, з іншого екрану)
  updateSaved(goalId: string, newSaved: number): void {
    this._goals.update(goals =>
      goals.map(g => g.id === goalId ? { ...g, saved: Math.max(0, Math.round(newSaved)) } : g)
    );
    this.saveToStorage();
  }

  // Видалити ціль (на майбутнє)
  deleteGoal(goalId: string): void {
    this._goals.update(goals => goals.filter(g => g.id !== goalId));
    this.saveToStorage();
  }
}