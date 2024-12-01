import { TestBed } from '@angular/core/testing';

import { FeedbackResponseService } from './feedback-response.service';

describe('FeedbackResponseService', () => {
  let service: FeedbackResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
