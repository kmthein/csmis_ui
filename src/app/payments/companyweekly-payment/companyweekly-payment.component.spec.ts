import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyweeklyPaymentComponent } from './companyweekly-payment.component';

describe('CompanyweeklyPaymentComponent', () => {
  let component: CompanyweeklyPaymentComponent;
  let fixture: ComponentFixture<CompanyweeklyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyweeklyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyweeklyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
