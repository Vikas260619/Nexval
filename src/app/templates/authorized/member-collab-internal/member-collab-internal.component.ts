import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-collab-internal',
  templateUrl: './member-collab-internal.component.html',
  styleUrls: ['./member-collab-internal.component.scss'],
})
export class MemberCollabInternalComponent implements OnInit {
  collabChat: any;
  isImages: boolean = false;
  isMedia: boolean = true;
  isDocs: boolean = true;
  isLinks: boolean = false;
  memberCheckin: any;
  memberCheckinDateTime: any;
  selectedUserName: any;
  designation: any;
  activeUser: any;
  userEmail: any;
  userProfile: any;
  currentUserLoginDate: any;
  currentUserLoginTime: any;
  constructor() {}

  ngOnInit(): void {
    this.collabChat = JSON.parse(localStorage.getItem('collab-chat'));
    let allUsers = JSON.parse(localStorage.getItem('all_users'));
    let selectedUser = localStorage.getItem('selectedTeamName');
    

    this.activeUser = allUsers.filter(el => el.sendbird_user_details.nickname === selectedUser);
    console.log('dheeraj',this.activeUser)
    this.memberCheckin = this.activeUser.length > 0 ? this.activeUser[0].latest_punch_type:null;
    this.selectedUserName = this.activeUser.length > 0 && this.activeUser[0].sendbird_user_details.nickname != '' ? this.activeUser[0].sendbird_user_details.nickname : '';
    this.designation = this.activeUser.length > 0 && this.activeUser[0].role_name != null ? this.activeUser[0].role_name : 'Member'
    this.userEmail = this.activeUser.length > 0 && this.activeUser[0].email != '' ? this.activeUser[0].email : '';
    this.userProfile = this.activeUser.length > 0 && this.activeUser[0].userpicture_original != '' && this.activeUser[0].userpicture_original != null && this.activeUser[0].userpicture_original != undefined ? this.activeUser[0].userpicture_original : '';
    this.currentUserLoginDate = localStorage.getItem('current-user-login-datesplit');
    this.currentUserLoginTime = localStorage.getItem('current-user-login-timesplit');
    this.memberCheckinDateTime = this.activeUser.length > 0 ? this.activeUser[0].latest_punch_time : null;
  }

  getShortName(fullName) {
    const splitFullName = fullName.split(' ')
    const intials = splitFullName.shift().charAt(0) + splitFullName.pop().charAt(0);
      return intials.toUpperCase();
  }

  renderMedia() {
    this.isMedia = true;
    this.isDocs = false;
    this.isLinks = false;
    this.isImages = false
  }
  
  renderDocs(){
    this.isDocs = true;
    this.isMedia = false;
    this.isLinks = false;
    this.isImages = false;
  }

  renderLinks() {
    this.isLinks = true;
    this.isDocs = false;
    this.isMedia = false;
    this.isImages = false;
  }

  renderImages() {
    this.isImages = true;
    this.isLinks = false;
    this.isDocs = false;
    this.isMedia = false;
  }
}
