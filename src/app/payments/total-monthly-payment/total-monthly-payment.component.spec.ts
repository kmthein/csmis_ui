import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMonthlyPaymentComponent } from './total-monthly-payment.component';

describe('TotalMonthlyPaymentComponent', () => {
  let component: TotalMonthlyPaymentComponent;
  let fixture: ComponentFixture<TotalMonthlyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalMonthlyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalMonthlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
