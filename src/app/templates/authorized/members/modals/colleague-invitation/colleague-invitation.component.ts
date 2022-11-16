import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { ValidateService } from 'src/app/service/validate.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { StoreService } from 'src/app/service/store.service';
import { colleagueInvitation } from 'src/app/interfaces/signup.interface';
import { environment } from 'src/environments/environment';
import { ColleagueAutocompleteComponent } from '../../../colleague-autocomplete/colleague-autocomplete.component';

@Component({
  selector: 'app-colleague-invitation',
  templateUrl: './colleague-invitation.component.html',
  styleUrls: ['./colleague-invitation.component.scss'],
})
export class ColleagueInvitationComponent implements OnInit, AfterViewInit {
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
      this.eventEmitterService.colleagueInviteEventEmitter.subscribe(
        (status) => {
          if (status) this.openInvitationSendModal();
        }
      );
  }
  get inviteMemberFormControl() {
    return this.inviteMember.controls;
  }
  onSubmit() {
    this.invEmailString = JSON.parse(
      localStorage.getItem('invited_colleague_emails')
    );
    let data: colleagueInvitation = {
      email: this.invEmailString,
      hierarchyid: localStorage.getItem('regions_id'),
    };

    this.authHttp.postColleagueInvitation(data).subscribe(
      (response) => {
        if (response.success) {
          //this.serverErrorMessage = response.data;
          this.closeInvitationSendModal();
          //location.reload();
          this.inviteMember.reset();
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
  @ViewChild('invite_colleague_modal', { static: false })
  inviteMemberModalEle: ElementRef | null = null;

  openInvitationSendModal() {
    //console.log('open');
    //this.selectedTeamName = localStorage.getItem('selectedTeamName');
    this.serverErrorMessage = '';
    if (this.inviteMemberModalEle) this.memberInviteModal.show();
  }

  closeInvitationSendModal() {
    localStorage.removeItem('invited_colleague_emails');
    this.errMsg = false;
    this.eventEmitterService.colleagueInvCloseEventEmitter.emit(true);
    //location.reload();
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
