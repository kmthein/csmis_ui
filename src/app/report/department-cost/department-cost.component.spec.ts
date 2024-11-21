import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCostComponent } from './department-cost.component';

describe('DepartmentCostComponent', () => {
  let component: DepartmentCostComponent;
  let fixture: ComponentFixture<DepartmentCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
