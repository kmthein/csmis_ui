import { TestBed } from '@angular/core/testing';

import { MeatService } from './meat.service';

describe('MeatService', () => {
  let service: MeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
