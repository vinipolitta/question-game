import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoriesResponse, Category, payloadQuestions } from 'src/app/shared/interface/categories-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public title: string = 'Bem-vindo ao Quiz';
  public subTitle: string = 'Teste seus conhecimentos e divirta-se!';
  public active: boolean = false;

  playerNameForm: FormGroup;
  categoryObj: Category[] = [];

  dificultObj = ['easy', 'medium', 'hard']
  questions: any[] = [];

  constructor(
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private quizService: QuizService,
  ) {
    this.playerNameForm = this.formBuilder.group({
      playerName: ['vini', Validators.required],
      quantQuestions: [5],
      category: [20],
      dificult: ['easy']
    });
  }

  ngOnInit(): void {
    this.getCategory();


  }

  getQuestionsForParameters() {
    const payload = {
      quant: this.playerNameForm.value.quantQuestions,
      category: this.playerNameForm.value.category,
      dificult: this.playerNameForm.value.dificult
    }

    this.quizService.getQuestionsFromAPI(payload).subscribe(res => {
      this.questions = res.results.map((item: any) => {
        return {
          question: item.question,
          options: [...item.incorrect_answers, item.correct_answer],
          answer: item.correct_answer
        };
      });

      this.quizService.setQuestionsFromAPI(this.questions);
      this.stateService.setQuestions(this.questions);
    })
  }

  startGame() {
    this.getQuestionsForParameters()

    const playerName = this.playerNameForm?.get('playerName')?.value;
    if (playerName) {
      // Set the player name in the state service
      this.stateService.setPlayerName(playerName);
      // Navigate to the question component
      this.router.navigate(['/question']);
    }
  }

  getCategory() {
    this.quizService.getCategory().subscribe((category: CategoriesResponse) => {
      this.categoryObj = category.trivia_categories

    })
  }

  insertName(active: boolean) {
    this.active = active;
  }
}
