import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidateService } from 'src/app/service/validate.service';
import { resetPassword } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  registerFormForgot: FormGroup;
  isSubmitFormLoading: boolean = false;
  serverErrorMessage: string | null = null;
  constructor(
    private customValidator: ValidateService,
    private authHttp: AuthHttpService
  ) {
    this.registerFormForgot = new FormGroup({
      number: new FormControl(null, [
        Validators.required,
        this.customValidator.mobileValidator(),
        Validators.minLength(8),
      ]),
    });
  }
  get registerFormForgotControls() {
    return this.registerFormForgot.controls;
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.registerFormForgot.invalid) {
      this.registerFormForgotControls.number.markAsDirty();
      return;
    }
    this.isSubmitFormLoading = true;
    let data: resetPassword = {
      mobileNumber: this.registerFormForgot.value.number,
    };

    this.authHttp.resetPassword(data).subscribe(
      (response) => {
        this.isSubmitFormLoading = false;
        //  call timer from function
        //if (response.success) this.router.navigate([this.returnUrl]);
        this.serverErrorMessage = response.data;
      },
      (_) => {
        this.isSubmitFormLoading = false;
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }
}
