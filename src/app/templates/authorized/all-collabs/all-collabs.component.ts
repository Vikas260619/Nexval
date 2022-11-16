import { Component, OnInit } from '@angular/core';
import * as SendBird from 'sendbird';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';




@Component({
  selector: 'app-all-collabs',
  templateUrl: './all-collabs.component.html',
  styleUrls: ['./all-collabs.component.scss']
})
export class AllCollabsComponent implements OnInit {
  groupChannelListQueryNew: any;
  colleagueListData: any = [];
  userRole: any;
  memberList: any = [];
  selectedColleague: any;
  getApiMemberList: any = [];
  channelUrl: any;
  members: any;
  currentTeam: any;
  getTeam: any;
  currentUser: any;
  
  constructor(    
    private store: StoreService,
    private authHttp: AuthHttpService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.userRole=localStorage.getItem('user-role');
    // this.groupChannelListQueryNew = this.sbCreateGroupChannelListQuery();
    // // this.sbCreateGroupChannelListQuery();
    // this.sbGetGroupChannelList(this.groupChannelListQueryNew);
    this.getAllCollabUsers();
    this.members = JSON.parse(localStorage.getItem('memberList'))
    this.userName()
    this.getTeam =   JSON.parse(localStorage.getItem('teams'));
    if(localStorage.getItem('selectedColleague') != null){
      this.selectedColleague = (localStorage.getItem('selectedColleague'))
    }else{
      this.selectedColleague = (localStorage.getItem('selectedTeam'))
    }  
    this.currentUser = localStorage.getItem('nickname')
  }
  getAllCollabUsers(){
    let data: any = {};
      this.authHttp.getAllUsers(data).subscribe(
        (response) => {
          this.getApiMemberList = response.data
          // this.userName(this.members)
          //console.log(response.data)         
          localStorage.setItem(
            'all_users_data',
            JSON.stringify(response.data)
          );
        },
        (error) => {
          //this.isSubmitFormLoading = false;
        }
      );
   }

