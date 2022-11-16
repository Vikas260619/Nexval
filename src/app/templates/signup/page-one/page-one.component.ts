import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { SignupPhaseOne } from 'src/app/interfaces/signup.interface';
import { StoreService } from 'src/app/service/store.service';
import { CryptoService } from 'src/app/service/crypto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit {
  registerFormOne: FormGroup;
  returnUrl: string = 'signup/otp-verification';
  isSubmitFormLoading: boolean = false;
  isTermsChecked: boolean = false;
  shPassword: boolean = false;
  shNum: number = 0;
  hasError: boolean = false;

  serverErrorMessage: string | null = null;

  constructor(
    private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private encryption: CryptoService
  ) {
    this.registerFormOne = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        this.customValidator.nameValidator(),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        this.customValidator.nameValidator(),
      ]),
      email: new FormControl(null, [
        Validators.required,
        this.customValidator.emailValidation(),
        this.customValidator.domainValidator(),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.customValidator.passwordValidator(),
      ]),
    });
  }

  ngOnInit(): void {}

  get registerFormControl() {
    return this.registerFormOne.controls;
  }

  onSubmit() {
    if (this.registerFormOne.invalid) {
      this.registerFormControl.firstName.markAsDirty();
      this.registerFormControl.lastName.markAsDirty();
      this.registerFormControl.email.markAsDirty();
      this.registerFormControl.password.markAsDirty();
      return;
    }

    this.isSubmitFormLoading = true;
    let data: SignupPhaseOne = {
      fname: this.registerFormOne.value.firstName,
      lname: this.registerFormOne.value.lastName,
      email: this.registerFormOne.value.email,
      pwd: this.encryption.encrypt(this.registerFormOne.value.password),
    };

    let dataStoreSave: any = {
      firstName: this.registerFormOne.value.firstName,
      lastName: this.registerFormOne.value.lastName,
      email: this.registerFormOne.value.email,
      pwd: this.encryption.encrypt(this.registerFormOne.value.password),
    };
    this.authHttp.signupPhaseOne(data).subscribe(
      (response) => {
        this.isSubmitFormLoading = false;
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          this.store.setSignupFormOneData(dataStoreSave);
          this.router.navigate([this.returnUrl]);
        } else {
          this.serverErrorMessage = response.message;
          this.hasError = true;
        }
      },
      (_) => {
        this.isSubmitFormLoading = false;
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }
  passwordView: boolean = false;
  passwordViewToggle() {
    this.passwordView = !this.passwordView;
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
}
