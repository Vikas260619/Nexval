import { Component, OnInit, ElementRef,ChangeDetectorRef ,AfterViewInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { StoreService } from 'src/app/service/store.service';
import { FormatTimestampDatePipe } from 'src/app/pipes/format-timestamp-date.pipe';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { CryptoService } from 'src/app/service/crypto.service';
import { relativeTimeThreshold } from 'moment';

@Component({
  selector: 'app-empty-colaboration',
  templateUrl: './empty-colaboration.component.html',
  styleUrls: ['./empty-colaboration.component.scss'],
  providers: [
    FormatTimestampDatePipe,
    FormatTimestampTimePipe,
    FormatTimestampPipe,
  ],
})
export class EmptyColaborationComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();

  currentTeam: any = '';
  currentTeamData: any;
  teamName: string = '';
  selectedTeamName: string = '';
  tm: string = '';
  channel: any;
  messages: any;
  application_id: any;
  nickname: string;
  channel_url: string;
  user_id: string;
  IslocalStorageData: boolean = false;
  groupCreatedAt: string;
  teamCollab: boolean = true;
  current_colleague_fname: string = '';
  current_colleague_lname: string = '';
  current_colleague_latest_punch_type: string = '';
  current_colleague_latest_punch_time: string = '';
  current_colleague_role_name: string = '';
  current_colleague_doj: string = '';
  closeSnap: boolean = true;
  earlybirdTime: string = '00:00 00 00';
  earlybirdFname: string = '';
  earlybirdLname: string = '';
  empId: string = '';
  private updateSubscription: Subscription;
  attendencePercentage:string='0';
  userImgUrl: string = '';
  early_bird_image: string = '';
  backgroundSetting:any;
  userRole: any;
  chatBoard: boolean = false;
  

  constructor() {}

  
  ngOnInit(): void {}
}
