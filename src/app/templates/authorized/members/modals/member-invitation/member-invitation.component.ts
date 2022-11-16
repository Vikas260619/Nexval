import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { StoreService } from 'src/app/service/store.service';
import { invitation } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { TestAutocompleteComponent } from '../../../test-autocomplete/test-autocomplete.component';

@Component({
  selector: 'app-member-invitation',
  templateUrl: './member-invitation.component.html',
  styleUrls: ['./member-invitation.component.scss'],
})
export class MemberInvitationComponent implements OnInit, AfterViewInit {
  inviteMember: FormGroup;
  isTermsChecked: boolean = false;
  serverErrorMessage: string | null = null;
  returnUrl: string = '';
  memberInviteModelSubscription: Subscription | null;
  memberInviteModal: Modal | null = null;
  teamId: string | null;
  invEmail = [];
  selectedTeamName: string = '';
  invEmailString: string = '';
  errMsg: boolean = false;
  showButton: boolean = true;
  sameUser: boolean = false;
  inList: boolean = false;
  regionName: string = '';

  constructor(
    private authHttp: AuthHttpService,
    private eventEmitterService: EventEmitterService,
    private store: StoreService,
    private customValidator: ValidateService
  ) {
    this.teamId = '';
    this.inviteMember = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        this.customValidator.multipleEmail(),
      ]),
    });
  }

  ngAfterViewInit(): void {
    this.memberInviteModal = new Modal(
      this.inviteMemberModalEle?.nativeElement
    );
    //console.log(this.memberInviteModal);
  }

  ngOnInit(): void {
    this.selectedTeamName = localStorage.getItem('selectedTeamName');
    this.regionName = localStorage.getItem('region_name');
    this.memberInviteModelSubscription =
      this.eventEmitterService.memberInviteEventEmitter.subscribe((status) => {
        if (status) this.openInvitationSendModal();
      });
  }
  get inviteMemberFormControl() {
    return this.inviteMember.controls;
  }

  onSubmit() {
    this.invEmailString = JSON.parse(localStorage.getItem('invited_emails'));
    //this.errMsg = true;
    this.teamId = this.getTeam();
    // if (this.inviteMember.invalid) {
    //   this.inviteMemberFormControl.email.markAsDirty();
    //   return;
    // }
    // let email_val: string = this.inviteMember.value.email;
    // var strArr = email_val.split(',');
    // if (strArr.length > 1) {
    //   for (let i = 0; i < strArr.length; i++) {
    //     if (this.invEmail.indexOf(strArr[i]) == -1) {
    //       this.invEmail.push(strArr[i]); //use i instead of 0
    //     }
    //   }
    // } else {
    //   if (this.invEmail.indexOf(email_val) == -1) {
    //     this.invEmail.push(email_val);
    //   }
    // }

    let data: invitation = {
      id: this.teamId,
      hierarchy_type: 'W7F+x+sPZUPsCAcXwYSH5Q==',
      invitedemail: this.invEmailString,
    };

    this.authHttp.postInvitation(data).subscribe(
      (response) => {
        console.log(response.data);
        if (response.success) {
          //this.serverErrorMessage = response.data;
          this.closeInvitationSendModal();
          this.errMsg = false;
          //location.reload();
          this.inviteMember.reset();
          this.eventEmitterService.InviteMemberEmitter.emit(true);
        } else {
          this.serverErrorMessage = response.message;
        }
      },
      (_) => {
        this.serverErrorMessage = environment.errorMessage;
      }
    );
  }

  ngOnDestroy() {
    if (this.memberInviteModelSubscription) {
      this.memberInviteModelSubscription.unsubscribe();
    }
  }
  @ViewChild('invite_member_modal', { static: false })
  inviteMemberModalEle: ElementRef | null = null;

  openInvitationSendModal() {
    this.selectedTeamName = localStorage.getItem('selectedTeamName');
    this.serverErrorMessage = '';
    if (this.inviteMemberModalEle) this.memberInviteModal.show();
  }

  closeInvitationSendModal() {
    localStorage.removeItem('invited_emails');
    this.errMsg = false;
    //location.reload();
    
    this.eventEmitterService.memberInvCloseEventEmitter.emit(true);
    if (this.inviteMemberModalEle) this.memberInviteModal.hide();
  }
  getTeam() {
    return this.store.getTeamFromLocal();
  }
  changeError(event: boolean) {
    this.errMsg = event;
  }
  buttonVisible(event: boolean) {
    this.showButton = event;
  }
  sameUserCheck(event: boolean) {
    this.sameUser = event;
  }
  alreadyInList(event: boolean) {
    console.log('++++TTTT' + event);
    this.inList = event;
  }
}
