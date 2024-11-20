import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidMealComponent } from './avoid-meal.component';

describe('AvoidMealComponent', () => {
  let component: AvoidMealComponent;
  let fixture: ComponentFixture<AvoidMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvoidMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoidMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
