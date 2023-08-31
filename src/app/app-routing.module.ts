import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'result', component: ResultComponent },
  // Redirecionar para a tela inicial quando a URL não corresponder a nenhuma rota
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Redirecionar para a tela inicial quando a URL não corresponder a nenhuma rota
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
