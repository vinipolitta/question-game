// quiz.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
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
    // Mais perguntas...
  ];

  private currentQuestionIndex = 0;
  private score = 0;

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(selectedAnswer: string) {
    const correctAnswer = this.questions[this.currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  getScore() {
    return this.score;
  }

  hasNextQuestion() {
    return this.currentQuestionIndex < this.questions.length;
  }

  getTotalQuestions() {
    return this.questions.length;
  }
}
