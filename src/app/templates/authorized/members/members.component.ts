import { Component, OnInit, ElementRef,ChangeDetectorRef ,AfterViewInit, ViewChild  } from '@angular/core';
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
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [
    FormatTimestampDatePipe,
    FormatTimestampTimePipe,
    FormatTimestampPipe,
  ],
})
export class MembersComponent implements OnInit {
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
  allCollabUsers: any = [];
  page:string='';
  teamCount: number = 0;
  currentTeamUsers: any;
  

  constructor(
    private eventEmitterService: EventEmitterService,
    private store: StoreService,
    private router: Router,
    private authHttp: AuthHttpService,
    private crypt: CryptoService,
    private location: LocationStrategy,
    private cdr: ChangeDetectorRef
  ) {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    localStorage.setItem('page','colab');
  }
  ngAfterViewInit() {
    this.allCollabUsers = JSON.parse(localStorage.getItem('memberList'));
    this.cdr.detectChanges();
    this.closeSnap = true;
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    this.cdr.detectChanges();
    this.eventEmitterService.allColabSelfEmitter.emit(true);
    if (localStorage.getItem('current_colleague_fname') != null) {
      this.current_colleague_fname = localStorage.getItem(
        'current_colleague_fname'
      );
    }
    if (localStorage.getItem('current_colleague_lname') != null) {
      this.current_colleague_lname = localStorage.getItem(
        'current_colleague_lname'
      );
    }
    if (localStorage.getItem('current_colleague_latest_punch_type') != null) {
      this.current_colleague_latest_punch_type = localStorage.getItem(
        'current_colleague_latest_punch_type'
      );
    }
    if (localStorage.getItem('current_colleague_latest_punch_time') != null) {
      this.current_colleague_latest_punch_time = localStorage.getItem(
        'current_colleague_latest_punch_time'
      );
    }

    if (localStorage.getItem('current_colleague_role_name') != null) {
      this.current_colleague_role_name = localStorage.getItem(
        'current_colleague_role_name'
      );
    }
    if (localStorage.getItem('current_colleague_doj') != null) {
      this.current_colleague_doj = localStorage.getItem(
        'current_colleague_doj'
      );
    }
    let dataPercentage: any = {
      hierarchy_id: localStorage.getItem('selectedTeam'),
    };
    this.authHttp.getAttendencePercentage(dataPercentage).subscribe(
      (response) => {
        if (response.success) {

          this.attendencePercentage=response.data[0]['attendance_percentage'];
          //return response.data[0]['attendance_percentage'];
          let attenPercentage=Number(this.attendencePercentage);
          let rest = (100 - attenPercentage);
          this.backgroundSetting = `radial-gradient(
            circle closest-side,
            transparent 100%,
            #333333 0
          ),
          conic-gradient(
            from 150deg,
            #43CC2C ${attenPercentage}%,
            #3c3c3c 0%
        )`;
        console.log(this.backgroundSetting);
          this.setCssVariable('background', this.backgroundSetting);
        }
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
   
  }
  @ViewChild('mask') maskElementRef: ElementRef<HTMLElement>;
  private setCssVariable(name: string, value: string): void {
    if(this.maskElementRef)
    this.maskElementRef.nativeElement.style.setProperty(name, value);
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload()  
       
      }else{
        localStorage.removeItem('foo') 
      }
    },1000)
    localStorage.setItem('page','member-collab')
    this.page=localStorage.getItem('page');
    this.allCollabUsers = JSON.parse(localStorage.getItem('allCollabUsers'))
    if (localStorage.getItem('selectedTeamName') != null) {
      this.currentTeam = localStorage.getItem('selectedTeamName');
      this.currentTeamUsers = localStorage.getItem('selectedTeamUsers')
    }
    //this.getAttendencePercentage();
    this.userRole = localStorage.getItem('user-role')
    this.teamCount = Number(localStorage.getItem('teamcount'));

    this.updateSubscription = interval(60000).subscribe(
      (val) => { 
        this.getAttendencePercentage();
      });
    if (localStorage.getItem('cropped-profile-image') != null) {
      this.userImgUrl = localStorage.getItem('cropped-profile-image');
    }
    if ((!localStorage.hasOwnProperty('teamCollab') && this.teamCount == 0) || localStorage.getItem('teamCollab') != null && localStorage.getItem('teamCollab') == 'false') {
      this.teamCollab = false;
  }
    this.getCurrentTeam();
    let invToken = this.store.getInvitationToken();
    this.selectedTeamName = localStorage.getItem('selectedTeam');
    let invActivated = localStorage.getItem('inv-activated');

