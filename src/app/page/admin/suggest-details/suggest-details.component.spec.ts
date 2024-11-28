import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestDetailsComponent } from './suggest-details.component';

describe('SuggestDetailsComponent', () => {
  let component: SuggestDetailsComponent;
  let fixture: ComponentFixture<SuggestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
