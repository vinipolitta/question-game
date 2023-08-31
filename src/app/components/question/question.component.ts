import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: any;
  currentQuestionIndex: number = 0;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion() {
    this.question = this.quizService.getQuestion();
  }

  selectAnswer(selectedOption: string) {
    this.quizService.checkAnswer(selectedOption);
    if (this.quizService.hasNextQuestion()) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      // Navegue para a tela de resultados
      Exemplo: this.router.navigate(['/result']);
    }
  }
}
