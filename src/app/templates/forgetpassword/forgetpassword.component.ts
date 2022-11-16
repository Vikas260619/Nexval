import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  frmForgotPass:FormGroup;
  serverErrorMessage:string='';
  hasError:boolean;
  returnUrl: string = 'enterotp';
  constructor(private http: AuthHttpService,private customValidator: ValidateService,private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('forgot-pass-email')
    this.frmForgotPass= new FormGroup(
      {
        email: new FormControl(null, [
          Validators.required,
          this.customValidator.emailValidation(),
        ])
      }
    );
  }
  get forgotFormControl() {
    return this.frmForgotPass.controls;
  }
  
  onSubmit(){
    if (this.frmForgotPass.invalid) {
      this.forgotFormControl.email.markAsDirty();
      return;
    }
    let dataPercentage: any = {
      email: this.frmForgotPass.value.email,
    };
    this.http.forgotPassword(dataPercentage).subscribe(
      (response) => {
        
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          
          this.router.navigate([this.returnUrl]);
          localStorage.setItem('forgot-pass-email',this.frmForgotPass.value.email);
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
}
