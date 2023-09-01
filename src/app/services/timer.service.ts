// timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerInterval = 1000; // Intervalo em milissegundos (1 segundo)
  private baseTime = 60; // Tempo base para cada questionamento (60 segundos)
  private accumulatedTime = this.baseTime; // Tempo acumulado para o próximo questionamento

  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.accumulatedTime
  );

  private stopTimer$ = new Subject<void>();

  constructor() { }

  startTimer(): void {
    timer(0, this.timerInterval)
      .pipe(
        takeUntil(this.stopTimer$),
        takeUntil(this.timerSubject.pipe(filter(value => value === 0))) // Pare quando chegar a 0
      )
      .subscribe(() => {
        this.accumulatedTime--;
        this.timerSubject.next(this.accumulatedTime);
      });
  }

  pauseTimer(): void {
    this.stopTimer$.next();
  }

  resetTimer(): void {
    this.accumulatedTime = this.baseTime; // Reinicia para o tempo base
    this.timerSubject.next(this.accumulatedTime);
  }

  getTimerValue(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  addTime(seconds: number): void {
    this.accumulatedTime += seconds;
    this.timerSubject.next(this.accumulatedTime);
  }
}
