import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalWeeklyPaymentComponent } from './total-weekly-payment.component';

describe('TotalWeeklyPaymentComponent', () => {
  let component: TotalWeeklyPaymentComponent;
  let fixture: ComponentFixture<TotalWeeklyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalWeeklyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalWeeklyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
