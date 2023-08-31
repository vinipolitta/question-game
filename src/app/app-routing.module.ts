import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' } // Redirecionamento para a página inicial em caso de rota inválida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
