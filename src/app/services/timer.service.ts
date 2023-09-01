import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerInterval = 1000; // Intervalo em milissegundos (1 segundo)
  private timerValue = 60; // Inicia em 60 segundos (1 minuto)

  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.timerValue
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
        this.timerValue--;
        this.timerSubject.next(this.timerValue);
      });
  }

  pauseTimer(): void {
    this.stopTimer$.next();
  }

  resetTimer(): void {
    this.timerValue = 60; // Reinicia para 1 minuto (60 segundos)
    this.timerSubject.next(this.timerValue);
  }

  getTimerValue(): Observable<number> {
    return this.timerSubject.asObservable();
  }
}
