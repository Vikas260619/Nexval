import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { FormatTimestampDatePipe } from 'src/app/pipes/format-timestamp-date.pipe';
import { MinuteToHourPipe } from 'src/app/pipes/minute-to-hour.pipe';

@Component({
  selector: 'app-attendence-internal',
  templateUrl: './attendence-internal.component.html',
  styleUrls: ['./attendence-internal.component.scss'],
  providers:[FormatTimestampTimePipe,FormatTimestampDatePipe,MinuteToHourPipe],
})
export class AttendenceInternalComponent implements OnInit {
  selectedDate:any;
  internalData:any;
  status:any;
  duration:any;
  st:string='';
  constructor(private router: Router,private eventEmitter:EventEmitterService) { }

  ngOnInit(): void {
  
   this.selectedDate= localStorage.getItem('current-report-card-date');
   this.status=localStorage.getItem('current-card-attn-status');
   this.duration= localStorage.getItem('current-card-work-duration');
   this.internalData= localStorage.getItem(this.selectedDate+'-interim');
   this.internalData=JSON.parse(this.internalData);
   console.log(this.internalData);
  }
  goMain(){
    this.router.navigate(['./dashboard/attendence-report']);
  }
  openSingleMapModal(event){
    localStorage.setItem('punchInLatLong',event);
    this.eventEmitter.singleMapModalEventEmitter.emit(true);
  }
  get sortData() {
    return this.internalData.sort((a, b) => {
      return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
    });
  }
}
