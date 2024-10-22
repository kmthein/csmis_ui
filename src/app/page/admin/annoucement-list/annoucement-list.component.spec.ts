import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementListComponent } from './annoucement-list.component';

describe('AnnoucementListComponent', () => {
  let component: AnnoucementListComponent;
  let fixture: ComponentFixture<AnnoucementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnoucementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnoucementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
