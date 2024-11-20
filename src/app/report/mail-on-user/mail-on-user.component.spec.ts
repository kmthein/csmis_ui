import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailOnUserComponent } from './mail-on-user.component';

describe('MailOnUserComponent', () => {
  let component: MailOnUserComponent;
  let fixture: ComponentFixture<MailOnUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailOnUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailOnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
