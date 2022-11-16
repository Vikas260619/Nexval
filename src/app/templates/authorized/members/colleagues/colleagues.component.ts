import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
@Component({
  selector: 'app-colleagues',
  templateUrl: './colleagues.component.html',
  styleUrls: ['./colleagues.component.scss']
})
export class ColleaguesComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  openTeamCreateModal() {
    console.log('sssss');
   // this.eventEmitterService.memberInviteEventEmitter.emit(true);
  }
}
