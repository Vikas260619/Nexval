import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subscription, interval  } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { createTeam } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { attendence } from 'src/app/interfaces/signup.interface';
import * as moment from 'moment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ArrivalMessageService } from 'src/app/service/arrival-message.services';
import { addArrivalMessage } from 'src/app/interfaces/arrival-message.interface'

@Component({
  selector: 'app-sidebar-pane-allcollab',
  templateUrl: './sidebar-pane-allcollab.component.html',
  styleUrls: ['./sidebar-pane-allcollab.component.scss']
})
export class SidebarPaneAllcollabComponent implements OnInit {

  @Input()
  allCollab: any;
  registerFormTeam: FormGroup;
  isTermsChecked: boolean = false;
  serverErrorMessage: string | null = null;
  updateSubscription: Subscription;
  updateSubscriptionPunch: Subscription;
  returnUrl: string = '';
  inTime: string = '--:--';
  outTime: string = '--:--';
  lpArray = [];
  lpArrayOut = [];
  showTimeFirst: string = '- - : - - : - - ';
  showTimeSecond: string = '--:--';
  st: any;
  stBool: boolean = false;
  fullname: string = '';
  nameArr = [];
  currentLat: any;
  currentLon: any;
  profileImage1: any;
  isProfilePage: boolean = false;
  userRole:string='';
  userId: string = '';
  arrivalMessages: string = '';
  inputChange: boolean = false;
  alphabateValidator: boolean = false;
  removeValidator: boolean = false;
  chatBoard: any;
  isChatEmpty: boolean = false;
  allCollabUsers: any = [];
  page:string='';

  
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

  //dropdown to give the feedback by dropdown
    showDrop() {
      if (document.getElementById('showingDropdown').classList.contains('active')) {
        document.getElementById('showingDropdown').classList.remove('active');
      } else {
        document.getElementById('showingDropdown').classList.add('active');
      }
    }

    showDropmini() {
      if (document.getElementById('dropMini').classList.contains('active')) {
        document.getElementById('dropMini').classList.remove('active');
      } else {
        document.getElementById('dropMini').classList.add('active');
      }
    }

    specilInput() {
      if (document.getElementById('spclInput').classList.contains('active')) {
        document.getElementById('spclInput').classList.remove('active');
      } else {
        document.getElementById('spclInput').classList.add('active');
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
    private arrivalMessage: ArrivalMessageService,
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
    this.allCollabUsers = JSON.parse(localStorage.getItem('memberList'));
    //console.log(this.allCollabUsers.length)
    this.eventEmitterService.sideBarEventEmitter.subscribe((_) => {
      this.isProfilePage = true;
    });
    if (
      localStorage.getItem('user-profile-pic-thumb') != null ||
      localStorage.getItem('user-profile-pic-thumb') != ''
    ) {
      this.profileImage1 = localStorage.getItem('user-profile-pic-thumb');
      //console.log(">>>>>>>>>>>>>>>>>>>>>OOOOOOO"+this.profileImage);
    }
    this.userId = localStorage.getItem('id')
    this.removeValidator = false;
  }
  
  toDataURL = async (url) => {
    console.log("Downloading image...");
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })

