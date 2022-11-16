import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { colleagueList } from 'src/app/interfaces/signup.interface';
import { Router } from '@angular/router';
import * as SendBird from 'sendbird';
import { DOCUMENT } from '@angular/common';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  providers: [FormatTimestampTimePipe],
})
export class MemberCardComponent implements OnInit {
  colleagueListData: any;
  selectedColleague: string;
  private updateSubscription: Subscription;
  userRole:string='';
  allCollabUsers: any = [];
  groupChannelListQueryNew: any;
  currentTeam:any;
  currentTeamData:any;
  app_id: any;
  userId: any;
  nickName: any;
  channelUrl: any;
  sb: any;
  
  constructor(
    private eventEmitterService: EventEmitterService,
    private authHttp: AuthHttpService,
    private router: Router,
    
  ) {}

  //collaspe menu
  hideStream() {
    if (document.getElementById('IconCollegue').classList.contains('active')) {
      document.getElementById('IconCollegue').classList.remove('active');
    } else {
      document.getElementById('IconCollegue').classList.add('active');
    }

    if (document.getElementById('CollegueDes').classList.contains('active')) {
      document.getElementById('CollegueDes').classList.remove('active');
    } else {
      document.getElementById('CollegueDes').classList.add('active');
    }
  }

  ngOnInit(): void {
    this.app_id = localStorage.getItem('application_id');
    this.nickName = localStorage.getItem('nickname');
    this.channelUrl = localStorage.getItem('channel_url');
    this.userId = localStorage.getItem('user_id');
    this.userRole=localStorage.getItem('user-role');
    this.updateSubscription = interval(60000).subscribe(
      (val) => { this.getColleague()});
    
    if (localStorage.getItem('selectedColleague') != null) {
      if(localStorage.getItem('page')==null && localStorage.getItem('page')=='colab'){
        this.selectedColleague = localStorage.getItem('selectedColleague');
      }
      
    }
    this.eventEmitterService.colleagueEventEmitter.subscribe((_) => {
      this.getColleague();
    });
    this.eventEmitterService.teamToColleagueEventEmitter.subscribe((_) => {
      this.selectedColleague = '';
      this.getColleague();
    });
    this.eventEmitterService.bckCollabCollegueEventEmitter.subscribe((_)  => {
      console.log('-------------emiter called-----------')
      this.selectedColleague = '';
      this.getColleague();
    });
    this.getColleague();
    console.log(this.app_id)
    this.sbConnect(this.nickName)
  }

