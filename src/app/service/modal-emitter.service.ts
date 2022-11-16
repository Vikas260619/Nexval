import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEmitterService {
  memberInviteEventEmitter = new EventEmitter(true);
  constructor() { }

  emitMemberInviteEvent() {
    this.memberInviteEventEmitter.emit(true);
  }
}
