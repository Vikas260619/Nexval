import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { createTeam } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { attendence } from 'src/app/interfaces/signup.interface';
import * as moment from 'moment';
import { $ } from 'protractor';

@Component({
  selector: 'app-sidebar-pane-black',
  templateUrl: './sidebar-pane-black.component.html',
  styleUrls: ['./sidebar-pane-black.component.scss'],
})
export class SidebarPaneBlackComponent implements OnInit {
  registerFormTeam: FormGroup;
  isTermsChecked: boolean = false;
  serverErrorMessage: string | null = null;
  returnUrl: string = '';
  inTime: string = '--:--';
  outTime: string = '--:--';
  lpArray = [];
  lpArrayOut = [];
  showTimeFirst: string = '--:--:--';
  showTimeSecond: string = '--:--';
  st: any;
  stBool: boolean = false;
  fullname: string = '';
  nameArr = [];
  currentLat: any;
  currentLon: any;
  profileImage: any;
  isProfilePage: boolean = false;

  //collaspe menu for support section
  SupportStream() {
    if (document.getElementById('IconCollegue3').classList.contains('active')) {
      document.getElementById('IconCollegue3').classList.remove('active');
    } else {
      document.getElementById('IconCollegue3').classList.add('active');
    }

    if (document.getElementById('CollegueDes3').classList.contains('active')) {
      document.getElementById('CollegueDes3').classList.remove('active');
    } else {
      document.getElementById('CollegueDes3').classList.add('active');
    }
  }

  muteStream() {
    if (document.getElementById('wrapper').classList.contains('sidebarHide')) {
      document.getElementById('wrapper').classList.remove('sidebarHide');
    } else {
      document.getElementById('wrapper').classList.add('sidebarHide');
    }

    if (
      document
        .getElementById('fixscroll')
        .classList.contains('fixscrollsidebarHide')
    ) {
      document
        .getElementById('fixscroll')
        .classList.remove('fixscrollsidebarHide');
    } else {
      document
        .getElementById('fixscroll')
        .classList.add('fixscrollsidebarHide');
    }
  }

