import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchSummaryPieComponent } from './lunch-summary-pie.component';

describe('LunchSummaryPieComponent', () => {
  let component: LunchSummaryPieComponent;
  let fixture: ComponentFixture<LunchSummaryPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchSummaryPieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LunchSummaryPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
