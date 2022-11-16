import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/service/crypto.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { forceUpdate } from 'src/app/interfaces/signup.interface';
import { stringify } from 'querystring';

@Component({
  selector: 'app-force-login',
  templateUrl: './force-login.component.html',
  styleUrls: ['./force-login.component.scss'],
})
export class ForceLoginComponent implements OnInit {
  formForce: FormGroup;
  isTermsChecked: boolean = false;
  serverErrorMessage: string | null = null;

  addForceModalSubscription: Subscription | null;
  addForceUpdateModal: Modal | null = null;
  invitationToken: string;
  shPassword: boolean = false;
  shNum: number = 0;
  shPasswordC: boolean = false;
  shNumC: number = 0;
  hasError: boolean = false;
  returnUrl: string = 'dashboard/team-collab';
  userEmail: string = '';

  constructor(
    private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private eventEmitterService: EventEmitterService,
    private encryption: CryptoService
  ) {
    this.formForce = new FormGroup(
      {
        firstName: new FormControl(null, [
          Validators.required,
          this.customValidator.nameValidator(),
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          this.customValidator.nameValidator(),
        ]),
        email: new FormControl(null, []),
        password: new FormControl(null, [
          Validators.required,
          this.customValidator.passwordValidator(),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      this.customValidator.mustMatch('password', 'confirmPassword')
    );
  }

  ngAfterViewInit(): void {
    this.addForceUpdateModal = new Modal(
      this.forceUpdateModalEle?.nativeElement
    );
    //console.log(this.memberInviteModal);
  }

  ngOnInit(): void {
    this.addForceModalSubscription =
      this.eventEmitterService.addForceUpadate.subscribe((status) => {
        if (status) this.openForceUpdateModal();
      });
    this.invitationToken = this.store.getInvitationToken();
    this.userEmail = this.store.getUserEmail();
  }

  get forcedFormControl() {
    return this.formForce.controls;
  }
  onSubmit() {
    if (this.formForce.invalid) {
      this.forcedFormControl.firstName.markAsDirty();
      this.forcedFormControl.lastName.markAsDirty();
      this.forcedFormControl.email.markAsDirty();
      this.forcedFormControl.password.markAsDirty();
      this.forcedFormControl.confirmPassword.markAsDirty();
      return;
    }
    let data: forceUpdate = {
      encrypted_invitation_details: this.invitationToken,
      fname: this.formForce.value.firstName,
      lname: this.formForce.value.lastName,
      pwd: this.encryption.encrypt(this.formForce.value.password),
    };

    this.authHttp.forceUpdate(data).subscribe(
      (response) => {
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          localStorage.setItem('current-team', JSON.stringify(response.data));
          localStorage.setItem('inv-activated', '1');
          localStorage.setItem(
            'fullname',
            response.data['user_details']['nickname']
          );
          //   let fname = response.data['fname'];
          //   let lname = response.data['lname'];
          //   localStorage.setItem('current_fname', fname);
          //   localStorage.setItem('current_lname', lname);
          this.store.removeInvitationToken();
          this.eventEmitterService.emitAddTeamEvent();
          this.eventEmitterService.emitForceUpdate();
          this.eventEmitterService.emitColleagueList();
          this.eventEmitterService.emitMessageList();
          this.eventEmitterService.nameEventEmitter.emit(true);
          this.closeForceUpdateModal();
          this.openCroppModal();

          //this.router.navigate([this.returnUrl]);
        } else {
          this.serverErrorMessage = response.message;
          this.hasError = true;
        }
      },
      (_) => {
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }

  @ViewChild('force_password_update_modal', { static: false })
  forceUpdateModalEle: ElementRef | null = null;

  openForceUpdateModal() {
    if (this.forceUpdateModalEle) this.addForceUpdateModal.show();
  }

  closeForceUpdateModal() {
    if (this.forceUpdateModalEle) this.addForceUpdateModal.hide();
  }
  openCroppModal(){
    console.log('Called');
    this.eventEmitterService.imageuploadPopupEventEmitter.emit(true);
  }
  onCheckboxChange(evt: boolean) {
    this.isTermsChecked = evt;
  }
  showPassword() {
    if (this.shNum == 0) {
      this.shPassword = true;
      this.shNum = 1;
    } else {
      this.shNum = 0;
      this.shPassword = false;
    }
  }
  showPasswordConfirm() {
    if (this.shNumC == 0) {
      this.shPasswordC = true;
      this.shNumC = 1;
    } else {
      this.shNumC = 0;
      this.shPasswordC = false;
    }
  }
}
