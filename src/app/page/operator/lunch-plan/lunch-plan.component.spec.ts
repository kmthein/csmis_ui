import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchPlanComponent } from './lunch-plan.component';

describe('LunchPlanComponent', () => {
  let component: LunchPlanComponent;
  let fixture: ComponentFixture<LunchPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LunchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
