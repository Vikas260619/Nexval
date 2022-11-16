import { Component, OnInit,AfterViewInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit {
  constructor(private eventEmitter: EventEmitterService,private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
      });
      localStorage.setItem('page','home');
  }
  ngAfterViewInit(){
    
  }
  ngOnInit(): void {
   
    
    // localStorage.setItem('selectedTeam', event.target.id);
    //localStorage.removeItem('selectedTeam');
    //this.eventEmitter.emitBckCollab();
   // this.eventEmitter.homeEmitter.emit(true);
  }



  openGetLinkPopup(){
    this.eventEmitter.getLinkEventEmitter.emit(true);
  }
  openInvModal() {
    this.eventEmitter.InvEventEmitter2.emit(true);
  }
}
