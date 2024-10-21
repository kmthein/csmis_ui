import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLunchComponent } from './admin-lunch.component';

describe('AdminLunchComponent', () => {
  let component: AdminLunchComponent;
  let fixture: ComponentFixture<AdminLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLunchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
