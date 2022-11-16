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
import { SignupPhaseThree } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { Vertcals } from 'src/app/interfaces/signup.interface';
import { StoreService } from 'src/app/service/store.service';
import { CryptoService } from 'src/app/service/crypto.service';
import { SignupOne } from 'src/app/interfaces/store.interface';
import { JwtService } from 'src/app/service/jwt.service';
import { ValidateService } from 'src/app/service/validate.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrls: ['./page-three.component.scss'],
})
export class PageThreeComponent implements OnInit {
  registerFormThree: FormGroup;
  submitted = false;
  returnUrl: string = '/login';
  returnUrlBackward: string = 'signup/user-signup';
  verticals: Vertcals[] = [];
  modules: any = [];
  moduleids: any = [];
  isSubmitFormLoading: boolean = false;
  checkVertical: string;
  isServerError: boolean = false;
  serverErrorMessage: string = '';
  signupformOneData: SignupOne | null;
  currEmail: string = '';
  currEmailArr: string[] = [];
  showDomain: boolean = false;
  showDomainFlag: number = 0;
  private emailValidators = [];
  domainString = [];
  verticalString = [];
  chkAddonsArray: any = [];
  chkAddons: string;
  submitBtn: boolean = false;
  otherClicked: boolean = false;
  extraDomain: string = '';

  constructor(
    private authHttp: AuthHttpService,
    private router: Router,
    private encryption: CryptoService,
    private store: StoreService,
    private jwt: JwtService,
    private customValidator: ValidateService,
    private eventEmitterService:EventEmitterService
  ) {
    this.registerFormThree = new FormGroup({
      email: new FormControl(null, []),
      extraDomain: new FormControl({ enable: false, value: '' }, []),
      orgName: new FormControl(null, [Validators.required]),
      //optionC: new FormControl(false),
    });
    this.checkVertical = '';
    this.signupformOneData = this.getSignupFormOneData();
    if(localStorage.getItem('user-email')!=null){
    this.currEmail = localStorage.getItem('user-email');
    }else{
      this.currEmail = this.signupformOneData['email'];
    }
    this.currEmailArr = this.currEmail.split('@');
    this.currEmail = this.currEmailArr[1];
  }

