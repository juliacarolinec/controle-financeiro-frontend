import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransacaoForm } from './transacao-form';

describe('TransacaoForm', () => {
  let component: TransacaoForm;
  let fixture: ComponentFixture<TransacaoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TransacaoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
