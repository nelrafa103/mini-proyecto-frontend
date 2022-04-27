import { TestBed } from '@angular/core/testing';

import { BuySectionService } from './buy-section.service';

describe('BuySectionService', () => {
  let service: BuySectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuySectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
