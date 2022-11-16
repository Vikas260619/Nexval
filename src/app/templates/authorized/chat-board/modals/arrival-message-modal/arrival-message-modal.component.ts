import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArrivalMessageService } from 'src/app/service/arrival-message.services';
import { addArrivalMessage } from 'src/app/interfaces/arrival-message.interface'
import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';


@Component({
  selector: 'app-arrival-message-modal',
  templateUrl: './arrival-message-modal.component.html',
  styleUrls: ['./arrival-message-modal.component.scss']
})
export class ArrivalMessageModalComponent implements OnInit {
  userId: string = '';
  arrivalMessages: string = '';
  inputChange: boolean = false;
  alphabateValidator: boolean = false;
  removeValidator: boolean = false;

  arrivalMessageModelSubscription: Subscription | null;
  arrivalMessageInviteModal: Modal | null = null;

  constructor(
    private arrivalMessage: ArrivalMessageService,
    private eventEmitterService: EventEmitterService,
  ) { }

  ngAfterViewInit(): void {
    this.arrivalMessageInviteModal = new Modal(this.arrivalMessageInviteModal?.nativeElement);
    //console.log(this.memberInviteModal);
  }

  ngOnInit(): void {
    this.arrivalMessageModelSubscription =
    this.eventEmitterService.arrivalMessageEventEmitter.subscribe((status) => {
      if (status) this.openTeamCreateModal();
      console.log(status);
    });
  }

  @ViewChild('arrival_message_modal', { static: false })
  arrivalMessageModalEle: ElementRef | null = null;

  openTeamCreateModal() {
    if (this.arrivalMessageModalEle) this.arrivalMessageInviteModal.show();
  }

  closeArrivalMessageModal() {
    if (this.arrivalMessageModalEle) this.arrivalMessageInviteModal.hide();
  }

  async getArrivalMessage (){
    this.removeValidator = true;
    console.log(this.removeValidator)
    let data: any = {}
    this.arrivalMessage.getArrivalMessage(data).subscribe(
      (response) => {
        this.arrivalMessages = response.data[0].arrival_msg;
        this.userId = response.data[0].id;
      }
    )
  }

  changeInput (){
    this.inputChange = true
    this.removeValidator = true
    console.log(this.removeValidator)
  }

  async addArrivalMessage () {
    let data: addArrivalMessage = {
      id: this.arrivalMessages != "" ? this.userId : "",
      arrival_msg: this.arrivalMessages.trim(),
    };
    console.log(data)

    this.arrivalMessage.addArrivalMessage(data).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }

  alphabateOnly (e: any) {  // Accept only alpha numerics, not special characters 
    var inp = String.fromCharCode(e.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z ]/.test(inp)) {
      this.alphabateValidator = false;
      return true;
    } else {
      e.preventDefault();
      this.alphabateValidator = true;
      return false;
    }
  }

  removeValidatorFun(){
   this.removeValidator = false;
   this.alphabateValidator = false;
   this.getArrivalMessage()
   console.log(this.removeValidator)
  }

}
