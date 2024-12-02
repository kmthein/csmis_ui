import { TestBed } from '@angular/core/testing';

import { CompanyCostService } from './company-cost.service';

describe('CompanyCostService', () => {
  let service: CompanyCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
