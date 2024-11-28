import { TestBed } from '@angular/core/testing';

import { LunchRegistrationService } from './lunch-registration.service';

describe('LunchRegistrationService', () => {
  let service: LunchRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LunchRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
