import { TestBed } from '@angular/core/testing';

import { CommonLogicsService } from './common-logics.service';

describe('CommonLogicsService', () => {
  let service: CommonLogicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonLogicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
