import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';
import { SignupOne } from 'src/app/interfaces/store.interface';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  fullName: string;
  constructor(private store: StoreService,private eventEmitterService:EventEmitterService) {}
  getSignupFormOneData(): SignupOne | null {
    let data: string | null = this.store.getSignupFormOneData();
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  ngOnInit(): void {
    setTimeout(() => this.openInvModal(), 300);
    let x: any = this.getSignupFormOneData();
    console.log(x.firstName);
    this.fullName = x.firstName + ' ' + x.lastName;
  }
  openInvModal() {
    this.eventEmitterService.InvEventEmitter.emit(true);
  }
}
