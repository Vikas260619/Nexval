import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComingsoonService {
  ee: EventEmitter<number> = new EventEmitter<number>();
  counter = 0;
  constructor() {
    setInterval(_ => {
      this.ee.emit(this.counter++);
    }, 1000);
   }
}
