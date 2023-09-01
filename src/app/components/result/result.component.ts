import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [ // Importante adicionar isso
    trigger('fadeIn', [
      transition(':enter', [
        // Usar a classe 'animate__animated' da Animate.css
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
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
    this.stateService.getTimerValue$().subscribe(time => {
      console.log('vindo do question o time', time);

    })
  }

  // Reinicia o jogo
  restartGame() {
    this.stateService.resetState();
    this.router.navigate(['/home']);
  }
}
