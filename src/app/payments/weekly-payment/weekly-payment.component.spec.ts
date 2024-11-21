import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPaymentComponent } from './weekly-payment.component';

describe('WeeklyPaymentComponent', () => {
  let component: WeeklyPaymentComponent;
  let fixture: ComponentFixture<WeeklyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
