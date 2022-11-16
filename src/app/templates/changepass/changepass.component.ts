import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { environment } from 'src/environments/environment';
import { CryptoService } from 'src/app/service/crypto.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss'],
})
export class ChangepassComponent implements OnInit {
  changePass: FormGroup;
  serverErrorMessage: string = '';
  hasError: boolean;
  returnUrl: string = 'enterotp';

  constructor(
    private http: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private encryption: CryptoService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('forgot-pass-email')==null){
      this.router.navigate(['login']);
    }
    this.changePass = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        this.customValidator.passwordValidator(),
      ]),
      confirmPassword: new FormControl(null, [Validators.required])
    },
    this.customValidator.mustMatch('password', 'confirmPassword')
    );
  }

  get changePassControl() {
    return this.changePass.controls;
  }

  onSubmit() {
    if (this.changePass.invalid) {
      this.changePassControl.password.markAsDirty();
      this.changePassControl.confirmPassword.markAsDirty();
      return;
    }
    let mail = localStorage.getItem('forgot-pass-email');

    let data: any = {
      email: mail,
      pwd: this.encryption.encrypt(this.changePass.value.password),
    };

    this.http.resetPass(data).subscribe(
      (response) => {
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          this.router.navigate(['dashboard/logout']);
        } else {
          this.serverErrorMessage = response.data;
          this.hasError = true;
        }
      },
      (_) => {
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }
}
