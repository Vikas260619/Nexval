import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { StoreService } from 'src/app/service/store.service';
import { createTeam } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';

import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  registerFormTeam: FormGroup;
  isTermsChecked: boolean = false;
  serverErrorMessage: string | null = null;
  returnUrl: string = '';
  hasError: boolean = false;
  showDesc: boolean = false;
  hideDescText: boolean = true;

  addTeamModelSubscription: Subscription | null;
  addTeamInviteModal: Modal | null = null;
  sameUser: boolean = false;
  errMsg: boolean = false;
  inList: boolean = false;
  showButton: boolean = true;
  invEmailString:string='';
 

  muteStream() {
    if (document.getElementById('wrapper').classList.contains('sidebarHide')) {
      document.getElementById('wrapper').classList.remove('sidebarHide');
    } else {
      document.getElementById('wrapper').classList.add('sidebarHide');
    }

    if (
      document
        .getElementById('fixscroll')
        .classList.contains('fixscrollsidebarHide')
    ) {
      document
        .getElementById('fixscroll')
        .classList.remove('fixscrollsidebarHide');
    } else {
      document
        .getElementById('fixscroll')
        .classList.add('fixscrollsidebarHide');
    }
  }

  constructor(
    private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private eventEmitterService: EventEmitterService
  ) {
    this.registerFormTeam = new FormGroup({
      teamName: new FormControl(null, [
        this.customValidator.notOnlyNum(),
        this.customValidator.notOnlySpChar(),
        Validators.required,
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        Validators.maxLength(50),
      ]),
      desc: new FormControl(null, []),
    });
  }
  ngAfterViewInit(): void {
    this.addTeamInviteModal = new Modal(this.addTeamModalEle?.nativeElement);
    //console.log(this.memberInviteModal);
  }

  ngOnInit(): void {
    this.addTeamModelSubscription =
      this.eventEmitterService.addTeamEventEmitter.subscribe((status) => {
        if (status) this.openTeamCreateModal();
        console.log(status);
      });
  }

  get registerFormControl() {
    return this.registerFormTeam.controls;
  }
  onSubmit() {
    this.invEmailString = JSON.parse(localStorage.getItem('invited_emails'));
    if (this.registerFormTeam.invalid) {
      this.registerFormControl.teamName.markAsDirty();
      this.registerFormControl.desc.markAsDirty();
      this.isTermsChecked = false;
      return;
    }
    let data: createTeam = {
      name: this.registerFormTeam.value.teamName,
      hierarchy_type: 'W7F+x+sPZUPsCAcXwYSH5Q==',
      desc: this.registerFormTeam.value.desc,
      invitedemail: this.invEmailString
    };
    this.authHttp.createTeam(data).subscribe(
      (response) => {
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          //this.router.navigate([this.returnUrl]);
          //this.serverErrorMessage = response.data;
          //location.reload();
          this.closeTeamCreateModal();
          this.registerFormTeam.reset();
          this.eventEmitterService.emitAddTeamEvent();
        } else {
          this.serverErrorMessage = response.message;
          this.hasError = true;
          //location.reload();
        }
      },
      (_) => {
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }
  onCheckboxChange(evt: boolean) {
    this.isTermsChecked = evt;
  }
  activate() {
    this.isTermsChecked = true;
  }

  @ViewChild('add_team_modal', { static: false })
  addTeamModalEle: ElementRef | null = null;

  openTeamCreateModal() {
    if (this.addTeamModalEle) this.addTeamInviteModal.show();
  }

  closeTeamCreateModal() {
    localStorage.removeItem('invited_emails');
    this.eventEmitterService.memberInvCloseEventEmitter.emit(true);
    this.registerFormTeam.reset();
    if (this.addTeamModalEle) this.addTeamInviteModal.hide();
  }

  showDescription() {
    this.showDesc = true;
    this.hideDescText = false;
  }

  changeError(event: boolean) {
    this.errMsg = event;
  }
  buttonVisible(event: boolean) {
   // this.showButton = event;
  }
  sameUserCheck(event: boolean) {
    console.log(event);
    this.sameUser = event;
  }
  alreadyInList(event: boolean) {
    console.log('++++TTTT' + event);
    this.inList = event;
  }
  
}
