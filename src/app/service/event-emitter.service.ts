import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  memberInviteEventEmitter = new EventEmitter<boolean>();
  addTeamEventEmitter = new EventEmitter<boolean>();
  TeamEventEmitter = new EventEmitter();
  addForceUpadate = new EventEmitter();
  colleagueEventEmitter = new EventEmitter();
  messagePostEventEmitter = new EventEmitter();
  listMessagePost = new EventEmitter();
  userAttendenceModalEventEmitter = new EventEmitter<boolean>();
  selfAttendenceModalEventEmitter = new EventEmitter<boolean>();
  collabTypeEventEmitter = new EventEmitter<boolean>();
  collabTypeTeamEventEmitter = new EventEmitter<boolean>();
  teamToColleagueEventEmitter = new EventEmitter<boolean>();
  colleagueToTeamEventEmitter = new EventEmitter<boolean>();
  colleagueSnap = new EventEmitter<boolean>();
  bckCollabEventEmitter = new EventEmitter();
  colleagueInviteEventEmitter = new EventEmitter<boolean>();
  nameEventEmitter = new EventEmitter<boolean>();
  homeEmitter = new EventEmitter<boolean>();
  imageCroppEventEmitter = new EventEmitter<boolean>();
  imageCropSaveEventEmitter = new EventEmitter<boolean>();
  sideBarEventEmitter = new EventEmitter<boolean>();
  imageuploadPopupEventEmitter = new EventEmitter();
  memberInvCloseEventEmitter = new EventEmitter();
  colleagueInvCloseEventEmitter = new EventEmitter();
  getLinkEventEmitter = new EventEmitter<boolean>();
  colleagueSnap2 = new EventEmitter<boolean>();
  singleMapModalEventEmitter = new EventEmitter<boolean>();
  attEventEventEmitter=new EventEmitter<boolean>();
  bckCollabCollegueEventEmitter = new EventEmitter();
  arrivalMessageEventEmitter = new EventEmitter<boolean>();
  InvEventEmitter = new EventEmitter<boolean>();
  InvEventEmitter2 = new EventEmitter<boolean>();
  LoginEventEmitter = new EventEmitter<boolean>();
 InviteMemberEmitter = new EventEmitter<boolean>();
 allColabSelfEmitter = new EventEmitter<boolean>();

  constructor() {}

  emitAddTeamEvent() {
    this.TeamEventEmitter.emit();
  }
  emitForceUpdate() {
    this.addForceUpadate.emit();
  }
  emitColleagueList() {
    this.colleagueEventEmitter.emit();
  }
  emitMessageList() {
    this.messagePostEventEmitter.emit();
  }
  emitPostList() {
    this.listMessagePost.emit();
  }

  emitBckCollab() {
    this.bckCollabEventEmitter.emit();
  }
  emitProfileImageUpload() {
    this.imageuploadPopupEventEmitter.emit();
  }
  emitBckCollabCollegue() {
    console.log('calledd')
    this.bckCollabCollegueEventEmitter.emit();
  }
}
