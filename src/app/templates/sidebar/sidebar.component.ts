import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { createTeam } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { $ } from 'protractor';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  registerFormTeam: FormGroup;
  isTermsChecked:boolean = false;
  serverErrorMessage: string | null = null;
  returnUrl: string = 'collabflow';
  hasError:boolean=false;
  showDesc:boolean=false;
  hideDescText:boolean=true;


  muteStream() {
    if (document.getElementById("wrapper").classList.contains("sidebarHide")) {
      document.getElementById("wrapper").classList.remove("sidebarHide")
    } else {
      document.getElementById("wrapper").classList.add("sidebarHide")
    }

    if (document.getElementById("fixscroll").classList.contains("fixscrollsidebarHide")) {
      document.getElementById("fixscroll").classList.remove("fixscrollsidebarHide")
    } else {
      document.getElementById("fixscroll").classList.add("fixscrollsidebarHide")
    }
  }

  hideStream(){
    if (document.getElementById("IconCollegue").classList.contains("active")) {
      document.getElementById("IconCollegue").classList.remove("active")
    } else {
      document.getElementById("IconCollegue").classList.add("active")
    }

    if (document.getElementById("CollegueDes").classList.contains("active")) {
      document.getElementById("CollegueDes").classList.remove("active")
    } else {
      document.getElementById("CollegueDes").classList.add("active")
    }
  }

teamStream(){
    if (document.getElementById("IconCollegue2").classList.contains("active")) {
      document.getElementById("IconCollegue2").classList.remove("active")
    } else {
      document.getElementById("IconCollegue2").classList.add("active")
    }

    if (document.getElementById("CollegueDes2").classList.contains("active")) {
      document.getElementById("CollegueDes2").classList.remove("active")
    } else {
      document.getElementById("CollegueDes2").classList.add("active")
    }
  }

  SupportStream(){
    if (document.getElementById("IconCollegue3").classList.contains("active")) {
      document.getElementById("IconCollegue3").classList.remove("active")
    } else {
      document.getElementById("IconCollegue3").classList.add("active")
    }

    if (document.getElementById("CollegueDes3").classList.contains("active")) {
      document.getElementById("CollegueDes3").classList.remove("active")
    } else {
      document.getElementById("CollegueDes3").classList.add("active")
    }
  }

  constructor(private authHttp: AuthHttpService,
    private customValidator: ValidateService,private router: Router,
    private store: StoreService) { 
    this.registerFormTeam = new FormGroup({
      teamName: new FormControl(null, [
        this.customValidator.notOnlyNum(),
        this.customValidator.notOnlySpChar(),
        Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
      ]),
      desc: new FormControl(null, []),
    });
  }

  ngOnInit() {
    
  }
  get registerFormControl() {
    return this.registerFormTeam.controls;
  }
  onSubmit(){
    if (this.registerFormTeam.invalid) {
      this.registerFormControl.teamName.markAsDirty();
      this.registerFormControl.desc.markAsDirty();
      this.isTermsChecked=false;
      return;
    }
    // let data: createTeam = {
    //   name:this.registerFormTeam.value.teamName,
    //   hierarchy_type:"W7F+x+sPZUPsCAcXwYSH5Q==",
    //   desc:this.registerFormTeam.value.teamName
    // };
    // this.authHttp.createTeam(data).subscribe(
    //   (response) => {
        
    //     if (response.success) {
    //       //  store data to local storage to process request in form two with same data
    //       //this.router.navigate([this.returnUrl]);
    //       //this.serverErrorMessage = response.data;
    //       //location.reload();
    //       //this.registerFormTeam.reset();
    //       //this.router.navigate([this.returnUrl]);
    //       this.router.navigate([this.returnUrl]).then(() => {
    //         location.reload();
    //       });
    //       //this.returnUrl.reload();
    //     } else {
    //       this.serverErrorMessage = response.data;
    //       this.hasError=true;
    //       //location.reload();
    //     }
    //   },
    //   (_) => {
    //     this.serverErrorMessage = environment.errorMessage;
    //   }
    // );
  }
  onCheckboxChange(evt:boolean){
    this.isTermsChecked=evt;
  }
  activate(){
    this.isTermsChecked=true;
  }
  showDescription(){
    this.showDesc=true;
    this.hideDescText=false;
  }

}
