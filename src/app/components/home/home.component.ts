import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoriesResponse, Category } from 'src/app/shared/interface/categories-response';

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

  constructor(
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private quizService: QuizService,
  ) {
    this.playerNameForm = this.formBuilder.group({
      playerName: [null, Validators.required],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.getCategory();


  }

  startGame() {
    console.log(this.playerNameForm.value);

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
      console.log(category.trivia_categories);
      this.categoryObj = category.trivia_categories

    })
  }


  insertName(active: boolean) {
    this.active = active;
  }
}
