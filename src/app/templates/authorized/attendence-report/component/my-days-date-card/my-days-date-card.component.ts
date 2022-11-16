import { Component, OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { FormatLatPipe } from 'src/app/pipes/format-lat.pipe';
import { FormatLongPipe } from 'src/app/pipes/format-long.pipe';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';
import { FormatTimestampDatePipe } from 'src/app/pipes/format-timestamp-date.pipe';
import { FormatonlyDatePipe } from 'src/app/pipes/formatonly-date.pipe';
import { MinuteToHourPipe } from 'src/app/pipes/minute-to-hour.pipe';

@Component({
  selector: 'app-my-days-date-card',
  templateUrl: './my-days-date-card.component.html',
  styleUrls: ['./my-days-date-card.component.scss'],
  providers: [FormatTimestampPipe, FormatLatPipe, FormatLongPipe,FormatTimestampTimePipe,FormatTimestampDatePipe,FormatonlyDatePipe,MinuteToHourPipe],
})
export class MyDaysDateCardComponent implements OnInit {
  @Input() dt:any;
  @Input() punch_in:any;
  @Input() punch_out:any;
  @Input() attStatus:string;
  @Input() work_duration:number;
  @Input() internal_card_details:any;
  @Input() punch_in_latlng:number;
  @Input() punch_out_latlng:number;
  @Input() punch_in_address:any;
  @Input() punch_out_address:any;
  date:any;
  attendenceStatus:string;
  punchIn:any;
  punchOut:any;
  attnStatus:string='';
  workDuration:number;
  internalCardDetails:any;
  punchInLatLong:number;
  punchOutLatLong:number;
  punchInAddress:any='';
  punchOutAddress:any='';
  constructor(private eventEmitter:EventEmitterService,private router: Router) { }
  
  ngOnInit(): void {
    this.date=this.dt;
    this.attendenceStatus=this.attStatus;
    console.log("@@@@@@@@@@@@@@@@@@@@@",this.punch_in);
    if(this.punch_in!=null){
      this.punchIn=this.punch_in;
      this.attStatus='Present';
    }
    else if(this.punch_in==null){
      console.log("!!!!!!!!!!!!!!!",this.punch_in);
      if(this.punch_in===undefined){
        this.attStatus='N/A';
        console.log("!!!!!!!!!!!!!!!",this.punch_in);
        this.punchIn="0001-01-01T00:00:00";
      }else{
      this.attStatus='Absent';
      this.punchIn="0001-01-01T00:00:00";
      }
    }else if(this.punch_in===undefined){
      this.attStatus='N/A';
      console.log("!!!!!!!!!!!!!!!",this.punch_in);
      this.punchIn="0001-01-01T00:00:00";
    }

    if(this.punch_out!=null){
      this.punchOut=this.punch_out;
    }else{
      this.punchOut="0001-01-01T00:00:00";
    }

    if(this.work_duration!=null){
      this.workDuration=this.work_duration;
    }else{
      this.workDuration=0;
    }

    if(this.internal_card_details!=null){
      this.internalCardDetails=this.internal_card_details;
      localStorage.setItem(this.dt+'-interim',JSON.stringify(this.internalCardDetails))
    }
      
    if(this.punch_in_latlng!=null)
    {
    this.punchInLatLong=this.punch_in_latlng;
    }else{
      this.punchInLatLong=0;
    }
      
    if(this.punch_in_latlng!=null)
    {
    this.punchOutLatLong=this.punch_out_latlng;
    }else{
      this.punchOutLatLong=0;
    }
    this.punchInAddress=this.punch_in_address;
    this.punchOutAddress=this.punch_out_address;
    //console.log("+++++++++++++"+this.punch_in_address);
  }
  goInternal(date,status,duration){
    console.log(date);
   // localStorage.setItem('current-report-card-details',val);
   if(this.attStatus!='N/A'){
   localStorage.setItem('current-report-card-date',date);
   localStorage.setItem('current-card-attn-status',status);
   localStorage.setItem('current-card-work-duration',duration);
    this.router.navigate(['./dashboard/attendence-internal']);
   }
  }
  openUserAttendenceModal(event) {
    // localStorage.setItem('current_clicked_user_name', event.target.nm);
    // localStorage.setItem('current_clicked_user_lname', event.target.nm2);
    // localStorage.setItem('current_clicked_punch_type', event.target.punch_type);
    // localStorage.setItem(
    //   'current_clicked_checkin_lat',
    //   event.target.checkin_lat
    // );
    // localStorage.setItem(
    //   'current_clicked_checkin_long',
    //   event.target.checkin_long
    // );
    // localStorage.setItem(
    //   'current_clicked_checkout_lat',
    //   event.target.checkout_lat
    // );
    // localStorage.setItem(
    //   'current_clicked_checkout_long',
    //   event.target.checkout_long
    // );
    // localStorage.setItem(
    //   'current_clicked_checkin_address',
    //   event.target.checkin_address
    // );
    // localStorage.setItem(
    //   'current_clicked_checkout_address',
    //   event.target.checkout_address
    // );
    // localStorage.setItem(
    //   'current_clicked_latest_check_in',
    //   event.target.latest_checkin
    // );
    // localStorage.setItem(
    //   'current_clicked_latest_check_out',
    //   event.target.latest_checkout
    // );
    // localStorage.setItem(
    //   'current_clicked_user_image',
    //   event.target.user_image
    // );

    this.eventEmitter.userAttendenceModalEventEmitter.emit(true);
  }

  openSingleMapModal(e,event,st){
    if (e.stopPropagation) e.stopPropagation();
    localStorage.setItem('punchInLatLong',event);
    console.log(st);
    localStorage.setItem('punchAddress',st);
    this.eventEmitter.singleMapModalEventEmitter.emit(true);
  }

  myClickHandler(e:any)
  {
      console.log(e);
    // Here you'll do whatever you want to happen when they click

      // now this part stops the click from propagating
      if (!e)  e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
  }
}