    return result
  };
  ngOnInit() {
    this.page=localStorage.getItem('page')
    this.allCollabUsers = JSON.parse(localStorage.getItem('memberList'));
    this.userRole=localStorage.getItem('user-role');
    if (
      localStorage.getItem('user-profile-pic-thumb') != null ||
      localStorage.getItem('user-profile-pic-thumb') != ''
    ) {
      this.profileImage1 = localStorage.getItem('user-profile-pic-thumb');
    }
    this.eventEmitterService.imageCropSaveEventEmitter.subscribe((_) => {
      if (
        localStorage.getItem('user-profile-pic-thumb') != null ||
        localStorage.getItem('user-profile-pic-thumb') != ''
      ) {
        this.profileImage1 = localStorage.getItem('user-profile-pic-thumb');
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
    this.eventEmitterService.LoginEventEmitter.subscribe((_) => {
      this.profileImage1 = localStorage.getItem('user-profile-pic-thumb');
    });
    this.updateSubscription = interval(6000).subscribe(
      (val) => { 
        this.fectchLoginData();
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
            const login_time = moment.utc(response.data[0].timestamp).local();
            const localDate = login_time;
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
            //console.log('++++++++++' + this.showTimeSecond);
            this.st = ' In';
            this.stBool = true;

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

                const logout_time = moment.utc(response.data[1].timestamp).local();
                const localODate = logout_time;
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
                //console.log('++++++++++' + this.showTimeSecond);
                this.st = ' Out';
                this.stBool = false;
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
        //console.log(this.st);
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
    this.updateSubscriptionPunch= interval(6000).subscribe(
      (val) => { 
        this.fetchLatestPunchData();
      });
    this.userId = localStorage.getItem('id')
  }
  fetchLatestPunchData(){
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
           // const login_time = moment(response.data[0].timestamp);
            const login_time = moment.utc(response.data[0].timestamp).local();
            const localDate = login_time;
            let local_time = localDate.format('lll');
            //console.log(""+local_time);
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
            //console.log('++++++++++' + this.showTimeSecond);
            this.st = ' In';
            this.stBool = true;
            localStorage.setItem('st', 'true');
            
            if (response.data[1]) {
              let lgVar1 = moment.utc(response.data[0].timestamp).local();
              let lgVar2 = moment.utc(response.data[1].timestamp).local();

              if (lgVar1.isBefore(lgVar2)) {
                let address_out = response.data[1].address;
                localStorage.setItem('address_out', address_out);

                let latlong_out = response.data[1].latlong;
                let latlonArrayO = latlong_out.split(',');
                localStorage.setItem('lat_out', latlonArrayO[0]);
                localStorage.setItem('lon_out', latlonArrayO[1]);

                const logout_time = moment.utc(response.data[1].timestamp).local();
                const localODate = logout_time;
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
                //console.log('++++++++++' + this.showTimeSecond);
                this.st = ' Out';
                this.stBool = false;
                localStorage.setItem('st', 'false');
                //console.log("--------------False");
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
        //console.log(this.st);
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }
  fectchLoginData(){
    this.authHttp.loginDataRefresh().subscribe(
      (response)=>{
        localStorage.setItem("user-profile-pic",response.data['userpicture_original'].replace('http://','https://'));
        localStorage.setItem("user-profile-pic-thumb",response.data['userpicture'].replace('http://','https://'));
        let imageSrcString:any =  this.toDataURL(localStorage.getItem("user-profile-pic").replace('http://','https://')).then(meta => {
        let data:any=meta;
          localStorage.setItem("user-profile-pic",data); // {"metadata": "for: test.png"}
          //this.eventEmitterService.imageCropSaveEventEmitter.emit(true);
        });
        let imageSrcStringSmall:any =  this.toDataURL(localStorage.getItem("user-profile-pic-thumb").replace('http://','https://')).then(meta => {
        let data:any=meta;
          localStorage.setItem("user-profile-pic-thumb",data); // {"metadata": "for: test.png"}
          //this.eventEmitterService.imageCropSaveEventEmitter.emit(true);
          this.eventEmitterService.LoginEventEmitter.emit(true);
        });
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    )
  }

  getFullName() {
    
        this.nameArr = localStorage.getItem('fullname').split(' ');
    let fvar='';
    let lvar='';

    if(this.nameArr[0]==='null'){
      fvar = '---'
    }else{
      fvar = this.nameArr[0];
    }
    if(this.nameArr[1]==='null'){
      lvar = '---'
    }else{
      lvar = this.nameArr[1];
    }
    this.fullname =
    fvar.charAt(0).toUpperCase() +
    fvar.slice(1) +
      ' ' +
      lvar.charAt(0).toUpperCase() +
      lvar.slice(1);
  }
  getProfileImage() {
    if (localStorage.getItem('cropped-profile-image') != null) {
      this.profileImage1 = localStorage.getItem('cropped-profile-image');
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


  emptyCollab(){
    this.router.navigate(['dashboard/members-collab']);
    this.chatBoard = JSON.parse(localStorage.getItem('all_users'))
    this.isChatEmpty = true;
    this.allCollab = true;
  }

  openCropModal() {
    this.eventEmitterService.imageCroppEventEmitter.emit(true);
  }
  openArrivalMessageModal() {
    this.eventEmitterService.arrivalMessageEventEmitter.emit(true);
  }
  goHome(){
    this.router.navigate(['./dashboard/home']).then(() => {
      if(localStorage.getItem('user-role')=='SUPERADMIN'){
      window.location.reload();
      }
   });
  }
}
