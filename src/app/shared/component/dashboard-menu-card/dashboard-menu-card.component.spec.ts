import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuCardComponent } from './dashboard-menu-card.component';

describe('DashboardMenuCardComponent', () => {
  let component: DashboardMenuCardComponent;
  let fixture: ComponentFixture<DashboardMenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMenuCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
