import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransacaoList } from './transacao-list';

describe('TransacaoList', () => {
  let component: TransacaoList;
  let fixture: ComponentFixture<TransacaoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoList],
    }).compileComponents();

    fixture = TestBed.createComponent(TransacaoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
