import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchSummaryComponent } from './lunch-summary.component';

describe('LunchSummaryComponent', () => {
  let component: LunchSummaryComponent;
  let fixture: ComponentFixture<LunchSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LunchSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
