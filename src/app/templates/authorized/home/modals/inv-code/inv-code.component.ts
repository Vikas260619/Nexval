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
  selector: 'app-inv-code',
  templateUrl: './inv-code.component.html',
  styleUrls: ['./inv-code.component.scss']
})
export class InvCodeComponent implements OnInit {
  InvSubscription: Subscription | null;
  addTeamInviteModal: Modal | null = null;
  invForm: FormGroup;
  serverErrorMessage:string='';
  serverError:boolean=false;

  constructor(private authHttp: AuthHttpService,
    private customValidator: ValidateService,
    private router: Router,
    private store: StoreService,
    private eventEmitterService: EventEmitterService) { 
      this.invForm = new FormGroup({
        invCode: new FormControl(null, [Validators.required]),
       
      });
    }

  ngOnInit(): void {
    this.InvSubscription =
    this.eventEmitterService.InvEventEmitter2.subscribe((status) => {
      if (status) this.openInviteModal();
      console.log(status);
    });
  }
  ngAfterViewInit(): void {
    this.addTeamInviteModal = new Modal(this.addTeamModalEle?.nativeElement);
    //console.log(this.memberInviteModal);
  }
  get invControls() {
    return this.invForm.controls;
  }
  onSubmit() {
    if (this.invForm.invalid) {
      this.invControls.invCode.markAsDirty();
      return;
    }
    let data:any={
      email: this.store.getEmailFromLocal(),
      pass_code:this.invForm.value.invCode
    }
    this.authHttp.verifyInvCode(data).subscribe(
      (response) => {
        console.log(response.data);
        if (!response.success) {
          this.serverError=true;
          //this.serverErrorMessage = response.message;
          this.serverErrorMessage = 'Invitation code is not valid.';
          return;
        } else {
          this.serverErrorMessage='';
          this.closeInviteModal();
        }
      },
      (_) => {
       
      }
    );
  }
  @ViewChild('inv_code', { static: false })
  addTeamModalEle: ElementRef | null = null;

  openInviteModal() {
    if (this.addTeamModalEle) this.addTeamInviteModal.show();
  }

  closeInviteModal() {
    if (this.addTeamModalEle) this.addTeamInviteModal.hide();
  }
  onCancel(){
    this.router.navigate(['/signup/user-signup']);
  }

}
