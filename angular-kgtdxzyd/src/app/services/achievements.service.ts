// src/app/services/achievement.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Achievement, createAchievement } from '../models/achievement.model';

const STORAGE_KEY = 'jar_achievements_v1';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  // Всі досягнення (сигнал — реактивний)
  private achievements = signal<Achievement[]>([]);

  // Публічний реактивний масив
  all$ = this.achievements.asReadonly();

  // Кількість отриманих
  earnedCount = computed(() => 
    this.achievements().filter(a => a.earned).length
  );

  // Загальний прогрес у відсотках
  overallProgress = computed(() => {
    const total = this.achievements().length;
    if (total === 0) return 0;
    return Math.round(
      (this.achievements().reduce((sum, a) => sum + a.progress, 0) / total)
    );
  });

  constructor() {
    this.loadFromStorage();
    this.autoSave();
  }

  // Ініціалізація базових досягнень (якщо їх ще немає)
  initializeDefaultAchievements() {
    const defaults: Omit<Achievement, 'earned' | 'earnedAt'>[] = [
      {
        id: 'first-deposit',
        title: 'First Deposit',
        description: 'Add money to a jar',
        icon: 'Bank',
        progress: 0,
        rarity: 'common',
        category: 'milestone',
      },
      {
        id: 'five-goals',
        title: '5 Goals Completed',
        description: 'Achieve five goals',
        icon: 'Sparkles',
        progress: 0,
        rarity: 'common',
        category: 'milestone',
      },
      {
        id: 'ghost-week',
        title: 'Ghost Mode',
        description: 'No spending for 7 days',
        icon: 'Ghost',
        progress: 0,
        rarity: 'rare',
        category: 'discipline',
      },
      {
        id: 'the-final-jar',
        title: 'The Final Jar',
        description: 'Reach the ultimate goal',
        icon: 'Trophy',
        progress: 0,
        rarity: 'legendary',
        category: 'mastery',
        isSecret: true,
        unlockEffect: 'fireworks',
      },
      {
        id: 'early-bird',
        title: 'Early Bird',
        description: 'Save before 8 AM',
        icon: 'Sunrise',
        progress: 0,
        rarity: 'common',
        category: 'consistency',
      },
      {
        id: 'untouchable',
        title: 'Untouchable',
        description: 'Fill 10 jars',
        icon: 'Diamond',
        progress: 0,
        rarity: 'epic',
        category: 'mastery',
        unlockEffect: 'confetti',
      }
    ];

    const current = this.achievements();
    if (current.length === 0) {
      const created = defaults.map(createAchievement);
      this.achievements.set(created);
      this.saveToStorage();
    }
  }

  // Оновлення прогресу досягнення
  updateProgress(id: string, progress: number): Achievement | null {
    const clamped = Math.max(0, Math.min(100, Math.round(progress)));

    this.achievements.update(achievements => 
      achievements.map(ach => {
        if (ach.id !== id) return ach;

        const wasEarned = ach.earned;
        const isNowEarned = clamped === 100;
        const earnedAt = isNowEarned && !wasEarned ? new Date() : ach.earnedAt;

        return {
          ...ach,
          progress: clamped,
          earned: isNowEarned,
          earnedAt
        };
      })
    );

    const updated = this.achievements().find(a => a.id === id);
    
    // Повертаємо, якщо щойно розблоковано — для конфетті/анімації
    if (updated?.earned && updated.progress === 100) {
      const wasEarnedBefore = this.getPreviousState(id)?.earned;
      if (!wasEarnedBefore) {
        return updated; // ← це досягнення щойно розблоковано!
      }
    }

    return null;
  }

  // Отримати одне досягнення
  getById(id: string) {
    return this.achievements().find(a => a.id === id) || null;
  }

  // Приватні методи
  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Achievement[] = JSON.parse(raw);
        // Перетворюємо дати назад у Date об'єкти
        const revived = parsed.map(a => ({
          ...a,
          earnedAt: a.earnedAt ? new Date(a.earnedAt) : undefined
        }));
        this.achievements.set(revived);
      }
    } catch (e) {
      console.warn('Failed to load achievements from localStorage', e);
      this.achievements.set([]);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.achievements()));
    } catch (e) {
      console.warn('Failed to save achievements to localStorage', e);
    }
  }

  // Автозбереження при кожній зміні
  private autoSave() {
    effect(() => {
      this.achievements(); // підписуємось на зміни
      this.saveToStorage();
    });
  }

  // Допоміжний метод для анімацій (отримати стан до оновлення)
  private getPreviousState(id: string) {
    // Проста реалізація — можна розширити через history
    return this.achievements().find(a => a.id === id);
  }

  // Скинути все (для деву)
  resetAll() {
    this.achievements.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }
}