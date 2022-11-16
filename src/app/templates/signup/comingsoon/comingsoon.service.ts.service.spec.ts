import { TestBed } from '@angular/core/testing';

import { Comingsoon.Service.TsService } from './comingsoon.service.ts.service';

describe('Comingsoon.Service.TsService', () => {
  let service: Comingsoon.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comingsoon.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
