import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Domain } from '../interfaces/domain';
import { DomainService } from './domain.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  domains: Domain[] = [];
  flg: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private domainService: DomainService
  ) {}

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^[A-Za-z]+$/.test(control.value)
        ? null
        : { invalidName: { message: 'Invalid name' } };
    };
  }

  notOnlySpChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^(?=.*[A-Za-z0-9 \b])[a-zA-Z0-9., &:-_@.!$%()=*/#&+]+$/.test(
        control.value
      )
        ? null
        : { invalidsp: { message: 'Only special characters not allowed' } };
    };
  }
  notOnlyNum(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^-?(0|[1-9]\d*)?$/.test(control.value)
        ? { invalidNm: { message: 'Only numbers not allowed' } }
        : null;
    };
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^[0-9]+$/.test(control.value)
        ? null
        : {
            invalidMobileNumber: {
              message: 'Invalid mobile number',
            },
          };
    };
  }

  domainValidator(): ValidatorFn {
    this.domainService
      .getProhibitedDomains()
      .subscribe((response: Domain[]) => {
        this.domains = response;
      });
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null) {
        if (control.value.value != '') {
          let flag: boolean;
          this.domains.forEach(function (value) {
            if (typeof value.name == 'string') {
              if (control.value.includes(value.name) == true) {
                flag = true;
              }
            }
          });

          if (flag == true) {
            return {
              invalidDomain: {
                message: 'Invalid Domain',
              },
            };
          }
        }
      }
      return null;
    };
  }

  onlyDomainValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        var re = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (re.test(String(control.value).toLowerCase()) == false) {
          return {
            notvalidDomain: {
              message: 'Invalid domain',
            },
          };
        }
      }
      return null;
    };
  }

  emailValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        var re = /^[a-zA-Z0-9._-]+@[a-z]+\.[a-z]{2,3}$/;
        if (re.test(String(control.value).toLowerCase()) == false) {
          return {
            notvalidEmail: {
              message: 'invalid email',
            },
          };
        }
      }
      return null;
    };
  }

  otpValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^[0-9]+$/.test(control.value)
        ? null
        : {
            invalidOTP: {
              message: 'invalid otp',
            },
          };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        control.value
      )
        ? null
        : {
            invalidPassword: {
              message: 'invalid password',
            },
          };
    };
  }

  multipleEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return /^(|([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([,](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
        control.value
      )
        ? null
        : { invalidEmails: { message: 'Please enter email id(s)' } };
    };
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
