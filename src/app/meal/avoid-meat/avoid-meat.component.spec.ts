import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidMeatComponent } from './avoid-meat.component';

describe('AvoidMeatComponent', () => {
  let component: AvoidMeatComponent;
  let fixture: ComponentFixture<AvoidMeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvoidMeatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvoidMeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
