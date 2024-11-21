import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMonthlyPaymentComponent } from './company-monthly-payment.component';

describe('CompanyMonthlyPaymentComponent', () => {
  let component: CompanyMonthlyPaymentComponent;
  let fixture: ComponentFixture<CompanyMonthlyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMonthlyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMonthlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
