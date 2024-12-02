import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVoucherComponent } from './custom-voucher.component';

describe('CustomVoucherComponent', () => {
  let component: CustomVoucherComponent;
  let fixture: ComponentFixture<CustomVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