  constructor(
    private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private eventEmitterService: EventEmitterService
  ) {
    this.registerFormTeam = new FormGroup({
      teamName: new FormControl(null, [
        this.customValidator.notOnlyNum(),
        this.customValidator.notOnlySpChar(),
        Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
      ]),
      desc: new FormControl(null, []),
    });
  }
  ngAfterViewInit() {
    this.eventEmitterService.sideBarEventEmitter.subscribe((_) => {
      this.isProfilePage = true;
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem('user-profile-image') != null ||
      localStorage.getItem('user-profile-image') != ''
    ) {
      this.profileImage = localStorage.getItem('user-profile-image');
    }
    this.eventEmitterService.imageCropSaveEventEmitter.subscribe((_) => {
      if (
        localStorage.getItem('user-profile-image') != null ||
        localStorage.getItem('user-profile-image') != ''
      ) {
        this.profileImage = localStorage.getItem('user-profile-image');
      }
      this.getFullName();
      this.getProfileImage();
    });
    this.getFullName();
    this.eventEmitterService.nameEventEmitter.subscribe((_) => {
      this.getFullName();
    });

    this.eventEmitterService.sideBarEventEmitter.subscribe((_) => {
      this.isProfilePage = true;
    });

    let data: string = 'D';
    this.authHttp.getPunch().subscribe(
      (response) => {
        if (response.success) {
          if (response.data[0]) {
            let address_in = response.data[0].address;
            localStorage.setItem('address_in', address_in);

            let latlong_in = response.data[0].latlong;
            let latlonArray = latlong_in.split(',');
            localStorage.setItem('lat_in', latlonArray[0]);
            localStorage.setItem('lon_in', latlonArray[1]);
            localStorage.setItem(
              'single_user_login_time',
              response.data[0].timestamp
            );
            const login_time = moment(response.data[0].timestamp);
            const localDate = moment(login_time).local();
            let local_time = localDate.format('lll');
            let inarr = local_time.split(' ');
            let dtString =
              inarr[1].replace(/,/, ' ') +
              ' ' +
              inarr[0] +
              ',' +
              ' ' +
              inarr[2].replace(/202/g, '2') +
              ' | ' +
              inarr[3] +
              ' ' +
              inarr[4] +
              ' ';
            this.inTime = dtString;

            this.lpArray = dtString.split('|');

            localStorage.setItem('current-user-login-time', this.inTime);
            localStorage.setItem(
              'current-user-login-timesplit',
              inarr[3] + ' ' + inarr[4]
            );
            localStorage.setItem(
              'current-user-login-datesplit',
              inarr[1].replace(/,/, ' ') + ' ' + inarr[0] + ',' + ' ' + inarr[2]
            );
            this.showTimeFirst = this.lpArray[0];
            this.showTimeSecond = this.lpArray[1];
            console.log('++++++++++' + this.showTimeSecond);
            this.st = ' In';
            this.stBool = false;

            if (response.data[1]) {
              let lgVar1 = moment(response.data[0].timestamp);
              let lgVar2 = moment(response.data[1].timestamp);

              if (lgVar1.isBefore(lgVar2)) {
                let address_out = response.data[1].address;
                localStorage.setItem('address_out', address_out);

                let latlong_out = response.data[1].latlong;
                let latlonArrayO = latlong_out.split(',');
                localStorage.setItem('lat_out', latlonArrayO[0]);
                localStorage.setItem('lon_out', latlonArrayO[1]);

                const logout_time = moment(response.data[1].timestamp);
                const localODate = moment(logout_time).local();
                let local_O_time = localODate.format('lll');

                let outarr = local_O_time.split(' ');
                let dtString =
                  outarr[1].replace(/,/, ' ') +
                  ' ' +
                  outarr[0] +
                  ',' +
                  ' ' +
                  outarr[2].replace(/202/g, '2') +
                  ' | ' +
                  outarr[3] +
                  ' ' +
                  outarr[4] +
                  ' ';
                this.outTime = dtString;
                this.lpArrayOut = dtString.split('|');
                this.showTimeFirst = this.lpArrayOut[0];
                this.showTimeSecond = this.lpArrayOut[1];
                console.log('++++++++++' + this.showTimeSecond);
                this.st = ' Out';
                this.stBool = true;
                localStorage.setItem('st', 'false');
                localStorage.setItem('current-user-logout-time', this.outTime);
                localStorage.setItem(
                  'current-user-logout-timesplit',
                  outarr[3].replace(/202/g, '2') + ' ' + outarr[4]
                );
                localStorage.setItem(
                  'current-user-logout-datesplit',
                  outarr[1].replace(/,/, ' ') +
                    ' ' +
                    outarr[0] +
                    ',' +
                    ' ' +
                    outarr[2].replace(/202/g, '2')
                );
              }
            }
            if (localStorage.getItem('lat_in') != null) {
              this.currentLat = Number(localStorage.getItem('lat_in'));
            }
            if (localStorage.getItem('lat_out') != null) {
              this.currentLat = Number(localStorage.getItem('lat_out'));
            }
            if (localStorage.getItem('lon_in') != null) {
              this.currentLon = Number(localStorage.getItem('lon_in'));
            }
            if (localStorage.getItem('lon_out') != null) {
              this.currentLon = Number(localStorage.getItem('lon_out'));
            }
          } else {
            this.lpArray[0] = '00:00:00';
            this.lpArray[1] = '00:00';
          }
        }
        console.log(this.st);
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
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
  getProfileImage() {
    if (localStorage.getItem('cropped-profile-image') != null) {
      this.profileImage = localStorage.getItem('cropped-profile-image');
    }
  }
  get registerFormControl() {
    return this.registerFormTeam.controls;
  }
  onSubmit() {
    if (this.registerFormTeam.invalid) {
      this.registerFormControl.teamName.markAsDirty();
      this.registerFormControl.desc.markAsDirty();
      this.isTermsChecked = false;
      return;
    }
    // let data: createTeam = {
    //   name: this.registerFormTeam.value.teamName,
    //   hierarchy_type: 'W7F+x+sPZUPsCAcXwYSH5Q==',
    //   desc: this.registerFormTeam.value.teamName,
    // };
    // this.authHttp.createTeam(data).subscribe(
    //   (response) => {
    //     if (response.success) {
    //       //  store data to local storage to process request in form two with same data
    //       //this.router.navigate([this.returnUrl]);
    //       this.serverErrorMessage = response.message;
    //       location.reload();
    //       this.registerFormTeam.reset();
    //     } else {
    //       this.serverErrorMessage = response.message;
    //       //location.reload();
    //     }
    //   },
    //   (_) => {
    //     this.serverErrorMessage = environment.errorMessage;
    //   }
    // );
  }
  onCheckboxChange(evt: boolean) {
    this.isTermsChecked = evt;
  }
  activate() {
    this.isTermsChecked = true;
  }
  openTeamCreateModal() {
    this.eventEmitterService.memberInviteEventEmitter.emit(true);
  }
  openUserAttendenceModal() {}
  openUserAttendence2Modal($event) {
    this.eventEmitterService.selfAttendenceModalEventEmitter.emit(true);
  }
  redirectMyProfile() {
    this.router.navigate(['/dashboard/my-profile']);
  }

  openCropModal() {
    this.eventEmitterService.imageCroppEventEmitter.emit(true);
  }
}
