import { Component, OnInit } from '@angular/core';
import { teamwiseMemberList } from 'src/app/interfaces/signup.interface';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { FormatLatPipe } from 'src/app/pipes/format-lat.pipe';
import { FormatLongPipe } from 'src/app/pipes/format-long.pipe';
import { threadId } from 'worker_threads';
import { ArrivalMessageService } from 'src/app/service/arrival-message.services';
import { TeamService } from 'src/app/service/team.service';
import { Router } from '@angular/router';
import { addArrivalMessage } from 'src/app/interfaces/arrival-message.interface'

@Component({
  selector: 'app-team-collab-internal',
  templateUrl: './team-collab-internal.component.html',
  styleUrls: ['./team-collab-internal.component.scss'],
  providers: [FormatTimestampPipe, FormatLatPipe, FormatLongPipe],
})
export class TeamCollabInternalComponent implements OnInit {
  currentTeam: any = null;
  currentTeamData: any;
  teamName: string = '';
  teamId: string = '';
  members: string[] = [];
  membersCount: number = 0;
  id: string = '';
  loginTime: string = '00:00';
  logoutTime: string = '00:00';
  youData = [];
  st: string = null;
  cost:any='ABCDE';
  isMembers: boolean = true;
  isMedia: boolean = false;
  isDocs: boolean = false;
  isLinks: boolean = false;
  isImages: boolean = false;
  collabChat: any;
  currentTeamDesc:string='';
  addDescription:string=''
  teamCollab: boolean = true;
  userRole:string='';
  passName:string="name";
  passDesc:string="description";
  nameEdit:boolean=true;
  descEdit:boolean=false;
  arrivalMessages: string = '';
  inputChange: boolean = false;
  alphabateValidator: boolean = false;
  removeValidator: boolean = false;
  userId: string = '';

  constructor(
    private authHttp: AuthHttpService,
    private eventEmitter: EventEmitterService,
    private timePipe: FormatTimestampPipe,
    private arrivalMessage: ArrivalMessageService,
    private eventEmitterService: EventEmitterService,
    private TeamService: TeamService,
    private router: Router
  ) {}

  ngAfterViewInit(){
    window.onscroll = function() {myFunction()};

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('selectedTeamDescription')==''){
      this.addDescription='Add description';
    }else{
      this.addDescription='';
    }
    this.userRole = localStorage.getItem('user-role')
    if (
      localStorage.getItem('teamCollab') != null &&
      localStorage.getItem('teamCollab') == 'false'
    ) {
      this.teamCollab = false;
    }
    this.collabChat = JSON.parse(localStorage.getItem('collab-chat'));
    if (localStorage.getItem('st') != null) {
      this.st = localStorage.getItem('st');
    }
    this.currentTeam = localStorage.getItem('current-team');
    this.currentTeamDesc= localStorage.getItem('selectedTeamDescription');
    
    this.id = localStorage.getItem('id');
    if (this.currentTeam != null) {
      this.currentTeamData = JSON.parse(this.currentTeam);
      //console.log(this.currentTeamData.name);
      this.currentTeam = this.currentTeamData.name;
      this.teamId = this.currentTeamData.id;
      this.cost=this.currentTeam;
    } else {
      this.currentTeam = localStorage.getItem('selectedTeamName');
      this.teamId = localStorage.getItem('selectedTeam');
      let currentLogin = localStorage.getItem('current-user-login-time');
      if (currentLogin != null) {
        this.loginTime = currentLogin;
      }
      let currentLogout = localStorage.getItem('current-user-logout-time');
      if (currentLogout) {
        this.logoutTime = currentLogout;
      }
    }

