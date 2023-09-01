// quiz.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../shared/interface/categories-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  categories: Category[] = [];

  constructor(private http: HttpClient) { }
  //criaçao das perguntas
  private questions = [
    {
      question: 'Qual é a capital da França?',
      options: ['Madrid', 'Paris', 'Londres', 'Roma'],
      answer: 'Paris'
    },
    {
      question: 'Qual é o meu nome?',
      options: ['Vini', 'Vinicius', 'Londres', 'Roma'],
      answer: 'Vinicius'
    },
    {
      question: 'Qual é o Sobre nome?',
      options: ['Vini', 'Vinicius', 'Politta', 'Roma'],
      answer: 'Politta'
    },
  ];

  private categoryAPI = environment.urlCategoryAPI;

  getCategory(): Observable<any> {
    return this.http.get<any>(this.categoryAPI);
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
