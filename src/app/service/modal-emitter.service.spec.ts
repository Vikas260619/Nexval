import { TestBed } from '@angular/core/testing';

import { ModalEmitterService } from './modal-emitter.service';

describe('ModalEmitterService', () => {
  let service: ModalEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