    sbConnect(nickName: any) {
      console.log(nickName, this.app_id, this.userId)
    this.nickName = nickName;
    this.sb = new SendBird({ appId: this.app_id, localCacheEnabled: true });
    this.sb
      .connect(this.userId, nickName)
      .then((res) => {
        console.log('connected');
        // this.sbListOfGroupChannels();
        // this.sbMarkAsRead(this.channelUrl, this.channel);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

      this.eventEmitterService.bckCollabEventEmitter.subscribe((_) => {
        this.authHttp.getTeamList(this.data).subscribe(
          (response) => {
            this.selectedColleague = '';
            this.getColleague();
          },
          (error) => {
            //this.isSubmitFormLoading = false;
          }
        );
      });
  }

  data: any = {};
  getColleague() {
      this.authHttp.getColleagueList(this.data).subscribe(
        (response) => {
          this.colleagueListData = response.data;
          localStorage.setItem('colleagues', JSON.stringify(response.data))
    //       localStorage.setItem('collogue_id', this.colleagueListData[0].sendbird_user_details.user_id);
    // localStorage.setItem('selectedTeamName', this.colleagueListData[0].sendbird_user_details.nickname);
    // this.selectedColleague = this.colleagueListData[0].sendbird_user_details.user_id;
    // this.eventEmitterService.colleagueToTeamEventEmitter.emit(true);
    
          localStorage.setItem("first_colleague",response.data[0]['fname']+' '+response.data[0]['lname']);
          if (localStorage.getItem('selectedColleague') != null) {
            for (let j = 0; j < this.colleagueListData.length; j++) {
              if (
                this.colleagueListData[j]['sendbird_user_details']['user_id'] ==
                localStorage.getItem('selectedColleague')
              ) {
                console.log(
                  'aaaa' +
                    this.colleagueListData[j]['sendbird_user_details']['user_id']
                );
                localStorage.setItem(
                  'selectedColleague',
                  this.colleagueListData[j]['sendbird_user_details']['user_id']
                );
                localStorage.setItem(
                  'current_colleague_fname',
                  this.colleagueListData[j]['fname']
                );
                localStorage.setItem(
                  'current_colleague_lname',
                  this.colleagueListData[j]['lname']
                );
                localStorage.setItem(
                  'current_colleague_latest_punch_type',
                  this.colleagueListData[j]['latest_punch_type']
                );
                localStorage.setItem(
                  'current_colleague_latest_punch_time',
                  this.colleagueListData[j]['latest_punch_time']
                );
                localStorage.setItem(
                  'current_colleague_role_name',
                  this.colleagueListData[j]['role_name']
                );
                localStorage.setItem(
                  'current_colleague_doj',
                  this.colleagueListData[j]['doj']
                );

              }
            }
          }
        },
        (error) => {
          //this.isSubmitFormLoading = false;
        }
      );
  }

  openInvitationSendModal() {
    this.eventEmitterService.memberInviteEventEmitter.emit(true);
  }

  sbCreateChannelWithUserIds = (userIds = []) => {
    console.log(userIds);
    return new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      sb.GroupChannel.createChannelWithUserIds(
        userIds,
        true,
        (createdChannel, error) => {
          if (error) {
            console.log('error', error);
            reject(error);
          } else {
            localStorage.setItem('channel_url', createdChannel.url);
            this.eventEmitterService.emitForceUpdate();
            // let allCollab = localStorage.getItem('allCollab')
            this.router.navigate(['dashboard/team-collab']);
        // if( allCollab == 'true'){
        //   this.router.navigate(['dashboard/members-collab']);
        // }else{
        //   this.router.navigate(['dashboard/teams-collab']);
        // }
            console.log('createdChannel', createdChannel);
            // navigate('ChatScreen', {
            //   channel: createdChannel,
            //   channelUrl: createdChannel.url,
            //   memberCount: createdChannel.memberCount,
            //   isOpenChannel: createdChannel.isOpenChannel(),
            // });
            resolve(createdChannel);
          }
        }
      );
    });
  };

  collegueClick = (e) => {
    this.eventEmitterService.colleagueSnap.emit(true);
    if(e.userpicture){
    localStorage.setItem('cropped-profile-image',e.userpicture)
    }else{
      localStorage.setItem('cropped-profile-image',null)
    }
    localStorage.removeItem('selectedTeam');
    localStorage.setItem('selectedColleague', e.sendbird_user_details.user_id);
    localStorage.setItem('current_colleague_fname', e.fname);
    localStorage.setItem('current_colleague_lname', e.lname);
    localStorage.setItem(
      'current_colleague_latest_punch_type',
      e.latest_punch_type
    );
    localStorage.setItem(
      'current_colleague_latest_punch_time',
      e.latest_punch_time
    );
    localStorage.setItem('current_colleague_role_name', e.role_name);
    localStorage.setItem('current_colleague_doj', e.doj);

    this.eventEmitterService.collabTypeEventEmitter.emit(true);
    
    this.eventEmitterService.colleagueSnap2.emit(true);
    localStorage.setItem('collogue_id', e.sendbird_user_details.user_id);
    localStorage.setItem('selectedTeamName', e.sendbird_user_details.nickname);
    this.selectedColleague = e.sendbird_user_details.user_id;
    this.eventEmitterService.colleagueToTeamEventEmitter.emit(true);
    //this.eventEmitterService.colleagueSnap.emit(true);
    this.sbCreateChannelWithUserIds([localStorage.getItem('collogue_id')])
    .then((createdChannel) => {
        //  localStorage.setItem('channel_url', createdChannel.url)
        console.log('createdChannel', createdChannel);
        this.router.navigate(['dashboard/team-collab']);
        // let allCollab = localStorage.getItem('allCollab')
        // if( allCollab == 'true'){
        //   this.router.navigate(['dashboard/members-collab']);
        // }else{
        //   this.router.navigate(['dashboard/team-collab']);
        // }
        
      })

      .catch((error) => {
        console.log('sbCreateChannelWithUserIds...error...', error);
      });
      // location.reload();
  };
  openInvitionSendModal() {
    this.eventEmitterService.colleagueInviteEventEmitter.emit(true);
  }
}
