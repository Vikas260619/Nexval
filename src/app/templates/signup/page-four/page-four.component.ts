import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { StoreService } from 'src/app/service/store.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignupOne } from 'src/app/interfaces/store.interface';

@Component({
  selector: 'app-page-four',
  templateUrl: './page-four.component.html',
  styleUrls: ['./page-four.component.scss'],
})
export class PageFourComponent implements OnInit {
  registerFormFour: FormGroup;
  modules: any = [];
  moduleids: any = [];
  chkAddonsArray: any = [];
  chkCentralArray: string[] = [];
  chkAddons: string;
  verticalID: string | undefined;
  colab: any;
  returnUrlBackward: string = 'signup/user-signup';
  isSubmitFormLoading: boolean = false;
  showButton: boolean = false;
  returnUrl: string = 'signup/orgsetup-4';
  selected: any;
  addClass: boolean = false;

  constructor(
    private authHttp: AuthHttpService,
    private store: StoreService,
    private router: Router
  ) {
    this.registerFormFour = new FormGroup({});
    let x: string | undefined = localStorage
      .getItem('selectedVertical')
      ?.toString();
    this.verticalID = x;
  }

  ngOnInit(): void {
    this.authHttp.getColabs().subscribe(
      (response) => {
        this.colab = response.data;
      },
      (error) => {
        this.isSubmitFormLoading = false;
      }
    );
    if (environment.production && this.getSignupFormOneData() === null) {
      this.router.navigate([this.returnUrlBackward]);
    }
  }
  onSubmit() {
    this.isSubmitFormLoading = true;

    this.moduleids = this.colab;
    this.modules.push({ moduleids: this.chkAddonsArray });
    this.authHttp.saveColabs(this.modules[0]).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.isSubmitFormLoading = false;
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
  idC: string;
  checkColab(e: string) {
    this.idC = e;
    if (this.chkAddons == '') {
      this.chkAddonsArray.push(e.toString());
      //console.log("----"+document.getElementById('"'+e+'"'));
      this.addClass = true;
    } else {
      if (this.chkAddonsArray.indexOf(e.toString()) == -1) {
        this.chkAddonsArray.push(e.toString());
        //console.log("----"+document.getElementById('"'+e+'"'));
        this.addClass = true;
      } else {
        var index = this.chkAddonsArray.indexOf(e.toString());
        this.chkAddonsArray.splice(index, 1);
        this.addClass = false;
      }
    }
    if (this.chkAddonsArray.length > 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
    this.chkAddons = this.chkAddonsArray.join(',');
  }
  checkArrayExist(e: number) {
    if (this.chkAddonsArray.indexOf(e.toString()) == -1) {
      this.addClass = false;
    } else {
      this.addClass = true;
    }
  }
  details(elem: HTMLElement) {
    if (elem.className == 'active') {
      elem.className = '';
    } else {
      elem.className = 'active';
    }
  }
  addC: boolean = false;

  toggleClass(id: string) {
    this.idC = id;
    this.addC = !this.addC;
    console.log(this.addC);
  }
}
