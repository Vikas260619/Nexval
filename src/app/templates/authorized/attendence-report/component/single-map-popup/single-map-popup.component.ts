import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-single-map-popup',
  templateUrl: './single-map-popup.component.html',
  styleUrls: ['./single-map-popup.component.scss']
})
export class SingleMapPopupComponent implements OnInit,AfterViewInit {
  modalObj: Modal | null = null;
  subscriptionObj: Subscription | null;
  lat:any=41.40338;
  lon:any=2.17403;
  fullname:string;
  nameArr = [];
  profileImage:string='';
  address:string='';
  st:string='';
  @ViewChild('user_attendence_modal', { static: false })
  userAttModalEle: ElementRef | null = null;

  constructor(private eventEmitterService: EventEmitterService,
    private cdr: ChangeDetectorRef) { 
    
   }
  
ngAfterViewInit(): void {
  this.modalObj = new Modal(this.userAttModalEle?.nativeElement);
  if (
    localStorage.getItem('user-profile-image') != null ||
    localStorage.getItem('user-profile-image') != ''
  ) {
    this.profileImage = localStorage.getItem('user-profile-image');
  }
  this.cdr.detectChanges();
  this.address=localStorage.getItem('punchAddress');
  }
  ngOnInit(): void {
    this.st= localStorage.getItem('st');
    this.address=localStorage.getItem('punchAddress');
   this.getFullName();
    this.subscriptionObj =
      this.eventEmitterService.singleMapModalEventEmitter.subscribe(
        (status) => {
          if (status) this.opensingleMapModal();
        }
      );
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
  opensingleMapModal(){
    this.address=localStorage.getItem('punchAddress');
    let latlon= localStorage.getItem('punchInLatLong');
   
    let latlonArr = latlon.split(',');
    
    this.lat=Number(latlonArr[0]);
    this.lon=Number(latlonArr[1]);
    
     // console.log("999999999999"+this.lat);
     setTimeout(() => {
      if (this.userAttModalEle) this.modalObj.show();
    }, 100);
    
  }
 closesingleMapModal(){
  //location.reload();
    if (this.userAttModalEle) this.modalObj.hide();
 }
  ngOnDestroy() {
    if (this.subscriptionObj) {
      this.subscriptionObj.unsubscribe();
    }
  }
}
