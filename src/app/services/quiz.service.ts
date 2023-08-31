// quiz.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

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
