import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatActionRendererComponent } from './meat-action-renderer.component';

describe('MeatActionRendererComponent', () => {
  let component: MeatActionRendererComponent;
  let fixture: ComponentFixture<MeatActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeatActionRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeatActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
