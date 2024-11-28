import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorAccessRecordComponent } from './door-access-record.component';

describe('DoorAccessRecordComponent', () => {
  let component: DoorAccessRecordComponent;
  let fixture: ComponentFixture<DoorAccessRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoorAccessRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoorAccessRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