    let data: teamwiseMemberList = {
      hierarchyid: this.teamId,
    };
    this.authHttp.teamwiseMemberList(data).subscribe(
      (response) => {
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          this.members = response.data;
          this.membersCount = this.members.length;
          //this.removeById(this.members, this.id);
          //console.log(this.members.length);
          //console.log(response.data);
        } else {
        }
      },
      (_) => {}
    );
  }

  updateTeamName(value) {
    let data: any = {
      hierarchyid: this.teamId,
      id:this.teamId,
      name:value,
      hierarchy_type: "W7F+x+sPZUPsCAcXwYSH5Q==",
      desc:this.currentTeamDesc
    };
    this.authHttp.updateTeamName(data).subscribe(
      (response) => {
        if (response.success) {
          this.currentTeam = value;
          localStorage.setItem("selectedTeamName",this.currentTeam);
          this.eventEmitter.TeamEventEmitter.emit(true);
        } else {
        }
      },
      (_) => {}
    );
  }
  updateTeamDescription(value) {
    let data: any = {
      hierarchyid: this.teamId,
      id:this.teamId,
      name:this.currentTeam,
      hierarchy_type: "W7F+x+sPZUPsCAcXwYSH5Q==",
      desc:value
    };
    this.authHttp.updateTeamName(data).subscribe(
      (response) => {
        if (response.success) {
          this.currentTeamDesc = value;
          localStorage.setItem("selectedTeamDescription",this.currentTeamDesc);
          this.eventEmitter.TeamEventEmitter.emit(true);
        } else {
        }
      },
      (_) => {}
    );
  }

  removeById(arr, id) {
    const requiredIndex = arr.findIndex((el) => {
      return el.id === String(id);
    });
    this.youData = arr[requiredIndex];
    console.log('??' + this.youData);
    if (requiredIndex === -1) {
      return false;
    }

    return !!arr.splice(requiredIndex, 1);
  }

  openUserAttendenceModal(event) {
    localStorage.setItem('current_clicked_user_name', event.target.nm);
    localStorage.setItem('current_clicked_user_lname', event.target.nm2);
    localStorage.setItem('current_clicked_punch_type', event.target.punch_type);
    localStorage.setItem(
      'current_clicked_checkin_lat',
      event.target.checkin_lat
    );
    localStorage.setItem(
      'current_clicked_checkin_long',
      event.target.checkin_long
    );
    localStorage.setItem(
      'current_clicked_checkout_lat',
      event.target.checkout_lat
    );
    localStorage.setItem(
      'current_clicked_checkout_long',
      event.target.checkout_long
    );
    localStorage.setItem(
      'current_clicked_checkin_address',
      event.target.checkin_address
    );
    localStorage.setItem(
      'current_clicked_checkout_address',
      event.target.checkout_address
    );
    localStorage.setItem(
      'current_clicked_latest_check_in',
      event.target.latest_checkin
    );
    localStorage.setItem(
      'current_clicked_latest_check_out',
      event.target.latest_checkout
    );
    localStorage.setItem(
      'current_clicked_user_image',
      event.target.user_image
    );

    this.eventEmitter.userAttendenceModalEventEmitter.emit(true);
  }
  openInvitationSendModal() {
    this.eventEmitter.memberInviteEventEmitter.emit(true);
  }

  renderMember(){
    this.isMembers = true;
    this.isMedia = false;
    this.isDocs = false;
    this.isLinks = false;
    this.isImages = false;
  }
  renderMedia(){
    this.isMembers = false;
    this.isMedia = true;
    this.isDocs = false;
    this.isLinks = false;
    this.isImages = false;
  }

  renderDocs(){
    this.isDocs = true;
    this.isMembers = false;
    this.isMedia = false;
    this.isLinks = false;
    this.isImages = false;
  }

  renderLinks() {
    this.isLinks = true;
    this.isDocs = false;
    this.isMembers = false;
    this.isMedia = false;
    this.isImages = false;
  }

  renderImages() {
    this.isImages = true;
    this.isLinks = false;
    this.isDocs = false;
    this.isMembers = false;
    this.isMedia = false;
  }

  openArrivalMessageModal() {
    this.eventEmitterService.arrivalMessageEventEmitter.emit(true);
  }
 //
  async deleteTeam (){
    let data = localStorage.getItem('selectedTeam');
    this.TeamService.deleteTeam(data).subscribe(
      (response) => {
        if(response.success){
          this.router.navigate(['dashboard/home']);
        }else{
          console.log(response.message)
        }
      }
    )
  }
}
