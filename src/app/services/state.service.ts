import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _currentQuestionIndex = new BehaviorSubject<number>(0);
  private _score = new BehaviorSubject<number>(0);

  // Observable para o índice da pergunta atual
  get currentQuestionIndex$(): Observable<number> {
    return this._currentQuestionIndex.asObservable();
  }

  // Observable para a pontuação atual
  get score$(): Observable<number> {
    return this._score.asObservable();
  }

  // Define o índice da pergunta atual
  setCurrentQuestionIndex(index: number) {
    this._currentQuestionIndex.next(index);
  }

  // Incrementa a pontuação
  increaseScore() {
    this._score.next(this._score.value + 1);
  }

  // Redefine o estado do serviço para começar um novo jogo
  resetState() {
    this._currentQuestionIndex.next(0);
    this._score.next(0);
  }
}
