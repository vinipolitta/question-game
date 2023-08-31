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
  showFeedback: boolean = false;
  feedbackMessage: string = '';
  feedbackClass: string = '';
  showResultsButton!: boolean;

  constructor(
    private router: Router,
    public quizService: QuizService,
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
    this.loadQuestion();

    console.log(this.stateService.getPlayerName$().subscribe(jogador => console.log('AQUI', jogador)));
  }

  // Carrega a pergunta atual
  loadQuestion() {
    this.question = this.quizService.getQuestion(this.currentQuestionIndex);
    this.answerForm.patchValue({ answer: '' });
  }

  // Submete a resposta e atualiza a pontuação e o índice da pergunta
  submitAnswer() {
    if (this.showFeedback) {
      return; // Evita respostas múltiplas
    }

    const selectedAnswer = this.answerForm.get('answer')?.value;
    const correctAnswer = this.question.answer;

    if (this.quizService.checkAnswer(selectedAnswer, correctAnswer)) {
      this.showFeedback = true;
      this.feedbackMessage = 'Resposta Correta!';
      this.feedbackClass = 'text-success';
      this.stateService.increaseScore();
    } else {
      this.showFeedback = true;
      this.feedbackMessage = 'Resposta Incorreta!';
      this.feedbackClass = 'text-danger';
    }

    this.answerForm.disable(); // Desabilita os botões de rádio após responder


  }

  nextQuestion() {
    this.showFeedback = false;
    this.answerForm.enable(); // Habilita os botões de rádio
    this.currentQuestionIndex++;
    this.loadQuestion();


  }
  selectOption(option: string) {
    this.answerForm.patchValue({ answer: option });
  }


  showResults() {
    this.router.navigate(['/result']);
  }
}