  get registerFormThreeControls() {
    return this.registerFormThree.controls;
  }
  ngOnInit(): void {
   if( localStorage.getItem("invcode_valid")!==null && localStorage.getItem("invcode_valid")=='false'){
      setTimeout(() => this.openInvModal(), 300);
    }
    this.authHttp.getVerticals().subscribe(
      (response) => {
        this.verticals = JSON.parse(JSON.stringify(response.data));
        //console.log(this.verticals);
      },
      (error) => {
        this.isSubmitFormLoading = false;
      }
    );
    if (environment.production && this.getSignupFormOneData() === null) {
      this.router.navigate([this.returnUrlBackward]);
    }
    //this.registerFormThree.get('email2').clearValidators();
  }
  onSubmit() {
    if (this.registerFormThree.invalid) {
      this.registerFormThreeControls.email.markAsDirty();
      this.registerFormThreeControls.extraDomain.markAsDirty();
      this.registerFormThreeControls.orgName.markAsDirty();
      return;
    }
    if (this.checkVertical == '') {
      this.isServerError = true;
      this.serverErrorMessage = 'Please select a vertical';
      return;
    }
    this.isSubmitFormLoading = true;
    this.domainString.push({ domain_name: this.currEmail });
    if (this.showDomain) {
      this.domainString.push({
        domain_name: this.registerFormThree.value.extraDomain,
      });
    }
    this.verticalString.push({ vertical_id: this.checkVertical });

    let data: SignupPhaseThree = {
      orgname: this.registerFormThree.value.orgName,
      domain_properties: this.domainString,
      vertical_properties: this.verticalString,
    };

    this.authHttp.signupPhaseThree(data).subscribe(
      (response) => {
        this.isSubmitFormLoading = false;
        if (response.success) {
          this.jwt.setToken(response.token);
         //this.moduleids.push = this.colab;
          this.modules.push({ moduleids: ['DC1/O1127x9ZL4GU2bhQgg=='] });
          this.authHttp.saveColabs(this.modules[0]).subscribe(
            (response) => {
              this.router.navigate([this.returnUrl]);
            },
            (error) => {
              this.isSubmitFormLoading = false;
            }
          );
          this.router.navigate([this.returnUrl]);
        } else {
          this.isServerError = true;
          this.serverErrorMessage = response.message;
        }
      },
      (_) => {
        this.isSubmitFormLoading = false;
        this.isServerError = true;
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }
  getSignupFormOneData(): SignupOne | null {
    let data: string | null = this.store.getSignupFormOneData();
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  checkVertival(e: number, event: any) {
    //console.log();
    event.target.parentNode.parentNode.classList.toggle('active');
    if (e.toString() == 'OqgoyLk2G2PeORg1ugDqxA==') {
      this.checkboxes.forEach((element) => {
        element.nativeElement.parentNode.parentNode.classList.remove('active');
        if (element.nativeElement.value != 'OqgoyLk2G2PeORg1ugDqxA==') {
          element.nativeElement.checked = false;
        }
      });
      event.target.parentNode.parentNode.classList.toggle('active');
      if (this.chkAddonsArray.includes('OqgoyLk2G2PeORg1ugDqxA==') === false) {
        this.chkAddonsArray = [];
        this.chkAddons = '';
        console.log('a');
      }
    } else {
      this.checkboxes.forEach((element) => {
        if (element.nativeElement.value == 'OqgoyLk2G2PeORg1ugDqxA==') {
          element.nativeElement.checked = false;
          element.nativeElement.parentNode.parentNode.classList.remove(
            'active'
          );
        }
      });

      if (this.chkAddonsArray.indexOf('OqgoyLk2G2PeORg1ugDqxA==') != -1) {
        var index = this.chkAddonsArray.indexOf('OqgoyLk2G2PeORg1ugDqxA==');
        this.chkAddonsArray.splice(index, 1);
      }
    }
    if (this.chkAddons == '') {
      if (e.toString() == 'OqgoyLk2G2PeORg1ugDqxA==') {
        if (
          this.chkAddonsArray.includes('OqgoyLk2G2PeORg1ugDqxA==') === false
        ) {
          this.chkAddonsArray.push(e.toString());
        } else {
          this.chkAddonsArray.splice(
            this.chkAddonsArray.indexOf('OqgoyLk2G2PeORg1ugDqxA=='),
            1
          );
        }
      } else {
        this.chkAddonsArray.push(e.toString());
      }
    } else {
      if (this.chkAddonsArray.indexOf(e.toString()) == -1) {
        this.chkAddonsArray.push(e.toString());
      } else {
        var index = this.chkAddonsArray.indexOf(e.toString());
        this.chkAddonsArray.splice(index, 1);

        if (e.toString() == 'OqgoyLk2G2PeORg1ugDqxA==') {
          event.target.parentNode.parentNode.classList.remove('active');
        }
      }
    }
    this.chkAddons = this.chkAddonsArray.join(',');
    this.checkVertical = this.chkAddons;

    if (this.chkAddonsArray.length > 0) {
      this.submitBtn = true;
    } else {
      this.submitBtn = false;
    }
    //console.log(this.chkAddons);
  }

  get optionC() {
    return this.registerFormThree.get('optionC') as FormControl;
  }
  get optionCemail2() {
    return this.registerFormThree.get('extraDomain') as FormControl;
  }
  domainShowHide() {
    if (this.showDomainFlag == 0) {
      this.showDomain = true;
      this.optionCemail2.enable();
      this.extraDomain = '';
      this.showDomainFlag = 1;
      this.registerFormThree
        .get('extraDomain')
        .setValidators([
          Validators.required,
          this.customValidator.onlyDomainValidator(),
        ]);
      this.registerFormThree.get('extraDomain').updateValueAndValidity();
    } else {
      this.showDomainFlag = 0;
      this.showDomain = false;
      this.registerFormThree.get('extraDomain').clearValidators();
      this.registerFormThree.get('extraDomain').updateValueAndValidity();
    }
  }
  domainShow() {
    if (this.showDomainFlag == 0) {
      this.showDomain = true;
      this.optionCemail2.enable();
      this.extraDomain = '';
      this.showDomainFlag = 1;
      this.registerFormThree
        .get('extraDomain')
        .setValidators([
          Validators.required,
          this.customValidator.onlyDomainValidator(),
        ]);
      this.registerFormThree.get('extraDomain').updateValueAndValidity();
    }
  }
  openInvModal() {
    this.eventEmitterService.InvEventEmitter.emit(true);
  }
}
