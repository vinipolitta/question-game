import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  score$!: Observable<number>;
  totalQuestions!: number;

  constructor(
    private router: Router,
    private stateService: StateService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    // Obtém a observável da pontuação do StateService
    this.score$ = this.stateService.score$;
    this.totalQuestions = this.quizService.getTotalQuestions();
  }

  // Reinicia o jogo
  restartGame() {
    this.stateService.resetState();
    this.router.navigate(['/home']);
  }
}
