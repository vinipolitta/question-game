import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _currentQuestionIndex = new BehaviorSubject<number>(0);
  private _score = new BehaviorSubject<number>(0);
  private _playerName = new BehaviorSubject<string>(''); // Adicione o BehaviorSubject para o nome do jogador
  private _questions = new BehaviorSubject<any[]>([]); // Adicione um BehaviorSubject para as questões do quiz
  private _timerValue = new BehaviorSubject<number>(0); // Adicione um BehaviorSubject para o valor do timer


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

  // Define o nome do jogador
  setPlayerName(playerName: string) {
    this._playerName.next(playerName);
  }

  // Obtém o nome do jogador como um Observable
  getPlayerName$(): Observable<string> {
    return this._playerName.asObservable();
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

  setQuestions(questions: any[]) {
    this._questions.next(questions);
  }

  // Obtém as questões do quiz como um Observable
  getQuestions$(): Observable<any[]> {
    return this._questions.asObservable();
  }

  // Define o valor do timer
  setTimerValue(value: number) {
    this._timerValue.next(value);
  }

  // Obtém o valor do timer como um Observable
  getTimerValue$(): Observable<number> {
    return this._timerValue.asObservable();
  }
}
