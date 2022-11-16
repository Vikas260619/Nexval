import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { teamList } from 'src/app/interfaces/signup.interface';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  teamListData: any;
  currentTeam: string;
  userRole: string;
  firstTeam: any;
  selectedTeam: boolean = true;

  //collaspe menu
  teamStream() {
    if (document.getElementById('IconCollegue2').classList.contains('active')) {
      document.getElementById('IconCollegue2').classList.remove('active');
    } else {
      document.getElementById('IconCollegue2').classList.add('active');
    }

    if (document.getElementById('CollegueDes2').classList.contains('active')) {
      document.getElementById('CollegueDes2').classList.remove('active');
    } else {
      document.getElementById('CollegueDes2').classList.add('active');
    }
  }

  constructor(
    private store: StoreService,
    private authHttp: AuthHttpService,
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) {
    this.userRole = this.store.getUserRole();
  }

  data: any = {
    attendance_date: this.formatDate(),
    offset: 0,
    limit: '300',
    userlimit: '3',
  };
  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  ngAfterViewInit() {
    //this.currentTeam = this.store.getTeamFromLocal();
  }
  ngOnInit(): void {
    this.eventEmitterService.bckCollabEventEmitter.subscribe((_) => {
      this.authHttp.getTeamList(this.data).subscribe(
        (response) => {
          this.teamListData = response.data;
          this.currentTeam = '';
          this.selectedTeam = false;
        },
        (error) => {
          //this.isSubmitFormLoading = false;
        }
      );
    });
    this.eventEmitterService.TeamEventEmitter.subscribe((_) => {
      this.getTeam();
    });
    this.eventEmitterService.colleagueToTeamEventEmitter.subscribe((_) => {
      this.currentTeam = '';
      this.getTeam();
    });
    this.getTeam();

    this.eventEmitterService.homeEmitter.subscribe((_) => {
      this.currentTeam = '';
      this.getTeam();
      this.selectedTeam = false;
      console.log('tertetertetertetttetr', this.selectedTeam);
    });
  }

  getTeam() {
    //console.log( localStorage.getItem('page'));
    if (
      localStorage.getItem('page') == null &&
      localStorage.getItem('page') == 'colab'
    ) {
      this.currentTeam = this.store.getTeamFromLocal();
    }
    //this.currentTeam = this.store.getTeamFromLocal();
    this.authHttp.getTeamList(this.data).subscribe(
      (response) => {
        this.teamListData = response.data;
        localStorage.setItem('teamcount', this.teamListData.length);
        localStorage.setItem('teams', JSON.stringify(this.teamListData));
        if (localStorage.getItem('selectedTeam') == null) {
          if (response.data[0]) {
            this.firstTeam = response.data[0];
            this.selectTeamFirstTime(
              this.firstTeam.id,
              this.firstTeam.name,
              this.firstTeam.sendbird_team_details['application_id'],
              this.firstTeam.sendbird_team_details['channel_url'],
              this.firstTeam.desc
            );
          }
        }
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }

  openTeamCreateModal() {
    this.eventEmitterService.addTeamEventEmitter.emit(true);
  }
  selectTeamFirstTime(
    team_id: any,
    name: any,
    application_id: any,
    channel_url: any,
    desc: any
  ) {
    if (localStorage.getItem('selectedColleague') == null) {
      localStorage.setItem('selectedTeam', team_id);
      localStorage.setItem('selectedTeamName', name);
      localStorage.setItem('selectedTeamDescription', desc);
      localStorage.setItem('application_id', application_id);
      localStorage.setItem('channel_url', channel_url);
      this.eventEmitterService.colleagueSnap.emit(true);
      this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
      this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
      this.currentTeam = this.store.getTeamFromLocal();
      this.router.navigate(['dashboard/team-collab']);
    }
  }
  selectTeam(event) {
    console.log(event.target.id);
    localStorage.removeItem('selectedColleague');
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;

    localStorage.setItem('selectedTeam', event.target.id);
    localStorage.setItem('selectedTeamName', event.target.name);
    localStorage.setItem('selectedTeamUsers', event.target.userInfo);
    localStorage.setItem('selectedTeamDescription', event.target.desc);
    localStorage.setItem('application_id', event.target.application_id);
    localStorage.setItem('channel_url', event.target.channel_url);
    this.eventEmitterService.colleagueSnap.emit(true);
    this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
    this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
    this.eventEmitterService.emitForceUpdate();
    this.currentTeam = this.store.getTeamFromLocal();
    this.router.navigate(['dashboard/team-collab']);
  }
  selectTeamCircle(id, name, desc, app_id, ch) {
    //console.log(event.target.id);
    localStorage.removeItem('selectedColleague');
    // var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = id;

    localStorage.setItem('selectedTeam', id);
    localStorage.setItem('selectedTeamName', name);
    localStorage.setItem('selectedTeamDescription', desc);
    localStorage.setItem('application_id', app_id);
    localStorage.setItem('channel_url', ch);
    this.eventEmitterService.colleagueSnap.emit(true);
    this.eventEmitterService.collabTypeTeamEventEmitter.emit(true);
    this.eventEmitterService.teamToColleagueEventEmitter.emit(true);
    this.eventEmitterService.emitForceUpdate();
    this.currentTeam = this.store.getTeamFromLocal();
    this.router.navigate(['dashboard/team-collab']);
  }

  excerpt(str: string) {
    let len = str.length;
    let subString: string = '';
    if (len > 19) {
      subString = str.substring(0, 20);
      subString = subString + ' ...';
    } else {
      subString = str;
    }
    return subString;
  }
}
