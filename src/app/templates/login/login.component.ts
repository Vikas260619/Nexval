import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { LoginRequest } from 'src/app/interfaces/signup.interface';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { CryptoService } from 'src/app/service/crypto.service';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/service/jwt.service';
import { StoreService } from 'src/app/service/store.service';
import * as moment from 'moment';
import { HttpParameterCodec } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: any;
  loginForm: FormGroup;
  userDetails: string = '';
  shPassword: boolean = false;
  shNum: number = 0;
  hasError: boolean = false;
  token: string = '';

  countrySearch: FormControl;

  isLoginFormLoading: boolean = false;
  data: string | null = null;
  testjson: string = '';
  loggedinCheck: boolean = false;

  constructor(
    private http: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private encryption: CryptoService,
    private jwt: JwtService,
    private rt: ActivatedRoute,
    private store: StoreService,
    private EventEmitter:EventEmitterService,
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
      });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    //console.log('testing');
    //---test123@1
    localStorage.clear();

    this.store.removeInvitationToken();
    this.rt.queryParams.subscribe((params) => {
      let urlStr = decodeURIComponent(params['id']).replace(/ +/g, '+');
      if (params['id']) {
       // localStorage.clear();
        //console.log(urlStr);
        ///localStorage.setItem('invite-string',urlStr);
        this.store.setInvitationToken(urlStr);
      }
    });

    if (
      localStorage.getItem('authentication-token') != null &&
      localStorage.getItem('invite-string') == null
    ) {
      this.loggedinCheck = true;
      this.router.navigate(['./dashboard/home']);
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginFormControls.email.markAsDirty();
      this.loginFormControls.password.markAsDirty();
      return;
    }

    this.isLoginFormLoading = true;
    this.token = this.store.getInvitationToken();

    if (this.token == '') {
      this.testjson = '';
    } else {
      this.testjson = this.token;
    }

    let data: LoginRequest = {
      email: this.loginForm.value.email,
      pwd: this.encryption.encrypt(this.loginForm.value.password),
      encrypted_invitation_details: this.testjson,
    };
    this.http.login(data).subscribe(
      (response) => {
        this.isLoginFormLoading = false;
        if (response.success) {
          this.data = null;
          if (response.data) {
            console.log(response.data)
            //localStorage.clear()
            this.store.setUserEmail(this.loginForm.value.email);
            this.store.setUserRole(response.data['role_name']);

            if (response.data['sendbird_user_details'] != null) {
              localStorage.setItem(
                'nickname',
                response.data['sendbird_user_details']['nickname']
              );
              localStorage.setItem(
                'user_id',
                response.data['sendbird_user_details']['user_id']
              );
              localStorage.setItem(
                'application_id',
                response.data['sendbird_user_details']['application_id']
              );
            }
            let fullname =
              response.data['fname'] + ' ' + response.data['lname'];
            localStorage.setItem('fullname', fullname);
            let fname = response.data['fname'];
            let lname = response.data['lname'];
            localStorage.setItem('current_fname', fname);
            localStorage.setItem('current_lname', lname);
            localStorage.setItem('id', response.data['id']);
            this.jwt.setToken(response.data['token']);
            localStorage.setItem(
              'refresh_token',
              response.data['refresh_token']
            );
            // moment().format('HH:mm');
            localStorage.setItem('token_timestamp', moment().format());
            
            localStorage.setItem("user-profile-pic",null);  
            localStorage.setItem(
              'refresh_token',
              response.data['refresh_token']
            );
            localStorage.setItem('regions_id', response.data['regions_id']);
            localStorage.setItem('region_name', response.data['regionname']);
           
            if( response.data['orgdetails'] != null ){
            localStorage.setItem(
              'org_name',
              response.data['orgdetails']['orgname']
            );
            }else{
              localStorage.setItem(
                'org_name',
                '-----'
              );
            }

            let data: any = {
              regionid: localStorage.getItem('regions_id'),
              is_full_tree_user_req: 'true',
            };
            this.http.getAllUsers(data).subscribe(
              (response) => {
                localStorage.setItem(
                  'all_users',
                  JSON.stringify(response.data)
                );
              },
              (error) => {
                //this.isSubmitFormLoading = false;
              }
            );

            if (!this.token) {
              if(response.data['userpicture_original']!="" && response.data['userpicture_original']!=null ){
                localStorage.setItem("user-profile-pic",response.data['userpicture_original'].replace('http://','https://'));
                localStorage.setItem("user-profile-pic-thumb",response.data['userpicture'].replace('http://','https://'));
                let imageSrcString:any =  this.toDataURL(localStorage.getItem("user-profile-pic").replace('http://','https://')).then(meta => {
                  let data:any=meta;
                   localStorage.setItem("user-profile-pic",data); // {"metadata": "for: test.png"}
                   this.EventEmitter.imageCropSaveEventEmitter.emit(true);
                 });
                 let imageSrcStringSmall:any =  this.toDataURL(localStorage.getItem("user-profile-pic-thumb").replace('http://','https://')).then(meta => {
                  let data:any=meta;
                   localStorage.setItem("user-profile-pic-thumb",data); // {"metadata": "for: test.png"}
                   this.EventEmitter.imageCropSaveEventEmitter.emit(true);
                 });
                 
                //localStorage.setItem("user-profile-pic",imageSrcString);
                }else{
                  localStorage.setItem("user-profile-pic",null);
                }
              if (response.data['orgdetails'] == null ) {
                if(response.data['status_name']=='PassCode Not Verified')
                {
                  localStorage.setItem("invcode_valid","false");
                }
                this.router.navigate(['./signup/orgsetup-2']);
              } 
              else if (
                response.data['orgdetails']['status_name'] == 'PREACTIVE'
              ) {
                // this.router.navigate(['./signup/orgsetup-3']);
                this.router.navigate(['./dashboard/home']).then(() => {
                  window.location.reload();
                });
              } else {
                this.router.navigate(['./dashboard/home']).then(() => {
                   window.location.reload();
                });
              }
            } else {
              this.router.navigate(['./dashboard/team-collab']).then(() => {
                window.location.reload();
              });
             //this.router.navigate(['path/to'])
            }
          }
          return;
        } else {
          this.data = response.message;
          this.hasError = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.isLoginFormLoading = false;
        this.data = environment.errorMessage;
        this.hasError = true;
        console.log(this.hasError);
      }
    );
  }
  toDataURL = async (url) => {
    console.log("Downloading image...");
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })

    return result
  };
  showPassword() {
    if (this.shNum == 0) {
      this.shPassword = true;
      this.shNum = 1;
    } else {
      this.shNum = 0;
      this.shPassword = false;
    }
  }
  getInitialURL(url: string) {
    //console.log('getInitialURL', url);
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params: any = {},
      match: any;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    console.log('From getInitialURL: ' + url);
    console.log(url);
    return url;
  }
}
