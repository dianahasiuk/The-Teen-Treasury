

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type AchievementCategory = 'saving' | 'discipline' | 'consistency' | 'milestone' | 'mastery';

export interface Achievement {
  /** Унікальний ідентифікатор */
  id: string;

  /** Назва досягнення (відображається великими літерами) */
  title: string;

  /** Короткий опис (підказка) */
  description: string;

  /** Емодзі або SVG-іконка (наприклад: 'Bank', 'Trophy', 'Target') */
  icon: string;

  /** Прогрес у відсотках: 0 = заблоковано, 1–99 = в процесі, 100 = отримано */
  progress: number;

  /** Рідкість — впливає на візуальний ефект (glow, border, анімація) */
  rarity: AchievementRarity;

  /** Категорія — для майбутньої фільтрації чи групування */
  category: AchievementCategory;

  /** Чи вже отримано (кеш для швидкого доступу) */
  readonly earned: boolean;

  /** Дата отримання (якщо earned === true) */
  earnedAt?: Date;

  /** Чи це секретне досягнення? (показувати тільки після отримання) */
  isSecret?: boolean;

  /** Опціональний тег для кастомних ефектів (наприклад, конфетті) */
  unlockEffect?: 'confetti' | 'fireworks' | 'glow-pulse' | 'none';
}

// Допоміжний тип для створення нового досягнення (без readonly полів)
export type CreateAchievement = Omit<Achievement, 'earned'> & {
  progress?: number;
};

// Фабрика для зручного створення (опціонально)
export const createAchievement = (
  data: Omit<Achievement, 'earned'>
): Achievement => ({
  ...data,
  progress: data.progress ?? 0,
  earned: data.progress === 100,
  earnedAt: data.progress === 100 ? new Date() : undefined,
});