// quiz.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, payloadQuestions } from '../shared/interface/categories-response';
import { StateService } from 'src/app/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  categories: Category[] = [];

  constructor(private http: HttpClient, private stateService: StateService) { }
  //criaçao das perguntas
  questions: any[] = [];


  private categoryAPI = environment.urlCategoryAPI;
  private questionFromTypes = environment.urlSendQuestionsFromCategory;
  private teste = environment.teste

  getQuestionsFromAPI(payload: payloadQuestions): Observable<any> {
    return this.http.get(`${this.teste}amount=${payload.quant}&category=${payload.category}&difficulty=${payload.dificult}&type=multiple`);
  }


  getQuestionsFromCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.questionFromTypes}${categoryId}`)
  }

  //Obtem uma lista de categoria para ser chamada as questoes
  getCategory(): Observable<any> {
    return this.http.get<any>(this.categoryAPI);
  }

  setQuestionsFromAPI(results: any[]) {
    if (results) {
      this.questions = results
    }
  }

  // Obtém uma pergunta com base no índice fornecido
  getQuestion(index: number) {
    return this.questions[index];
  }

  // Verifica se a resposta selecionada é correta
  checkAnswer(selectedAnswer: string, correctAnswer: string): boolean {
    return selectedAnswer === correctAnswer;
  }

  // Verifica se há mais perguntas a serem respondidas
  hasNextQuestion(currentIndex: number): boolean {
    return currentIndex < this.questions.length - 1;
  }

  // Obtém o número total de perguntas no quiz
  getTotalQuestions() {
    return this.questions.length;
  }
}