    let data: any = {
      hierarchyid: this.selectedTeamName,
      attendance_date: this.formatDate()
    };
    this.authHttp.earlyBirdUser(data).subscribe(
      (response) => {
        if (response.success) {
          if (response.data['early_bird_time'] != null) {
            this.earlybirdTime = response.data['first_check_in'];
          } else {
            this.earlybirdTime = '00:00 00 00';
          }

          // if (response.data['userpicture_original'] != null) {
          //   this.early_bird_image = response.data['userpicture_original'];
          // }
          if (response.data['fname']) {
            this.earlybirdFname = response.data['fname'];
          }
          this.earlybirdLname = response.data['lname'];
          if(response.data['employmenttype_id']){
          this.empId = this.crypt.decrypt(response.data['employmenttype_id']);
          }
          if (response.data['userpicture_original'] != null) {
            this.early_bird_image = response.data['userpicture_original'];
          } else {
            this.early_bird_image = '';
          }
          let dataPercentage: any = {
            hierarchy_id: localStorage.getItem('selectedTeam'),
          };

          this.authHttp.getAttendencePercentage(dataPercentage).subscribe(
            (response) => {
              if (response.success) {
      
                this.attendencePercentage=response.data[0]['attendance_percentage'];
                //return response.data[0]['attendance_percentage'];
                let attenPercentage=Number(this.attendencePercentage);
                let rest = (100 - attenPercentage);
                this.backgroundSetting = `radial-gradient(
                  circle closest-side,
                  transparent 100%,
                  #333333 0
                ),
                conic-gradient(
                  from 150deg,
                  #43CC2C ${attenPercentage}%,
                  #3c3c3c 0%
              )`;
              //console.log(this.backgroundSetting);
                this.setCssVariable('background', this.backgroundSetting);
              }
            },
            (error) => {
              //this.isSubmitFormLoading = false;
            }
          );
        }
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
    if (invToken != null && invActivated === null) {
      this.IslocalStorageData = false;
      setTimeout(() => this.openForceUpdateModal(), 500);
    }

    this.eventEmitterService.addForceUpadate.subscribe((_) => {
      this.getCurrentTeam();
      if (localStorage.getItem('cropped-profile-image') != null) {
        this.userImgUrl = localStorage.getItem('cropped-profile-image');
      }
    });
    this.eventEmitterService.collabTypeEventEmitter.subscribe((_) => {
      this.teamCollab = false;
      localStorage.setItem('teamCollab', 'false');
      if (localStorage.getItem('current_colleague_fname') != null) {
        this.current_colleague_fname = localStorage.getItem(
          'current_colleague_fname'
        );
      }
      if (localStorage.getItem('current_colleague_lname') != null) {
        this.current_colleague_lname = localStorage.getItem(
          'current_colleague_lname'
        );
      }
      if (localStorage.getItem('current_colleague_latest_punch_type') != null) {
        this.current_colleague_latest_punch_type = localStorage.getItem(
          'current_colleague_latest_punch_type'
        );
      }
      if (localStorage.getItem('current_colleague_latest_punch_time') != null) {
        this.current_colleague_latest_punch_time = localStorage.getItem(
          'current_colleague_latest_punch_time'
        );
      }

      if (localStorage.getItem('current_colleague_role_name') != null) {
        this.current_colleague_role_name = localStorage.getItem(
          'current_colleague_role_name'
        );
      }
      if (localStorage.getItem('current_colleague_doj') != null) {
        this.current_colleague_doj = localStorage.getItem(
          'current_colleague_doj'
        );
      }
    });
    this.eventEmitterService.collabTypeTeamEventEmitter.subscribe((_) => {
      this.teamCollab = true;
      localStorage.setItem('teamCollab', 'true');
      let data: any = {
        hierarchyid: localStorage.getItem('selectedTeam'),
        attendance_date:this.formatDate()
      };
      this.authHttp.earlyBirdUser(data).subscribe(
        (response) => {
          if (response.success) {
            console.log('++' + response.data['early_bird_time']);
            if (response.data['early_bird_time'] != null) {
              this.earlybirdTime = response.data['first_check_in'];
            } else {
              this.earlybirdTime = '00:00 00 00';
            }
            this.earlybirdFname = response.data['fname'];
            this.earlybirdLname = response.data['lname'];
            if (response.data['userpicture_original'] != null) {
              this.early_bird_image = response.data['userpicture_original'];
            } else {
              this.early_bird_image = '';
            }
          }
          console.log('this.earlybirdTime----', this.earlybirdTime)
        },
        (error) => {
          //this.isSubmitFormLoading = false;
        }
      );
    });
    this.eventEmitterService.colleagueSnap.subscribe((_) => {
      this.closeSnap = false;
      
    });
    this.eventEmitterService.colleagueSnap2.subscribe((_) => {
      this.closeSnap = true;
      //console.log("////////////////////////////////"+this.closeSnap);
    });
  }

   formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  ngOnChanges() {
    this.application_id = localStorage.getItem('application_id');
    this.nickname = localStorage.getItem('nickname');
    this.channel_url = localStorage.getItem('channel_url');
    this.user_id = localStorage.getItem('user_id');
    if (localStorage.getItem('selectedTeamName') != null) {
      this.currentTeam = localStorage.getItem('selectedTeamName');
      this.currentTeamUsers = localStorage.getItem('selectedTeamUsers')
    }
    this.tm = localStorage.getItem('selectedTeamName');
    this.groupCreatedAt = localStorage.getItem('createdon');
  }

  getAttendencePercentage(){
    
    let dataPercentage: any = {
      hierarchy_id: localStorage.getItem('selectedTeam'),
    };
    this.authHttp.getAttendencePercentage(dataPercentage).subscribe(
      (response) => {
        if (response.success) {
          this.attendencePercentage=response.data[0]['attendance_percentage'];
          let attenPercentage=Number(this.attendencePercentage);
        let rest = (100 - attenPercentage);
       
        this.backgroundSetting = `radial-gradient(
          circle closest-side,
          transparent 100%,
          #333333 0
        ),
        conic-gradient(
          from 150deg,
          #43CC2C ${attenPercentage}%,
          #3c3c3c 0%
      )`;

        this.setCssVariable('background', this.backgroundSetting);
            }
          },
          (error) => {
            //this.isSubmitFormLoading = false;
          }
        );
  }

  getChannel(e) {
    this.channel = e;
  }

  getMessage(e) {
    this.messages = e;
  }

  getCurrentTeam() {
    this.currentTeam = localStorage.getItem('current-team');
    this.currentTeamUsers = localStorage.getItem('selectedTeamUsers')
    console.log(this.currentTeam)
    if (this.currentTeam != null) {
      this.IslocalStorageData = true;
      this.currentTeamData = JSON.parse(this.currentTeam);
      if(this.currentTeamData.name!=null)
      {
      this.currentTeam = this.currentTeamData.name;
      this.currentTeamUsers = localStorage.getItem('selectedTeamUsers')
      }else{
        this.currentTeam = localStorage.getItem('first_colleague');
      }
      this.application_id = this.currentTeamData.user_details.application_id;
      this.nickname = this.currentTeamData.user_details.nickname;
      this.channel_url = this.currentTeamData.channel_url;
      this.user_id = this.currentTeamData.user_details.user_id;
      this.tm = localStorage.getItem('selectedTeamName');
      this.groupCreatedAt = this.currentTeamData.createdon;
    } else {
      this.application_id = localStorage.getItem('application_id');
      this.nickname = localStorage.getItem('nickname');
      this.channel_url = localStorage.getItem('channel_url');
      this.user_id = localStorage.getItem('user_id');
      this.currentTeam = localStorage.getItem('selectedTeamName');
      this.currentTeamUsers = localStorage.getItem('selectedTeamUsers')
      this.tm = localStorage.getItem('selectedTeamName');
      this.groupCreatedAt = localStorage.getItem('createdon');
      this.eventEmitterService.emitPostList();
      this.IslocalStorageData = true;
    }
  }

  openForceUpdateModal() {
    this.eventEmitterService.addForceUpadate.emit(true);
  }
  openInvitationSendModal() {
    this.eventEmitterService.memberInviteEventEmitter.emit(true);
  }
 
  //go back
  goBack() {
    this.eventEmitterService.emitBckCollab();
    this.router.navigate(['dashboard/home']);
  }

  openArrivalMessageModal() {
    this.eventEmitterService.arrivalMessageEventEmitter.emit(true);
  }
}
