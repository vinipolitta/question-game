import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

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

  constructor(
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {
    this.playerNameForm = this.formBuilder.group({
      playerName: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  startGame() {
    const playerName = this.playerNameForm?.get('playerName')?.value;
    if (playerName) {
      // Set the player name in the state service
      this.stateService.setPlayerName(playerName);
      // Navigate to the question component
      this.router.navigate(['/question']);
    }
  }



  insertName(active: boolean) {
    this.active = active;
  }
}
