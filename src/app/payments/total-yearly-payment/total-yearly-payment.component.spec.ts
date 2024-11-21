import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalYearlyPaymentComponent } from './total-yearly-payment.component';

describe('TotalYearlyPaymentComponent', () => {
  let component: TotalYearlyPaymentComponent;
  let fixture: ComponentFixture<TotalYearlyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalYearlyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalYearlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
