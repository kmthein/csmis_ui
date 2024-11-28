import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyPaymentComponent } from './yearly-payment.component';

describe('YearlyPaymentComponent', () => {
  let component: YearlyPaymentComponent;
  let fixture: ComponentFixture<YearlyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearlyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
