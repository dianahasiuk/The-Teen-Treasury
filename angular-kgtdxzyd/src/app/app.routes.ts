// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'achievements', component: AchievementsComponent },

  // МАЄ БУТИ ОСТАННІМ
  { path: '**', redirectTo: '' }
];