   sbCreateChannelWithUserIds = (userIds = []) => {
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
           //.log(createdChannel)
            localStorage.setItem('channel_url', createdChannel.url);
            this.eventEmitterService.emitForceUpdate();
            // let allCollab = localStorage.getItem('allCollab')
            this.router.navigate(['dashboard/members-collab']);
        // if( allCollab == 'true'){
        //   this.router.navigate(['dashboard/members-collab']);
        // }else{
        //   this.router.navigate(['dashboard/teams-collab']);
        // }
           // console.log('createdChannel', createdChannel);
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

  getUserProfilePicture =  (members: any) => {
    let messageMember = JSON.parse(localStorage.getItem('colleagues'));
    for (let member of members) {
      for (let message of messageMember) {
        if (message?.sendbird_user_details?.user_id == member?.userId) {
          member.userPic = message?.userpicture
            ? { uri: message?.userpicture }
            : '';
          member.designation = message?.role_name
            ? { designation: message?.role_name }
            : '';
            member.latest_punch_type = message?.latest_punch_type
            ? { latest_punch_type: message?.latest_punch_type }
            : '';
        }
      }
    }
  };

  async userName(){
    this.getUserProfilePicture(this.members)
    if(this.members.length != 0){
      for (let member of this.members) {
        if (member?.userId != localStorage.getItem('user_id')) {
          this.memberList.push(member)
        }
        console.log(this.memberList)
        // console.log('memberlistdhee:');
        
      }
      // localStorage.setItem('memberList', JSON.stringify(this.memberList))
      console.log("++++++++++++++++++++++++++++++++++++++",this.memberList);
    }else{
      // localStorage.setItem('memberList', JSON.stringify([]))
    }
    // if(!this.memberList[0].sendbird_team_details){
    //   let filterCollages = this.getApiMemberList.filter(el => el.sendbird_user_details.user_id === this.memberList[0].userId)
    //   this.sbCreateChannelWithUserIds([filterCollages[0].sendbird_user_details.user_id]);
    //   // console.log(filterCollages[0].id, filterCollages[0].sendbird_user_details.nickname, filterCollages[0].sendbird_user_details.application_id, this.memberList[0])
    //   if (localStorage.getItem('selectedColleague') == null) {
    //    localStorage.setItem('selectedTeam', filterCollages[0].id);
    //     localStorage.setItem('selectedTeamName', filterCollages[0].sendbird_user_details.nickname);
    //     localStorage.setItem('application_id', filterCollages[0].sendbird_user_details.application_id);
    //     localStorage.setItem('channel_url', localStorage.getItem('channel_url'));
    //     this.selectedColleague = filterCollages[0].sendbird_user_details.user_id;
    //     // console.log(localStorage.getItem('selectedTeam'))
    //     // console.log(localStorage.getItem('selectedTeamName'))
    //     // console.log(localStorage.getItem('application_id'))
    //     // console.log(localStorage.getItem('channel_url'))
    //      this.sbCreateChannelWithUserIds([filterCollages[0].sendbird_user_details.user_id]);
    //     this.eventEmitterService.colleagueSnap.emit(true);
    //   this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
    //   this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
    //     // this.currentTeam = this.store.getTeamFromLocal();
    //     this.router.navigate(['dashboard/members-collab']);
    //   }
    // }else{
    //   let filterTeams = this.getTeam.filter(el => el.sendbird_team_details.name == this.memberList[0].name);
    // console.log(filterTeams)
    // localStorage.setItem('selectedColleague', filterTeams[0].id);
    // localStorage.setItem('selectedTeam', filterTeams[0].id);
    // localStorage.setItem('selectedTeamName', filterTeams[0].sendbird_team_details.name);
    // localStorage.setItem('selectedTeamDescription', filterTeams[0].desc);
    // localStorage.setItem('application_id', filterTeams[0].sendbird_team_details.application_id);
    // localStorage.setItem('channel_url', filterTeams[0].sendbird_team_details.channel_url);
    // this.selectedColleague = filterTeams[0].sendbird_team_details.user_id;
    // this.eventEmitterService.colleagueSnap.emit(true);
    // this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
    // this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
    // this.eventEmitterService.emitForceUpdate();
    // this.currentTeam = this.store.getTeamFromLocal();
    // this.router.navigate(['dashboard/teams-collab']);
    // }
  }

collegueClick = (e) => {
  if(!e.sendbird_team_details){
    let filterCollages = this.getApiMemberList.filter(el => el.sendbird_user_details.user_id === e.userId)
    if(filterCollages[0].userpicture){
    localStorage.setItem('cropped-profile-image-pic',filterCollages[0].userpicture)
    }else{
      localStorage.setItem('cropped-profile-image-pic',null)
    }
    localStorage.removeItem('selectedTeam');
    localStorage.setItem('selectedColleague', filterCollages[0].sendbird_user_details.user_id);
    localStorage.setItem('current_colleague_fname',filterCollages[0].fname);
    localStorage.setItem('current_colleague_lname',filterCollages[0].lname);
    localStorage.setItem(
      'current_colleague_latest_punch_type',
     filterCollages[0].latest_punch_type
    );
    localStorage.setItem(
      'current_colleague_latest_punch_time',
     filterCollages[0].latest_punch_time
    );
    localStorage.setItem('current_colleague_role_name',filterCollages[0].role_name);
    localStorage.setItem('current_colleague_doj',filterCollages[0].doj);
  
    this.eventEmitterService.collabTypeEventEmitter.emit(true);
    localStorage.setItem('collogue_id',filterCollages[0].sendbird_user_details.user_id);
    localStorage.setItem('selectedTeamName',filterCollages[0].sendbird_user_details.nickname);
    this.selectedColleague =filterCollages[0].sendbird_user_details.user_id;
    this.eventEmitterService.colleagueToTeamEventEmitter.emit(true);
    this.eventEmitterService.colleagueSnap.emit(true);
    this.sbCreateChannelWithUserIds([localStorage.getItem('collogue_id')])
    .then((createdChannel) => {
        //  localStorage.setItem('channel_url', createdChannel.url)
        //console.log('createdChannel', createdChannel);
        this.router.navigate(['dashboard/members-collab']);
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
  }else{
    let filterTeams = this.getTeam.filter(el => el.name == e.name);
    localStorage.setItem('selectedColleague', filterTeams[0].id);
    localStorage.setItem('selectedTeam', filterTeams[0].id);
    localStorage.setItem('selectedTeamName', filterTeams[0].name);
    localStorage.setItem('selectedTeamDescription', filterTeams[0].desc);
    localStorage.setItem('application_id', filterTeams[0].sendbird_team_details.application_id);
    localStorage.setItem('channel_url', filterTeams[0].sendbird_team_details.channel_url);
    localStorage.setItem('selectedTeamUsers', filterTeams[0].usercount);
    this.selectedColleague = filterTeams[0].sendbird_team_details.id;
    this.eventEmitterService.colleagueSnap.emit(true);
    this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
    this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
    this.eventEmitterService.emitForceUpdate();
    this.currentTeam = this.store.getTeamFromLocal();
    this.router.navigate(['dashboard/teams-collab']);
  }

    // location.reload();
};

selectTeam(event) {
  console.log(event.id);
  console.log(event.url);
  let application_id = localStorage.getItem('application_id');
  console.log(application_id);
  localStorage.removeItem('selectedColleague');
  var target = event;
  var idAttr = target.id;

  localStorage.setItem('selectedTeam', target.id);
  localStorage.setItem('selectedTeamName', target.name);
  localStorage.setItem('selectedTeamDescription', target.desc);
  localStorage.setItem('application_id', target.application_id);
  localStorage.setItem('channel_url', target.url);
  this.eventEmitterService.colleagueSnap.emit(true);
  this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
  this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
  this.eventEmitterService.emitForceUpdate();
  this.currentTeam = this.store.getTeamFromLocal();
  this.router.navigate(['dashboard/members-collab']);
}

selectTeamCircle(id,name,desc,app_id,ch) {
  //console.log(event.target.id);
  localStorage.removeItem('selectedColleague');
 // var target = event.target || event.srcElement || event.currentTarget;
  var idAttr = id;

  localStorage.setItem('selectedTeam', id);
  localStorage.setItem('selectedTeamName', name);
  localStorage.setItem('selectedTeamDescription',desc);
  localStorage.setItem('application_id', app_id);
  localStorage.setItem('channel_url', ch);
  this.eventEmitterService.colleagueSnap.emit(true);
  this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
  this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
  this.eventEmitterService.emitForceUpdate();
  this.currentTeam = this.store.getTeamFromLocal();
  this.router.navigate(['dashboard/members-collab']);
}

}
