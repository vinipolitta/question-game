import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public title: string = 'Bem-vindo ao Quiz';
  public subTitle: string = 'Teste seus conhecimentos e divirta-se!';

  constructor(private router: Router) { }

  startQuiz() {
    this.router.navigate(['/question']);
  }
}
