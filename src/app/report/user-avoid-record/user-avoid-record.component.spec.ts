import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvoidRecordComponent } from './user-avoid-record.component';

describe('UserAvoidRecordComponent', () => {
  let component: UserAvoidRecordComponent;
  let fixture: ComponentFixture<UserAvoidRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAvoidRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAvoidRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
