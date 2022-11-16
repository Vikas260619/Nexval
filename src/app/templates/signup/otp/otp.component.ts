import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { SignupPhaseTwo } from 'src/app/interfaces/signup.interface';
import { resendOTPRequest } from 'src/app/interfaces/signup.interface';
import { StoreService } from 'src/app/service/store.service';
import { CryptoService } from 'src/app/service/crypto.service';
import { JwtService } from 'src/app/service/jwt.service';
import { LoginRequest } from 'src/app/interfaces/signup.interface';

import { timer, Subscription } from 'rxjs';
import { SignupOne } from 'src/app/interfaces/store.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  registerFormTwo: FormGroup;
  userDetails: string = '';
  returnUrl: string = 'signup/orgsetup-1';
  returnUrlBackward: string = 'signup/';
  error: string | null = null;
  isSubmitFormLoading: boolean = false;
  otpSendSuccess: boolean = false;
  otpSendSuccess1: boolean = false;
  email: string;
  hasError: boolean = false;
  btnActive: boolean = false;
  otpResend: boolean = false;

  otpTimeout: boolean = false;
  otpTimeout1: boolean = false;
  frmInvalid: boolean = false;
  countDown: Subscription | null = null;
  counter = 120;
  tick = 1000;
  counter1 = 120;
  tick1 = 1000;
  stopInitialTimer: boolean = false;
  data: string | null = null;

  signupformOneData: SignupOne | null;
  serverErrorMessage: string | null = null;
  constructor(
    private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private encryption: CryptoService,
    private jwt: JwtService
  ) {
    this.registerFormTwo = new FormGroup({
      digitOne: new FormControl(null, [Validators.required]),
      digitTwo: new FormControl(null, [Validators.required]),
      digitThree: new FormControl(null, [Validators.required]),
      digitFour: new FormControl(null, [Validators.required]),
      digitFive: new FormControl(null, [Validators.required]),
      digitSix: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.email = this.store.getEmailFromLocal();
    if (this.registerFormTwo.valid) {
      this.serverErrorMessage = '';
    }
  }
  ngAfterViewInit() {
    this.activateCountDown();
  }
  activateCountDown() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.otpTimeout = true;
        this.otpSendSuccess = false;
        return false;
      }
    });
  }

  activateCountDown2() {
    this.countDown = timer(0, this.tick1).subscribe(() => {
      if (this.counter1 > 0) {
        --this.counter1;
      } else {
        this.otpTimeout1 = true;
        this.otpSendSuccess1 = false;
        return false;
      }
    });
  }
  get registerFormTwoControl() {
    return this.registerFormTwo.controls;
  }

  getSignupFormOneData(): SignupOne | null {
    let data: string | null = this.store.getSignupFormOneData();
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  onSubmit() {
    if (this.registerFormTwo.invalid) {
      this.registerFormTwoControl.digitOne.markAsDirty();
      this.registerFormTwoControl.digitTwo.markAsDirty();
      this.registerFormTwoControl.digitThree.markAsDirty();
      this.registerFormTwoControl.digitFour.markAsDirty();
      this.registerFormTwoControl.digitFive.markAsDirty();
      this.registerFormTwoControl.digitSix.markAsDirty();
      this.serverErrorMessage = '';
      this.frmInvalid = true;
      this.otpResend = false;
      return;
    }
    this.isSubmitFormLoading = true;
    let data: SignupPhaseTwo = {
      otp:
        this.registerFormTwo.value.digitOne +
        this.registerFormTwo.value.digitTwo +
        this.registerFormTwo.value.digitThree +
        this.registerFormTwo.value.digitFour +
        this.registerFormTwo.value.digitFive +
        this.registerFormTwo.value.digitSix,
      email: this.store.getEmailFromLocal(),
    };

    this.authHttp.signupPhaseTwo(data).subscribe(
      (response) => {
        this.isSubmitFormLoading = false;

        if (!response.success) {
          this.serverErrorMessage = response.message;
          this.hasError = true;
          return;
        } else {
          this.jwt.setToken(response.token);
          this.router.navigate([this.returnUrl]);
          return;
        }
      },
      (_) => {
        this.isSubmitFormLoading = false;
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }

  login(data: LoginRequest): void {
    this.authHttp.login(data).subscribe(
      (response) => {
        if (response.success) {
          if (response.data) {
            this.jwt.setToken(response.data['token']);
          }
          this.router.navigate([this.returnUrl]);
          return;
        }
        this.data = response.data;
      },
      (error: HttpErrorResponse) => {
        this.data = environment.errorMessage;
      }
    );
  }

  resendOTP() {
    this.registerFormTwo.reset();
    this.otpResend = true;
    this.stopInitialTimer = true;
    this.otpTimeout = false;
    this.counter = 120;
    let otpData: resendOTPRequest = {
      email: this.store.getEmailFromLocal(),
    };
    this.authHttp.resendOTP(otpData).subscribe(
      (response) => {
        this.isSubmitFormLoading = false;
        this.serverErrorMessage = response.message;
        //  call timer from function
        //if (response.success) this.router.navigate([this.returnUrl]);
        this.activateCountDown2();
      },
      (_) => {
        this.isSubmitFormLoading = false;
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }

  @ViewChildren('otpInputs') otpInputElements: QueryList<ElementRef> | null =
    null;
  backspaceCount: number = 0;
  toggleFocus(event: KeyboardEvent, index: number) {
    this.serverErrorMessage = '';
    this.otpResend = false;
    let inputElement = this.otpInputElements?.get(index);
    let inputValue = inputElement?.nativeElement.value;

    if (event.key === 'Backspace' && index >= 1 && index <= 5) {
      if (inputValue.length === 0 && this.backspaceCount >= 1) {
        this.otpInputElements?.get(index - 1)?.nativeElement.focus();

        this.backspaceCount = 0;
      } else this.backspaceCount++;
    } else this.backspaceCount = 0;

    if (inputValue.length >= 1 && index >= 0 && index <= 6) {
      this.otpInputElements?.get(index + 1)?.nativeElement.focus();
    }
  }
}
