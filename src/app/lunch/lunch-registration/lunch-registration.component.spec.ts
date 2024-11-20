import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchRegistrationComponent } from './lunch-registration.component';

describe('LunchRegistrationComponent', () => {
  let component: LunchRegistrationComponent;
  let fixture: ComponentFixture<LunchRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
