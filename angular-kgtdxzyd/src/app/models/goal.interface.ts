// src/app/models/goal.interface.ts
export interface Goal {
  id: string;
  title: string;
  target: number;
  saved: number;
  createdAt?: number;
  completedAt?: number;
}