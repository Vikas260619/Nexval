import { TestBed } from '@angular/core/testing';

import { ComingsoonService } from './comingsoon.service';

describe('ComingsoonService', () => {
  let service: ComingsoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComingsoonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
