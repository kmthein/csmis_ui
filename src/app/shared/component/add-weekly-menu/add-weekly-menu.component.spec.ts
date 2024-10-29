import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeeklyMenuComponent } from './add-weekly-menu.component';

describe('AddWeeklyMenuComponent', () => {
  let component: AddWeeklyMenuComponent;
  let fixture: ComponentFixture<AddWeeklyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWeeklyMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
