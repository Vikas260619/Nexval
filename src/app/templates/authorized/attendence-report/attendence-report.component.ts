import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { FormatLatPipe } from 'src/app/pipes/format-lat.pipe';
import { FormatLongPipe } from 'src/app/pipes/format-long.pipe';
import { MinuteToHourPipe } from 'src/app/pipes/minute-to-hour.pipe';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-attendence-report',
  templateUrl: './attendence-report.component.html',
  styleUrls: ['./attendence-report.component.scss'],
  providers: [FormatTimestampPipe, FormatLatPipe, FormatLongPipe,MinuteToHourPipe],
})
export class AttendenceReportComponent implements OnInit {
  showStream() {
    if (document.getElementById("hyper").classList.contains("active")) {
      document.getElementById("hyper").classList.remove("active")
    } else {
      document.getElementById("hyper").classList.add("active")
    }
  }  
  dates:any=[];
  myDays:boolean=true
  selectedElement:string='';
  countOfDays:number=0;
  monthDates:any=[];
  record:any=[];
  record1=[];
  dataLoaded:boolean=false;
  firstDayOfSelectedMonth:number=0;
  cnt:number=0;
  userRole: any;
  constructor(private authHttp: AuthHttpService,private router:Router,private emitter:EventEmitterService) {  this.dates.push('1');
  // this.dates.push('2');
  // this.dates.push('3');
  // this.dates.push('4');
  // this.dates.push('5');
  // this.dates.push('6');
  // this.dates.push('7'); 
 
}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user-role')
    localStorage.setItem('page','attendence-report');
    this.monthDates=localStorage.getItem('dates-in-month');
    this.countOfDays=Number(localStorage.getItem('days-in-month'));
    let sdDate: Date = new Date();
    let fDay:Date = new Date(sdDate.getFullYear(),sdDate.getMonth(), 1);
    let day = new Date(fDay).getDay();
      localStorage.setItem('first-day-selected-month', day.toString());
    if(localStorage.getItem('filter-start-date')==null){
      let selectedDate: Date = new Date();
      let firstDay:Date = new Date(selectedDate.getFullYear(),selectedDate.getMonth(), 1);
      let lastDay:Date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      localStorage.setItem('filter-start-date', formatDate(firstDay, 'yyyy-MM-dd', 'en').toString());
      localStorage.setItem('filter-end-date',formatDate(lastDay, 'yyyy-MM-dd', 'en').toString());
     
      //this.getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
      //localStorage.setItem('days-in-month', this.getDaysInMonth);
      let today = new Date();
      let month = today.getMonth();
      let getDaysInMonth = this.daysInMonth(month + 1, today.getFullYear());
      localStorage.setItem('days-in-month', getDaysInMonth.toString());
      let day = new Date(firstDay).getDay();
      localStorage.setItem('first-day-selected-month', day.toString());

      let dte = today;
      let mn = dte.getMonth();
      let year = dte.getFullYear();
      let dates:any=this.getDayNamesInMonth(mn,year);
      localStorage.setItem('dates-in-month', dates);
    }
    
    if(localStorage.getItem('selectedFilter')!=null){
      this.selectedElement=localStorage.getItem('selectedFilter');
    }

    this.myAttendence();
    this.emitter.attEventEventEmitter.subscribe((_) => {
      this.record1=[]
      this.myAttendence();
    });
  }
  counter(i: number) {
    return new Array(i);
}
getDayNamesInMonth(month, year) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(formatDate(date, 'yyyy-MM-dd', 'en').toString());
    date.setDate(date.getDate() + 1);
  }
  return days;
}
  getSelected(event){
    //console.log(event);
    this.selectedElement=event;
    localStorage.setItem('selectedFilter',event);
  }
  refreshFilter(){
    localStorage.removeItem('selectedFilter');
    this.selectedElement='';
    //this.showStream();
  }
  myAttendence(){
    this.firstDayOfSelectedMonth=Number(localStorage.getItem('first-day-selected-month'));
    if(this.firstDayOfSelectedMonth>1)
    {
    this.cnt=this.firstDayOfSelectedMonth-1;
    }else if(this.firstDayOfSelectedMonth==1){
     this.cnt=0;
    }else if(this.firstDayOfSelectedMonth==0){
      this.cnt=6;
    }else{
      this.cnt=1;
    }
    // console.log("???????????????????????????????????//",this.firstDayOfSelectedMonth);
    this.record1.length=0;
    this.monthDates=localStorage.getItem('dates-in-month');
    this.monthDates=this.monthDates.split(",");
  
    this.countOfDays=Number(localStorage.getItem('days-in-month'));
    let st_date=localStorage.getItem('filter-start-date');
    let end_date = localStorage.getItem('filter-end-date');
    let data:any={
      "start_date":st_date,
      "end_date":end_date,
    }
    this.authHttp.getMyAttendence(data).subscribe(
      (response) => {
        this.dates = response.data;
       for (let i = 0; i < this.dates.length; i++) {
            const time = moment(this.dates[i]['attendance_date']);
            const localTime = moment(time).local();
            let formatedlocaltime = localTime.format('YYYY-MM-DD');
            console.log(formatedlocaltime);
            this.record.push(formatedlocaltime,this.dates[i]);
            this.record1[formatedlocaltime.toString()]=this.dates[i]; 
          }
          localStorage.setItem('record-set',JSON.stringify(this.record));
          this.dataLoaded=true;
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }
  daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }
  goInternal(event){
    console.log(event.target.internal_data);
    this.router.navigate(['./dashboard/attendence-internal']);
  }
  openSingleMapModal(){
    this.emitter.singleMapModalEventEmitter.emit(true);
  }
  downloadReport(){
    let st_date=localStorage.getItem('filter-start-date');
    let end_date = localStorage.getItem('filter-end-date');
    let dat:any={
      "start_date":st_date,
      "end_date":end_date,
    }
    this.authHttp.getAttendenceReport(dat).subscribe(
      (response) => {
        //console.log(response.data[0]['file_url']);
        if(response.data[0]){
          this.goToLink(response.data[0]['file_url']);
        }
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }
  goToLink(url: string){
    window.open(url);
  }
  chkDt(date){
    let dt=date.toString();
    
    if(this.record1[dt]){
      return true;
    }else{
      return false;
    }
  }
  getVal(date,field){
    let dt=date.toString();
    return this.record1[dt][field]
  }
}
