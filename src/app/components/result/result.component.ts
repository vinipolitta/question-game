import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  score: number = 0;
  totalQuestions!: number;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.score = this.quizService.getScore();
    this.totalQuestions = this.quizService.getTotalQuestions();
  }
}
