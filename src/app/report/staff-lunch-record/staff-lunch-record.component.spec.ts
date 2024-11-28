import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLunchRecordComponent } from './staff-lunch-record.component';

describe('StaffLunchRecordComponent', () => {
  let component: StaffLunchRecordComponent;
  let fixture: ComponentFixture<StaffLunchRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffLunchRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffLunchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
