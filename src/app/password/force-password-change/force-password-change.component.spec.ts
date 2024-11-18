import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcePasswordChangeComponent } from './force-password-change.component';

describe('ForcePasswordChangeComponent', () => {
  let component: ForcePasswordChangeComponent;
  let fixture: ComponentFixture<ForcePasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForcePasswordChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForcePasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
