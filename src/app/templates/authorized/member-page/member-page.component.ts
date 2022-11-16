import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { MemberService } from 'src/app/service/member.service';
import { Router } from '@angular/router';
import { teamwiseMemberList } from 'src/app/interfaces/signup.interface';
import { timer, Subscription } from 'rxjs';
import * as SendBird from 'sendbird';


@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss']
})
export class MemberPageComponent implements OnInit {
  user: boolean = true;
  userRole:string='';
  user_id:any;
  @Input()
   membersCount: any;
   @Input()
   members: any;
   masterSelected:boolean;
   checklist:any;
   checkedList:any = [];
   teamId: string = '';
   isDeleted: boolean = false;
   isUndo: boolean = false;
   timer: any;
   counter = 20;
   tick = 1000;
   countDown: Subscription | null = null;
   channel: any;
   selectedMembers: any = [];
   adminName: string = '';


  constructor( private authHttp: AuthHttpService,
    private eventEmitter: EventEmitterService,
    private MemberService: MemberService,
    private router: Router,
    ) { }

    ngAfterViewInit() {
      this.activateCountDown();
    }

    activateCountDown() {
      this.countDown = timer(0, this.tick).subscribe(() => {
        if (this.counter > 0) {
          --this.counter;
        } else {
          this.isDeleted = false;
          return false;
        }
      });
    }
  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeam');
    this.adminName = localStorage.getItem('fullname');
    this.user_id = localStorage.getItem('id');
    this.userRole=localStorage.getItem('user-role');
    if (
      localStorage.getItem('user-role') != null &&
      localStorage.getItem('user-role') == 'SUPERADMIN'
    ) {
      this.user = false;
    }
    
    
    this.eventEmitter.InviteMemberEmitter.subscribe((_) => {
      this.getMembers();
    });
    this.sbGetGroupChannel(localStorage.getItem('channel_url'));
  }

  sbGetGroupChannel(channelUrl: any) {
    return new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      console.log(sb);
      sb.GroupChannel.getChannel(channelUrl, (channel: any, error) => {
        if (channel.url === channelUrl) {
          this.channel = channel;
          if (error) {
            reject(error);
          } else {
            resolve(channel);
          }
        }
      });
    });
  }

  sbSendTextMessage = (
    channel: any,
    textMessage: string = ''
  ) => {
    const sb = SendBird.getInstance();
    const PARAMS = new sb.UserMessageParams();
    PARAMS.message = textMessage;
    PARAMS.data = 'user Removed';
    channel.sendUserMessage(PARAMS,
      async (message: any, error: any) => {
        if (!error) {
          textMessage = message.message;
          // this.textMessage = '';
          // await this.sbPreviousMessages();
          // this.textMessage = '';
          // this.eventEmitter.emitMessageList();
          // this.previewImage = false;
          // this.inputChange = false;
        } else {
          console.log(error);
        }
      }
    );
  }

  getMembers(){
    let data: teamwiseMemberList = {
      hierarchyid: this.teamId,
    };
    this.authHttp.teamwiseMemberList(data).subscribe(
      (response) => {
        if (response.success) {
          //  store data to local storage to process request in form two with same data
          response.data.forEach(object => {
            object.isSelected = false;
          });
          this.members = response.data;
          this.membersCount = this.members.length;
          this.getCheckedItemList();
          
          //this.removeById(this.members, this.id);
          //console.log(this.members.length);
          //console.log(response.data);
        } else {
        }
      },
      (_) => {}
    );
    this.masterSelected = false;
  }
  openUserAttendenceModal(event) {
    localStorage.setItem('current_clicked_user_name', event.target.nm);
    localStorage.setItem('current_clicked_user_lname', event.target.nm2);
    localStorage.setItem('current_clicked_punch_type', event.target.punch_type);
    localStorage.setItem(
      'current_clicked_checkin_lat',
      event.target.checkin_lat
    );
    localStorage.setItem(
      'current_clicked_checkin_long',
      event.target.checkin_long
    );
    localStorage.setItem(
      'current_clicked_checkout_lat',
      event.target.checkout_lat
    );
    localStorage.setItem(
      'current_clicked_checkout_long',
      event.target.checkout_long
    );
    localStorage.setItem(
      'current_clicked_checkin_address',
      event.target.checkin_address
    );
    localStorage.setItem(
      'current_clicked_checkout_address',
      event.target.checkout_address
    );
    localStorage.setItem(
      'current_clicked_latest_check_in',
      event.target.latest_checkin
    );
    localStorage.setItem(
      'current_clicked_latest_check_out',
      event.target.latest_checkout
    );
    localStorage.setItem(
      'current_clicked_user_image',
      event.target.user_image
    );

    this.eventEmitter.userAttendenceModalEventEmitter.emit(true);
  }
  openInvitationSendModal() {
    this.eventEmitter.memberInviteEventEmitter.emit(true);
  }

  getMemberToRemove(){
    this.counter = 15;
    this.tick = 1000;
    this.isDeleted = true;
    if(this.isDeleted && !this.isUndo){
      setTimeout(()=>{  
        let data: any = {
          hierarchy_id: localStorage.getItem('selectedTeam'),
          userId: this.checkedList
        }
        this.MemberService.deleteMember(data).subscribe(
          (response) => {
            if(response.success){
              this.getMembers();
              for(var i = 0; i < this.selectedMembers.length; i++){
                this.sbSendTextMessage(this.channel, `${this.selectedMembers[i]} removed by ${this.adminName}`)
              }
             }else{
             console.log(response.message)
             }
          }
        )                        
        this.isDeleted = false;
        console.log(this.selectedMembers);
       
    }, 15000);
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.members.length; i++) {
      this.members[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.members.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedList = [];
    this.selectedMembers = [];
    for (var i = 0; i < this.members.length; i++) {
      if(this.members[i].isSelected){
        this.checkedList.push(this.members[i].id);
        this.selectedMembers.push(this.members[i].sendbird_user_details.nickname)
      } 
    }
    // this.checkedList = JSON.stringify(this.checkedList);
  }

  async undoClick(){
    this.isDeleted = false
    this.isUndo = true;
   
    this.masterSelected = await this.members.forEach(object => {
      object.isSelected = false;
    });
    this.getCheckedItemList();
    this.checkedList = [];
  }
  
}
