import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyYearlyPaymentComponent } from './company-yearly-payment.component';

describe('CompanyYearlyPaymentComponent', () => {
  let component: CompanyYearlyPaymentComponent;
  let fixture: ComponentFixture<CompanyYearlyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyYearlyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyYearlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
