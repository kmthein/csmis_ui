import { TestBed } from '@angular/core/testing';

import { DoorAccessRecordService } from './door-access-record.service';

describe('DoorAccessRecordService', () => {
  let service: DoorAccessRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorAccessRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
