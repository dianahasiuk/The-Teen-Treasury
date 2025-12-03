
// src/app/components/goals/goals.component.ts
import { Component } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { GoalsService } from '../../services/goals.service';
import { Goal } from '../../models/goal.interface';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [DecimalPipe, NgFor, NgIf],
  template: `
    <div class="goals-page">
      <div class="saved-header">
        <p class="saved-label">Currently saved</p>
        <p class="saved-amount">₴{{ totalSaved() | number:'1.0-0' }}</p>
      </div>

      <h1 class="goals-title">goals</h1>

      <div class="goals-list">
        <div *ngFor="let goal of goals()" class="goal-item">
          <div class="goal-header">
            <h3 class="goal-title">{{ goal.title }}</h3>
           
            <span 
              *ngIf="progress(goal) > 0 && progress(goal) < 100" 
              class="goal-percent"
            >
              {{ progress(goal) }}%
            </span>
          </div>

          <div class="progress-container">
            <div 
              class="progress-fill" 
              [style.width.%]="progress(goal)"
            ></div>
          </div>

          <p class="goal-target">₴{{ goal.target | number:'1.0-0' }}</p>
        </div>
      </div>

      <button class="fab-button" (click)="addNewGoal()" aria-label="Add new goal">
        <span>+</span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100dvh;
      background: linear-gradient(180deg, #FFD7BA 0%, #FFF2E0 60%, #FFF8F0 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .goals-page {
      padding: 2.8rem 1.6rem 11rem;
      max-width: 520px;
      margin: 0 auto;
      color: #000;
    }

    .saved-header {
      margin-top: 2.8rem;
      text-align: left;
    }

    .saved-label {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      opacity: 0.9;
      margin-bottom: 0.3rem;
    }

    .saved-amount {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.07em;
      margin: 0;
      line-height: 1;
    }

    .goals-title {
      font-size: 8rem;
      font-weight: 900;
      letter-spacing: -0.1em;
      text-transform: lowercase;
      margin: 4.2rem 0 5.5rem;
      line-height: 0.88;
      text-align: left;
    }

    .goals-list {
      display: flex;
      flex-direction: column;
      gap: 5rem;
    }

    .goal-item {
      padding-bottom: 0.5rem;
    }

    .goal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 1.1rem;
      gap: 1rem;
    }

    .goal-title {
      font-size: 3.1rem;
      font-weight: 850;
      margin: 0;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .goal-percent {
      font-size: 1.32rem;
      font-weight: 600;
      opacity: 0.8;
      margin-bottom: 0.2rem;
      min-width: 60px;
      text-align: right;
    }

    .progress-container {
      height: 7px;
      background: rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 1rem;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: #000;
      border-radius: 4px;
      transition: width 1.1s cubic-bezier(0.32, 0, 0.08, 1);
      position: relative;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }

    .goal-target {
      font-size: 1.18rem;
      font-weight: 500;
      opacity: 0.82;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .fab-button {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      width: 78px;
      height: 78px;
      background: #000;
      color: #fff;
      border: none;
      border-radius: 50%;
      font-size: 50px;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 18px 44px rgba(0, 0, 0, 0.32);
      cursor: pointer;
      z-index: 1000;
      transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fab-button span {
      margin-top: -7px;
    }

    .fab-button:active {
      transform: translateX(-50%) scale(0.9);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 480px) {
      .goals-title {
        font-size: 6.6rem;
        margin: 3.2rem 0 4.5rem;
      }
      .goal-title {
        font-size: 2.7rem;
      }
      .saved-amount {
        font-size: 2.2rem;
      }
      .fab-button {
        width: 72px;
        height: 72px;
        font-size: 46px;
      }
    }
  `]
})
export class GoalsComponent {
  goals = this.goalsService.goals$;
  totalSaved = this.goalsService.totalSaved;

  constructor(private goalsService: GoalsService) {}

  progress(goal: Goal): number {
    const percent = (goal.saved / goal.target) * 100;
    return Math.min(100, Math.round(percent));
  }

  addNewGoal(): void {
    const title = prompt('Назва цілі:');
    const targetStr = prompt('Цільова сума (₴):');
    if (title && targetStr) {
      const target = parseFloat(targetStr.replace(/\s/g, ''));
      if (!isNaN(target) && target > 0) {
        this.goalsService.addGoal(title.trim(), target);
      }
    }
  }
}