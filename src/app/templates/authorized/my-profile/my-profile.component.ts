import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  fullname: string = '';
  nameArr = [];
  email: string = '';
  profileImage: any = '';
  constructor(
    private eventEmitter: EventEmitterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventEmitter.sideBarEventEmitter.emit(true);
    if (localStorage.getItem('user-profile-image') != null) {
      this.profileImage = localStorage.getItem('user-profile-image');
    }
    this.eventEmitter.imageCropSaveEventEmitter.subscribe((_) => {
      this.getProfileImage();
    });
    
    this.getFullName();
    this.email = localStorage.getItem('user-email');
  }
  getProfileImage() {
    if (localStorage.getItem('user-profile-image') != null) {
      this.profileImage = localStorage.getItem('user-profile-image');
    }
  }
  getFullName() {
    this.nameArr = localStorage.getItem('fullname').split(' ');
    this.fullname =
      this.nameArr[0].charAt(0).toUpperCase() +
      this.nameArr[0].slice(1) +
      ' ' +
      this.nameArr[1].charAt(0).toUpperCase() +
      this.nameArr[1].slice(1);
  }
  openCropModal() {
    this.eventEmitter.imageCroppEventEmitter.emit(true);
  }

  goBack() {
    this.eventEmitter.emitBckCollab();

    this.router.navigate(['dashboard/team-collab']);
  }
}
