import { TestBed } from '@angular/core/testing';

import { RegionRadiumService } from './region-radium.service';

describe('RegionRadiumService', () => {
  let service: RegionRadiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionRadiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
