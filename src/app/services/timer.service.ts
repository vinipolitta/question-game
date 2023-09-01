import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerInterval = 1000; // Intervalo em milissegundos (1 segundo)
  private timerValue = 0; // Valor do timer em segundos

  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.timerValue
  );

  private stopTimer$ = new Subject<void>();

  constructor() { }

  startTimer(): void {
    timer(0, this.timerInterval)
      .pipe(takeUntil(this.stopTimer$))
      .subscribe(() => {
        this.timerValue++;
        this.timerSubject.next(this.timerValue);
      });
  }

  pauseTimer(): void {
    this.stopTimer$.next();
  }

  resetTimer(): void {
    this.timerValue = 0;
    this.timerSubject.next(this.timerValue);
  }

  getTimerValue(): Observable<number> {
    return this.timerSubject.asObservable();
  }
}
