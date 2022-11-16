import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormatTimestampDatePipe } from 'src/app/pipes/format-timestamp-date.pipe';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-loggedin-user-attendence',
  templateUrl: './loggedin-user-attendence.component.html',
  styleUrls: ['./loggedin-user-attendence.component.scss'],
  providers: [FormatTimestampDatePipe, FormatTimestampTimePipe],
})
export class LoggedinUserAttendenceComponent implements OnInit {
  modalObj: Modal | null = null;
  subscriptionObj: Subscription | null;
  inTime: string = '00:00';
  outTime: string = '00:00';
  inDate: string = '00:00';
  outDate: string = '00:00';
  latIn: any;
  lonIn: any;
  addIn: string = '';
  src1: string = '';
  latOut: any;
  lonOut: any;
  addOut: string = '';
  src2: string = '';
  current_clicked_user_name: string = '';
  current_clicked_user_lname: string = '';
  fullName1: string = '';
  fullName: string = '';
  punchType: string;
  st: string = null;
  latestCheckin: string = '';
  latestCheckout: string = '';
  imageUrl:string='';

  constructor(private eventEmitterService: EventEmitterService) {}
  ngAfterViewInit(): void {
    this.modalObj = new Modal(this.userAttModalEle?.nativeElement);
  }
  ngOnInit(): void {
    if(localStorage.getItem('current_clicked_user_image' )!=null){
      this.imageUrl = localStorage.getItem('current_clicked_user_image' );
    }
    if (localStorage.getItem('st') != null) {
      this.st = localStorage.getItem('st');
    }
    this.punchType = localStorage.getItem('current_clicked_punch_type');
    let count: number = 0;
    this.subscriptionObj =
      this.eventEmitterService.userAttendenceModalEventEmitter.subscribe(
        (status) => {
          console.log('Hi..u');
          if (status) this.openUserAttendenceModal();
        }
      );

    let loginTime = localStorage.getItem('current-user-login-timesplit');
    if (loginTime != null) {
      this.inTime = loginTime;
    }

    let loginDate = localStorage.getItem('current-user-login-datesplit');

    if (loginDate != null) {
      this.inDate = loginDate.replace(/202/g, '2');
    }
    let logoutTime = localStorage.getItem('current-user-logout-timesplit');
    if (logoutTime != null) {
      this.outTime = logoutTime;
    }
    let logoutDate = localStorage.getItem('current-user-logout-datesplit');
    if (logoutDate != null) {
      this.outDate = logoutDate.replace(/202/g, '2');
    }

    let lat_in = localStorage.getItem('current_clicked_checkin_lat');
    if (lat_in != null) {
      this.latIn = Number(lat_in);
      this.src1 = 'https://maps.google.com/maps?q=';
      this.src1 +=
        this.latIn + ',' + this.lonIn + '&hl=es&z=14&amp;output=embed';
    }
    let lon_in = localStorage.getItem('current_clicked_checkin_long');
    if (lon_in != null) {
      this.lonIn = Number(lon_in);
    }
    let add_in = localStorage.getItem('current_clicked_checkin_address');
    if (add_in != null) {
      this.addIn = add_in;
    }

    let lat_out = localStorage.getItem('current_clicked_checkout_lat');
    if (lat_out != null) {
      this.latOut = Number(lat_out);
    }
    let lon_out = localStorage.getItem('current_clicked_checkout_long');
    if (lon_out != null) {
      this.lonOut = Number(lon_out);
    }
    let add_out = localStorage.getItem('current_clicked_checkout_address');
    if (add_out != null) {
      this.addOut = add_out;
    }
  }

  @ViewChild('user_attendence_modal', { static: false })
  userAttModalEle: ElementRef | null = null;

  openUserAttendenceModal() {
    if(localStorage.getItem('current_clicked_user_image' )!=null){
      this.imageUrl = localStorage.getItem('current_clicked_user_image' );
    }
    this.punchType = localStorage.getItem('current_clicked_punch_type');
    this.fullName1 =
      localStorage.getItem('current_clicked_user_name') +
      ' ' +
      localStorage.getItem('current_clicked_user_lname');
    this.fullName =
      localStorage.getItem('current_fname') +
      ' ' +
      localStorage.getItem('current_lname');
    let lat_in = localStorage.getItem('current_clicked_checkin_lat');
    if (lat_in != null) {
      this.latIn = Number(lat_in);
      this.src1 = 'https://maps.google.com/maps?q=';
      this.src1 +=
        this.latIn + ',' + this.lonIn + '&hl=es&z=14&amp;output=embed';
    }
    let lon_in = localStorage.getItem('current_clicked_checkin_long');
    if (lon_in != null) {
      this.lonIn = Number(lon_in);
    }
    let add_in = localStorage.getItem('current_clicked_checkin_address');
    if (add_in != null) {
      this.addIn = add_in;
    }

    let lat_out = localStorage.getItem('current_clicked_checkout_lat');
    if (lat_out != null) {
      this.latOut = Number(lat_out);
    }
    let lon_out = localStorage.getItem('current_clicked_checkout_long');
    if (lon_out != null) {
      this.lonOut = Number(lon_out);
    }
    let add_out = localStorage.getItem('current_clicked_checkout_address');
    if (add_out != null) {
      this.addOut = add_out;
    }
    let latestCheckIn = localStorage.getItem('current_clicked_latest_check_in');
    if (latestCheckIn != null) {
      this.latestCheckin = latestCheckIn;
    }
    let latestCheckOut = localStorage.getItem(
      'current_clicked_latest_check_out'
    );
    if (latestCheckOut != null) {
      this.latestCheckout = latestCheckOut;
    }
    if (this.userAttModalEle) this.modalObj.show();
  }

  closeUserAttendenceModal() {
    localStorage.removeItem('current_clicked_user_name');
    localStorage.removeItem('current_clicked_user_lname');
    localStorage.removeItem('current_clicked_punch_type');
    localStorage.removeItem('current_clicked_checkin_lat');
    localStorage.removeItem('current_clicked_checkin_long');
    localStorage.removeItem('current_clicked_checkout_lat');
    localStorage.removeItem('current_clicked_checkout_long');
    localStorage.removeItem('current_clicked_checkin_address');
    localStorage.removeItem('current_clicked_checkout_address');
    if (this.userAttModalEle) this.modalObj.hide();
  }

  ngOnDestroy() {
    if (this.subscriptionObj) {
      this.subscriptionObj.unsubscribe();
    }
  }
}
