import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementCardComponent } from './annoucement-card.component';

describe('AnnoucementCardComponent', () => {
  let component: AnnoucementCardComponent;
  let fixture: ComponentFixture<AnnoucementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnoucementCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnoucementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
