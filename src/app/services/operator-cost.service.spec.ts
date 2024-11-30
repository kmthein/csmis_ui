import { TestBed } from '@angular/core/testing';

import { OperatorCostService } from './operator-cost.service';

describe('OperatorCostService', () => {
  let service: OperatorCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
