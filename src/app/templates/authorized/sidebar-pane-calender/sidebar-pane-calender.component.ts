import { Component, OnInit,ViewChild,HostListener,Renderer2,ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { createTeam } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { Observable,Subscription, interval  } from 'rxjs';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { attendence } from 'src/app/interfaces/signup.interface';
import * as moment from 'moment';
import { MatCalendar } from '@angular/material/datepicker';
import { $ } from 'protractor';
import { ArrivalMessageService } from 'src/app/service/arrival-message.services';
import { addArrivalMessage } from 'src/app/interfaces/arrival-message.interface'

@Component({
  selector: 'app-sidebar-pane-calender',
  templateUrl: './sidebar-pane-calender.component.html',
  styleUrls: ['./sidebar-pane-calender.component.scss']
})

export class SidebarPaneCalenderComponent implements OnInit {
  @ViewChild('cal2', {static: false}) calendar: MatCalendar<Date>;
  @ViewChild('scrollBottom') private scrollBottom: ElementRef;
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
  selectedCal:string='cal2';
  arrivalMessages: string = '';
  inputChange: boolean = false;
  alphabateValidator: boolean = false;
  removeValidator: boolean = false;
  chatBoard: any;
  isChatEmpty: boolean = false;
  allCollabUsers: any = [];
  userId: string = '';
  maxDate:any;
  allCollab: any;
  page:string='';

  public selectedDate: Date = new Date();
  public firstDay:Date = new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(), 1);
  public lastDay:Date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
  public nextMonthDate:Date = new Date();
  

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

  @HostListener('click', ['$event'])
  onClick(event: any) {
    // get the clicked element
    if (event.target.ariaLabel && event.target.ariaLabel.includes("Previous month")) {
     
      //console.log(event.target.date);
      let start_d = new Date(localStorage.getItem('filter-start-date'));   
       
      start_d.setMonth(start_d.getMonth() -1)
     // this.selectedDate.setDate(start_d.getDate()-30);
     this.selectedDate.setMonth(start_d.getMonth()-1);
      localStorage.setItem('filter-start-date',formatDate(start_d, 'yyyy-MM-dd', 'en').toString());
       let lstDay = new Date(start_d.getFullYear(), start_d.getMonth() + 1, 0);
       localStorage.setItem('filter-end-date',formatDate(lstDay, 'yyyy-MM-dd', 'en').toString());
       //console.log("++++++++++++++++++"+this.selectedDate.toLocaleString('default', { month: 'long' }))
       if(this.selectedDate.getMonth()==2){
         console.log("++++++++++++++++++","FEB");
         let nDays= this.daysInMonth(this.selectedDate.getMonth(),this.selectedDate.getFullYear());
         //console.log("##########################",nDays);
         this.nextMonthDate.setDate(this.selectedDate.getDate()-30);
         this.calendar._goToDateInView(this.nextMonthDate, "month")
       }else{
          this.nextMonthDate.setMonth(this.nextMonthDate.getMonth()-1);
          this.calendar._goToDateInView(this.nextMonthDate, "month")
       }
       console.log(this.nextMonthDate);
       let dte = start_d;
       let mn = dte.getMonth();
       let year = dte.getFullYear();
       let dates:any=this.getDayNamesInMonth(mn,year);
       let day = new Date(start_d).getDay();
       localStorage.setItem('first-day-selected-month', day.toString());
       localStorage.setItem('dates-in-month', dates);
       this.eventEmitterService.attEventEventEmitter.emit(true);
    } else if (event.target.ariaLabel && event.target.ariaLabel.includes("Next month")) {
      
      let start_d = new Date(localStorage.getItem('filter-start-date'));  
      localStorage.setItem('prev-start-date',formatDate(start_d, 'yyyy-MM-dd', 'en').toString());
      //this.selectedDate=this.30start_d.getDate()-30;     
      //localStorage.setItem('filter-start-date',)
      start_d.setMonth(start_d.getMonth() +1)
      this.selectedDate.setMonth(start_d.getMonth()+1);
      //this.selectedDate=new Date(start_d.getDate()+30)
      localStorage.setItem('filter-start-date',formatDate(start_d, 'yyyy-MM-dd', 'en').toString());
      let lstDay = new Date(start_d.getFullYear(), start_d.getMonth() + 1, 0);
      localStorage.setItem('filter-end-date',formatDate(lstDay, 'yyyy-MM-dd', 'en').toString());
      //console.log("++++++++++++++++++",this.selectedDate.getMonth());
      //console.log("++++++++++++++++++"+this.selectedDate.toLocaleString('default', { month: 'long' }))
      if(this.selectedDate.getMonth()==2){
        //console.log("++++++++++++++++++","FEB");
        let nDays= this.daysInMonth(this.selectedDate.getMonth(),this.selectedDate.getFullYear());
        //console.log("##########################",nDays);
        //this.nextMonthDate.setMonth(this.nextMonthDate.getMonth()+1);
        this.nextMonthDate.setDate(this.selectedDate.getDate()+30);
        this.calendar._goToDateInView(this.nextMonthDate, "month")
      }else{
        this.nextMonthDate.setMonth(this.nextMonthDate.getMonth()+1);
        this.calendar._goToDateInView(this.nextMonthDate, "month")
      }

      let dte = start_d;
      let mn = dte.getMonth();
      let year = dte.getFullYear();
      let dates:any=this.getDayNamesInMonth(mn,year);
      let day = new Date(start_d).getDay();
       localStorage.setItem('first-day-selected-month', day.toString());
      localStorage.setItem('dates-in-month', dates);
      
      this.eventEmitterService.attEventEventEmitter.emit(true);
      
      console.log('next');
    }
  }
  sDate: any
  logMonth($event: any) {
    this.sDate = $event
    //console.log($event)
  }
  constructor(
    private authHttp: AuthHttpService,
    private arrivalMessage: ArrivalMessageService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private eventEmitterService: EventEmitterService,
   private renderer: Renderer2,
   private cdr: ChangeDetectorRef
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
    //this.maxDate = new Date(this.lastDay);
   // this.scrollToBottom();
   this.maxDate=new Date(new Date(this.lastDay).setMonth(new Date().getMonth() + 2))
    this.eventEmitterService.sideBarEventEmitter.subscribe((_) => {
      this.isProfilePage = true;
    });
    //console.log('view init');
    const monthPrevBtn = document.querySelectorAll(
      '.mat-calendar-previous-button'
    );
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
    if (monthPrevBtn) {
      Array.from(monthPrevBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event) => {
          //handle month change
         // console.log("::::::::::::::::::::::::::::"+this.selectedDate.getMonth());
          
        });
      });
      if (monthNextBtn) {
        Array.from(monthNextBtn).forEach((button) => {
          this.renderer.listen(button, 'click', (event) => {
            //handle month change
        
          });
        });
      }
    }
    this.nextMonthDate.setMonth(this.nextMonthDate.getMonth()-1);
    this.calendar._goToDateInView(this.nextMonthDate, "month")
   
    if(localStorage.getItem('current-cal')==null){
      localStorage.setItem('current-cal','cal2')
    }else{
      this.selectedCal=localStorage.getItem('current-cal');
    }
    this.cdr.detectChanges();
    let day = new Date().getDay();
    localStorage.setItem('first-day-selected-month', day.toString());
  }

  ngOnInit() {
    if(localStorage.getItem('current-cal')==null){
      this.selectedCal='cal2'
    }else{
      this.selectedCal=localStorage.getItem('current-cal');
    }
  
    this.page=localStorage.getItem('page')
    //this.maxDate = new Date(this.lastDay);
    this.maxDate=new Date(new Date(this.lastDay).setMonth(new Date().getMonth() + 2))
    //this.scrollToBottom();
    if(localStorage.getItem('filter-start-date')==null){
    localStorage.setItem('filter-start-date',formatDate(this.firstDay, 'yyyy-MM-dd', 'en').toString());
    localStorage.setItem('filter-end-date',formatDate(this.lastDay, 'yyyy-MM-dd', 'en').toString());
    
    let today = new Date();
    let month = today.getMonth();
    let getDaysInMonth = this.daysInMonth(month + 1, today.getFullYear());
    localStorage.setItem('days-in-month', getDaysInMonth.toString());
    }
    console.log(this.nextMonthDate);
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
            localStorage.setItem('st', 'true');

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


  daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
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

  selectCal(e,val,dt){
 
   if(!e.target.ariaLabel || !e.target.ariaLabel.includes("Previous month") && !e.target.ariaLabel.includes("Next month")){
   // dt=this.selectedDate;
   //console.log("}}}}}}}}}}}}}}}}}}}}}}}",dt);
    let fDay:Date = new Date(dt.getFullYear(),dt.getMonth(), 1);
    let lDay:Date = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    localStorage.setItem('prev-start-date',formatDate(fDay, 'yyyy-MM-dd', 'en').toString());
    localStorage.setItem('filter-start-date',formatDate(fDay, 'yyyy-MM-dd', 'en').toString());
    localStorage.setItem('filter-end-date',formatDate(lDay, 'yyyy-MM-dd', 'en').toString());
    localStorage.setItem('current-cal',val);
   // let today = formatDate(fDay, 'yyyy-MM-dd', 'en');
    let month = fDay.getMonth();
    let getDaysInMonth = this.daysInMonth(month + 1, fDay.getFullYear());
    localStorage.setItem('days-in-month', getDaysInMonth.toString());
    let dte = fDay;
    let mn = dte.getMonth();
    let year = dte.getFullYear();
    let dates:any=this.getDayNamesInMonth(mn,year);
    let day = new Date(fDay).getDay();
    localStorage.setItem('first-day-selected-month', day.toString());
    localStorage.setItem('dates-in-month', dates);
    this.selectedCal=val
    this.eventEmitterService.attEventEventEmitter.emit(true);
   }else{
    dt=this.selectedDate;
    localStorage.setItem('first-day-selected-month', dt.toString());
    let dte = dt;
    let mn = dte.getMonth();
    let year = dte.getFullYear();
    let dates:any=this.getDayNamesInMonth(mn,year);
    localStorage.setItem('dates-in-month', dates);
   }
  }
  selectCalN(e,val,dt){
 
    if(!e.target.ariaLabel || !e.target.ariaLabel.includes("Previous month") && !e.target.ariaLabel.includes("Next month")){
    // dt=this.selectedDate;
    let prev=localStorage.getItem('prev-start-date');
    var d=new Date(prev);
    d.setMonth(d.getMonth() +1);
    //console.log("}}}}}}}}}}}}}}}}}}}}}}}",d);
    dt=d;
    //dt.setMonth(dt.getMonth() +1);
     let fDay:Date = new Date(dt.getFullYear(),dt.getMonth(), 1);
     let lDay:Date = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
     localStorage.setItem('filter-start-date',formatDate(fDay, 'yyyy-MM-dd', 'en').toString());
     localStorage.setItem('filter-end-date',formatDate(lDay, 'yyyy-MM-dd', 'en').toString());
     localStorage.setItem('current-cal',val);
    // let today = formatDate(fDay, 'yyyy-MM-dd', 'en');
     let month = fDay.getMonth();
     let getDaysInMonth = this.daysInMonth(month + 1, fDay.getFullYear());
     localStorage.setItem('days-in-month', getDaysInMonth.toString());
     let dte = fDay;
     let mn = dte.getMonth();
     let year = dte.getFullYear();
     let dates:any=this.getDayNamesInMonth(mn,year);
     let day = new Date(fDay).getDay();
     localStorage.setItem('first-day-selected-month', day.toString());
     localStorage.setItem('dates-in-month', dates);
     this.selectedCal=val
     this.eventEmitterService.attEventEventEmitter.emit(true);
    }else{
     dt=this.selectedDate;
     localStorage.setItem('first-day-selected-month', dt.toString());
     let dte = dt;
     let mn = dte.getMonth();
     let year = dte.getFullYear();
     let dates:any=this.getDayNamesInMonth(mn,year);
     localStorage.setItem('dates-in-month', dates);
    }
   }

  async getArrivalMessage (){
    this.removeValidator = true;
    //console.log(this.removeValidator)
    let data: any = {}
    this.arrivalMessage.getArrivalMessage(data).subscribe(
      (response) => {
        this.arrivalMessages = response.data[0].arrival_msg;
        this.userId = response.data[0].id;
      }
    )
  }

  changeInput (){
    this.inputChange = true
    this.removeValidator = true
    //console.log(this.removeValidator)
  }
  

  async addArrivalMessage () {
    let data: addArrivalMessage = {
      id: this.arrivalMessages != "" ? this.userId : "",
      arrival_msg: this.arrivalMessages.trim(),
    };
    //console.log(data)

    this.arrivalMessage.addArrivalMessage(data).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }

  alphabateOnly (e: any) {  // Accept only alpha numerics, not special characters 
    var inp = String.fromCharCode(e.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z ]/.test(inp)) {
      this.alphabateValidator = false;
      return true;
    } else {
      e.preventDefault();
      this.alphabateValidator = true;
      return false;
    }
  }

  removeValidatorFun(){
    this.removeValidator = false;
    this.alphabateValidator = false;
    this.getArrivalMessage()
    //console.log(this.removeValidator)
   }

  getDayNamesInMonth(month, year) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(formatDate(date, 'yyyy-MM-dd', 'en').toString());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  scrollToBottom(): void {
        try {
            //this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
        } catch(err) { }
    }
    emptyCollab(){
      this.router.navigate(['dashboard/members-collab']);
      this.chatBoard = JSON.parse(localStorage.getItem('all_users'))
      this.isChatEmpty = true;
      this.allCollab = localStorage.setItem('allCollab', 'true');
    }
    openCropModal() {
      this.eventEmitterService.imageCroppEventEmitter.emit(true);
    }
    openArrivalMessageModal() {

      this.eventEmitterService.arrivalMessageEventEmitter.emit(true);
  
    }
    goBack() {
      this.eventEmitterService.emitBckCollab();
      this.router.navigate(['dashboard/home']);
    }
    goHome(){
      this.router.navigate(['./dashboard/home']).then(() => {
        if(localStorage.getItem('user-role')=='SUPERADMIN'){
          window.location.reload();
        }
       
     });
    }
}
