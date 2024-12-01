import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackResponseCreateComponent } from './feedback-response-create.component';

describe('FeedbackResponseCreateComponent', () => {
  let component: FeedbackResponseCreateComponent;
  let fixture: ComponentFixture<FeedbackResponseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackResponseCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackResponseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
