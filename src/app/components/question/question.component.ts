import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: any;
  currentQuestionIndex: number = 0;
  answerForm: FormGroup;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {
    this.answerForm = this.formBuilder.group({
      answer: ''
    });
  }

  ngOnInit(): void {
    // Assina o Observable para atualizações no índice da pergunta atual
    this.stateService.currentQuestionIndex$.subscribe(index => {
      this.currentQuestionIndex = index;
      this.loadQuestion();
    });

    console.log(this.stateService.getPlayerName$().subscribe(jogador => console.log('AQUI', jogador)));

  }

  // Carrega a pergunta atual
  loadQuestion() {
    this.question = this.quizService.getQuestion(this.currentQuestionIndex);
    this.answerForm.patchValue({ answer: '' });
  }

  // Submete a resposta e atualiza a pontuação e o índice da pergunta
  submitAnswer() {
    const selectedAnswer = this.answerForm.get('answer')?.value;
    const correctAnswer = this.question.answer;

    if (this.quizService.checkAnswer(selectedAnswer, correctAnswer)) {
      this.stateService.increaseScore();
    }

    if (this.quizService.hasNextQuestion(this.currentQuestionIndex)) {
      this.stateService.setCurrentQuestionIndex(this.currentQuestionIndex + 1);
    } else {
      this.router.navigate(['/result']);
    }
  }
}
