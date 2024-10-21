import { TestBed } from '@angular/core/testing';

import { AnnoucementService } from './annoucement.service';

describe('AnnoucementService', () => {
  let service: AnnoucementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoucementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
