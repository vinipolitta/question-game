import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HomeComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a title', () => {
    expect(component.title).toBe('Bem-vindo ao Quiz');
  });

  it('should render title in a h1 tag', () => {
    expect(component.subTitle).toBe('Teste seus conhecimentos e divirta-se!');
  });


  it('should navigate to /question when startQuiz() is called', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.startQuiz();

    expect(spy).toHaveBeenCalledWith(['/question']);
  });

});
