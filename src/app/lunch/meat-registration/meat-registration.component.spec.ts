import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatRegistrationComponent } from './meat-registration.component';

describe('MeatRegistrationComponent', () => {
  let component: MeatRegistrationComponent;
  let fixture: ComponentFixture<MeatRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeatRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeatRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
