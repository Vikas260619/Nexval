import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidateService } from 'src/app/service/validate.service';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-get-link',
  templateUrl: './get-link.component.html',
  styleUrls: ['./get-link.component.scss']
})
export class GetLinkComponent implements OnInit {
  getLinkForm: FormGroup;
  getLinkModal: Modal | null = null;
  getLinkModelSubscription: Subscription | null;
  serverErrorMessage: string = '';
  btnActive:boolean=false;

  isSubmitted: boolean = false;

  constructor(private customValidator:ValidateService,private eventEmitterService: EventEmitterService, private httpService: AuthHttpService,private router:Router) {
    this.getLinkForm = new FormGroup({
      mobileNo: new FormControl(null, [
        Validators.required,
        this.customValidator.mobileValidator(),
        Validators.maxLength(10),
      ]),
    });
  }
  ngAfterViewInit(): void {
    this.getLinkModal = new Modal(
      this.getLinkModalEle?.nativeElement
    );
    //console.log(this.memberInviteModal);
  }
  ngOnInit(): void {
    this.getLinkModelSubscription =
      this.eventEmitterService.getLinkEventEmitter.subscribe(
        (status) => {
          if (status) this.openGetLinkModal();
        }
      );
  }
  get linkFormControl() {
    return this.getLinkForm.controls;
  }
  onSubmit() {
    if (this.getLinkForm.invalid) {
      this.linkFormControl.mobileNo.markAsDirty();
      return;
    }

    let data: any = {
      "workphone": this.getLinkForm.value.mobileNo
    };

    this.httpService.sendLink(data).subscribe(
      (response) => {
        if (response.success) {
          this.isSubmitted = true;
          this.getLinkForm.reset();
          //this.router.navigate(['/home']);
        } else {
          this.serverErrorMessage = response.message;
        }
      },
      (_) => {
        this.serverErrorMessage = environment.errorMessage;
      }
    );

    

  }
  @ViewChild('getLink_modal', { static: false })
  getLinkModalEle: ElementRef | null = null;

  openGetLinkModal() {
    if (this.getLinkModalEle) this.getLinkModal.show();
  }

  closeGetLinkModal() {
    this.getLinkForm.reset()
    if (this.getLinkModalEle) this.getLinkModal.hide();
  }
  myFunc(val:any){
    if(this.isNumeric(val.target.value) ) {
      if(val.target.value.length==10){
            this.btnActive=true
          }else{
            this.btnActive=false
          }
   }else{
    this.btnActive=false
   }   
  }
  isNumeric(s: number) {
    if (typeof s != 'string') {
      return false;
    }
    //We return false if the string is ""
    return !isNaN(s) && !isNaN(parseFloat(s));
  }
  ngOnDestroy(): void {
    this.getLinkModelSubscription.unsubscribe();
  }
}
