import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { StateService } from 'src/app/services/state.service';
import { TimerService } from 'src/app/services/timer.service';
import { Category } from 'src/app/shared/interface/categories-response';
import { Howl, Howler } from 'howler';

const countdownSound = new Howl({
  src: ['../../../assets/sounds/countdown.wav'], // Substitua pelo caminho correto para o seu arquivo de áudio
});

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
  teste = false
  categoryType!: Category;
  timeElapsed: number = 0;
  timerValue = 0;
  timerSubscription: Subscription | undefined;
  routerSubscription: Subscription;
  timeLimitReached: boolean = false;
  showTimeoutModal = false; // Variável para controlar a exibição do modal
  totalQuestions: number = 0; // Inicialmente, define o número total de perguntas como 0
  namePlayer!: string;



  constructor(
    private router: Router,
    public quizService: QuizService,
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private timerService: TimerService,
    public modalService: NgbModal
  ) {
    this.answerForm = this.formBuilder.group({
      answer: ''
    });

    this.timerService.startTimer();
    this.timerSubscription = this.timerService.getTimerValue().subscribe((value) => {
      if (this.timerValue <= 10 && !countdownSound.playing()) {
        countdownSound.play(); // Inicia a reprodução da contagem regressiva
      } else {
        countdownSound.stop();
      }
      if (value <= 0) {
        // Quando o tempo se torna negativo, pausar o contador em "00:00"
        this.timerService.pauseTimer();
        this.timerValue = 0;
        // Exibir o botão para mostrar o modal de aviso
        this.showTimeoutModal = true;
      } else {
        this.timerValue = value;
      }

      if (this.timerValue <= 0 && !this.showResultsButton && !this.showTimeoutModal) {
        this.showTimeoutModal = true;
      }


    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url !== '/questions') {
        this.timerService.resetTimer();
      }
    });
  }

  ngOnInit(): void {
    // Assina o Observable para atualizações no índice da pergunta atual
    this.stateService.currentQuestionIndex$.subscribe(index => {
      this.currentQuestionIndex = index;
      this.loadQuestion();
    });
    this.loadQuestion();

    console.log(this.stateService.getPlayerName$().subscribe(player => this.namePlayer = player));
  }
  openModal(content: any) {
    const modalRef = this.modalService.open(content, { centered: true });

    // Adicione um evento de roteamento para fechar o modal quando navegar
    this.router.events.subscribe((event) => {
      if (modalRef && event instanceof NavigationStart) {
        modalRef.close(); // Fecha o modal quando a navegação começa
      }
    });
  }

  ngOnDestroy(): void {
    countdownSound.stop();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();

    }
  }

  pauseTimer(): void {
    this.timerService.pauseTimer();
  }

  startTimer() {
    this.timerService.startTimer();
  }

  // Carrega a pergunta atual
  loadQuestion() {
    this.stateService.getQuestions$().subscribe(res => {
      if (res && res.length > 0) {
        this.question = res[0];
        console.log(res);
        this.question = this.quizService.getQuestion(this.currentQuestionIndex);
        this.answerForm.patchValue({ answer: '' });
      }
    })
  }

  // Submete a resposta e atualiza a pontuação e o índice da pergunta
  submitAnswer() {
    if (this.showFeedback) {
      return; // Evitar respostas múltiplas
    }

    const selectedAnswer = this.answerForm.get('answer')?.value;
    const correctAnswer = this.question.answer;

    if (this.quizService.checkAnswer(selectedAnswer, correctAnswer)) {
      // Resposta correta: adicionar 20 segundos
      this.timerService.addTime(20);
      this.showFeedback = true;
      this.feedbackMessage = 'Resposta Correta!';
      this.feedbackClass = 'text-success';
      this.stateService.increaseScore();
    } else {
      // Resposta incorreta: subtrair 20 segundos
      this.timerService.addTime(-20);
      this.showFeedback = true;
      this.feedbackMessage = 'Resposta Incorreta!';
      this.feedbackClass = 'text-danger';
    }
    this.answerForm.disable(); // Desabilitar os botões de resposta após responder
  }

  nextQuestion() {
    this.showFeedback = false;
    this.answerForm.enable(); // Habilita os botões de rádio
    this.currentQuestionIndex++;
    if (this.timerValue <= 0) {
      // Bloquear botões e redirecionar para os resultados
      this.answerForm.disable();
      this.showResults();
    } else {
      this.loadQuestion();
    }

  }

  selectOption(option: string) {
    this.answerForm.patchValue({ answer: option });
  }


  showResults() {
    this.openModal(false);
    this.stateService.setTimerValue(this.timerValue);
    this.router.navigate(['/result']);
  }

  isOptionSelected() {
    return this.answerForm.get('answer')?.value === null;
  }

}
