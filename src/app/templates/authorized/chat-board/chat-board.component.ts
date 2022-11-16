import { APP_ID } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import * as SendBird from 'sendbird';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { interval } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-uploaded-sevices';
import { teamwiseMemberList } from 'src/app/interfaces/signup.interface';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { teamList } from 'src/app/interfaces/signup.interface';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IndividualCollabUploadFileService } from 'src/app/service/IndividualCollabUploadFile.services';



@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss'],
})
export class ChatBoardComponent implements OnInit, OnChanges {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('imgref') private imgTag: ElementRef;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() isUndoClickChild = new EventEmitter<boolean>();
  @Input()
  ChannelId: any;
  nickName: string = '';
  tm1: string = '';
  sb;
  app_id: string;
  channels;
  channel: any;
  messages: any = [];
  textMessage;
  channelUrl;
  userId;
  @Input() getMessages;
  fetchedMessages;
  sub;
  todayDate;
  currentUser;
  typingMember;
  replyClick: boolean = false;
  perentId: null;
  perentText;
  perentTime;
  perentSender;
  // filenames: string[] = [];
  url: string;
  file: any[] = [];
  base64Image: any;
  allMessage: any;
  getApiMemberList: any = [];
  application_id: string = '';
  nick: string = '';
  c_url: string = '';
  u_id: string = '';
  t: string = '';
  groupCreatedAt: string = '';
  images: any[] = [];
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: any[] = [];
  imageInfos?: Observable<any>;
  filenames: string[] = [];
  previewImage: boolean = false;
  modelData: any;
  modelFileData: any;
  isEdited: boolean = false;
  editedMessageId: any;
  isDeleted: boolean = false;
  isUndo: boolean = false;
  isUndoClick: boolean = false;
  tick: any;
  scrollHeight: any;
  deliveryMessageId: any;
  inputChange: any;
  currentTeam: any;
  id: any;
  currentTeamData: any;
  teamId: any;
  membersCount: any;
  members: any;
  profileUrl: any;
  isForword: boolean = false;
  selectColleague: boolean = false;
  setChannelUrl: any;
  targetChannel: any;
  targetCollegueChannel: any;
  teamListData: any;
  fileteMessageById: any;
  isSelected: boolean = false;
  colleagueListData: any;
  collegueAndTeamArray: any;
  perentPlainUrl: any;
  perentName: any;
  perentMessageType: any;
  new: any = [];
  buttonClass: any;
  // toggle = true;
  selectedData: any = [];
  errorMessage: string = '';
  perentType: any;
  teamListArr: any = [];
  currentFileType: any;
  groupChannelListQueryNew: any;
  isCheckFileSupport: any;
  memberList: any = [];
  messageType: string = '';
  userRole: any;
  teams: any = [];
  filterMembers: any = [];
  clickSendButton: boolean = false;
  progressInfo: any;
  emptyErrorMessage: boolean = false;

  constructor(
    private authHttp: AuthHttpService,
    private eventEmitter: EventEmitterService,
    private uploadService: FileUploadService,
    private IndividualCollabUploadFile: IndividualCollabUploadFileService,
  ) {
    // this.sub = interval(2000).subscribe((val) => {
    //   this.sbPreviousMessages();
    // });
  }

  data: any = {
    offset: 0,
    limit: '10',
    userlimit: '3',
  };

  colleagueData: any = {};

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   this.fetchedMessages = changes.getMessages;
  //   this.messages = [];
  //   for (let i = 0; i < changes.getMessages.currentValue.length; i++) {
  //     this.currentUser = changes.getMessages.currentValue[i]._sender.nickname;
  //     this.messages.push({
  //       sender: `${changes.getMessages.currentValue[i]._sender.nickname}`,
  //       text: `${changes.getMessages.currentValue[i].message}`,
  //       createdAt: `${changes.getMessages.currentValue[i].createdAt}`,
  //     });
  //   }
  // }

  ngAfterViewInit(): void {
    this.getTeam();
    this.getColleagueList();
  
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getAllUserData();
    this.application_id = changes.ChannelId.currentValue.appId;
    this.nick = changes.ChannelId.currentValue.nickName;
    this.c_url = changes.ChannelId.currentValue.channel_url;
    this.u_id = changes.ChannelId.currentValue.user_id;
    this.t = changes.ChannelId.currentValue.tm1;
    this.groupCreatedAt = changes.ChannelId.currentValue.groupCreatedAt;
    this.app_id = this.application_id;
    this.nickName = this.nick;
    this.channelUrl = this.c_url;
    this.userId = this.u_id;
    this.sbConnect(this.nickName);
    this.scrollToBottom();
    this.todayDate = new Date();
    this.createChatHandler(this.channelUrl);
    // this.sbPreviousMessages();
    this.sbGetGroupChannel(this.channelUrl);
   
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user-role')
    this.teams = JSON.parse(localStorage.getItem('teams'));
    // console.log(this.userRole)
    this.getAllCollabUsers()
    this.groupChannelListQueryNew = this.sbCreateGroupChannelListQuery();
    this.sbGetGroupChannelList(this.groupChannelListQueryNew);
    // this.uploadProgress = this.uploadService.uploadProgress;
    // this.imageInfos = this.uploadService.getFiles()
    this.teamId = localStorage.getItem('selectedTeam');

    this.sbConnect(this.nickName);
    window.onscroll = function () {
      myFunction();
    };

    var navbar = document.getElementById('navbar');
    var sticky = navbar.offsetTop;
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    }

    this.currentTeam = localStorage.getItem('current-team');
    this.id = localStorage.getItem('id');
    if (this.currentTeam != null) {
      this.currentTeamData = JSON.parse(this.currentTeam);
      this.currentTeam = this.currentTeamData.name;
      this.teamId = this.currentTeamData.id;
    } else {
      this.currentTeam = localStorage.getItem('selectedTeamName');
      this.teamId = localStorage.getItem('selectedTeam');
    }
    this.getAllUserData();
    this.getTeam();
    this.getColleagueList();
  }

  async getTeam () {
    this.authHttp.getTeamList(this.data).subscribe(
      (response) => {
        this.teamListData = response.data;
        this.teamListData.forEach((element) => {
          element.toggle = false;
          element.status = 'Select'
        });
        this.currentTeam = '';
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
  }

  getAllUserData(){
    let data: teamwiseMemberList = {
      hierarchyid: this.teamId,
    };
    this.authHttp.teamwiseMemberList(data).subscribe(
      (response) => {
        if (response.success) {
          this.members = response.data;
          this.membersCount = this.members.length;
        } else {
        }
      },
      (_) => {} 
    );
  }

  getColleagueList(){
    this.authHttp.getColleagueList(this.colleagueData).subscribe(
      (response) => {
        // this.colleagueListData = response.data;
        this.colleagueListData.forEach((element) => {
          element.toggle = false;
          element.status = 'Select'
        });
        if(this.teamListData.length > 0 || this.colleagueListData.length > 0){
          // this.collegueAndTeamArray = this.teamListData.concat(this.colleagueListData);
        }
      }
      )
  }

  getUserProfilePicture =  (messages: any) => {
    for (let message of messages) {
      for (let member of this.members) {
        if (member?.sendbird_user_details?.user_id == message?.userId) {
          message.userPic = member?.userpicture
            ? { uri: member?.userpicture }
            : '';
          message.designation = member?.role_name
            ? { designation: member?.role_name }
            : '';
            message.latest_punch_type = member?.latest_punch_type
            ? { latest_punch_type: member?.latest_punch_type }
            : '';
        }
      }
    }
  };

  getModelMessage(message: any) {
    this.modelData = message;
  }

  getModelfile(message: any) {
    this.modelFileData = message;
  }
  download(modelData: any) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', modelData.plainUrl);
    link.setAttribute('download', modelData.name);
    document.body.appendChild(link);
    link.click();
    // link.remove();
  }

  getShortName(name: any) {
    if(name){
     return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
  }

  getShortNameForLong(name: any){
    if(name)
      {
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

            let initials = [...name.matchAll(rgx)] || [];

            initials = (
              (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
            ).toUpperCase();
            return initials;
      }  
    }

  //   ngAfterViewChecked() {
  //     this.scrollToBottom();
  // }

  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = '100vh'
  //       // this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch (err) {}
  // }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
      this.scrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

    sbConnect(nickName: any) {
      this.nickName = nickName;
      this.sb = new SendBird({ appId: this.app_id, localCacheEnabled: true });
      this.sb
        .connect(this.userId, nickName)
        .then((res) => {
          console.log('connected');
          this.sbListOfGroupChannels();
          this.sbMarkAsRead(this.channelUrl, this.channel);
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }

  sbGetGroupChannel(channelUrl: any) {
    return new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      sb.GroupChannel.getChannel(channelUrl, (channel: any, error) => {
        if (channel.url === channelUrl) {
          this.channel = channel;
          this.sbPreviousMessages();
          if (error) {
            reject(error);
          } else {
            resolve(channel);
          }
        }
      });
    });
  }

  sbGetGroupChannel1(channelUrl: any) {
     new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      
      sb.GroupChannel.getChannel(channelUrl, (channel: any, error) => {
        this.targetChannel = channel;
        this.teamListArr.push(channel);
      });
    });
  }

  sbCreateChannelWithUserIds = (userIds = []) => {
     new Promise((resolve, reject) => {
      const sb = SendBird.getInstance();
      sb.GroupChannel.createChannelWithUserIds(
        userIds,
        true,
        (createdChannel, error) => {
          if (error) {
            console.log('error', error);
            reject(error);
          } else {
            this.targetCollegueChannel = createdChannel;
            this.teamListArr.push(createdChannel);
            resolve(createdChannel);
          }
        },
      );
    });
  };
  

  async sbPreviousMessages(LIMIT = 50) {
    if (this.channel.url === this.channelUrl) {
      const listQuery = await this.channel.createPreviousMessageListQuery();
      listQuery.includeReplies = true;
      listQuery.includeParentMessageInfo = true;
      listQuery.includeParentMessageText = true;
      await listQuery
        .load(LIMIT, false)
        .then((res) => {
          this.allMessage = res;
          this.messages = [];
          for (let i = 0; i < res.length; i++) {
            this.getUnreadCount(res[i]);
            let status;
            if(localStorage.getItem(res[i]._sender.userId)!=null){
               status=localStorage.getItem(res[i]._sender.userId);
            }
            
            this.messages.push({
              sender: `${res[i]._sender.nickname}`,
              text: `${res[i].message}`,
              createdAt: `${res[i].createdAt}`,
              messageId: `${res[i].messageId}`,
              customType: `${res[i].customType}`,
              parentMessage: {
                parentMessageText: res[i].parentMessageText,
                parentMessageSender:
                  res[i].parentMessage != null
                    ? res[i].parentMessage._sender.nickname
                    : null,
                parentMessageTime:
                  res[i].parentMessage != null
                    ? res[i].parentMessage.createdAt
                    : null,
                perentType: res[i].parentMessage != null
                ? res[i].parentMessage.type
                : null,
                parentMessageType: res[i].parentMessage != null
                ? res[i].parentMessage.messageType
                : null,
              },
              plainUrl: res[i].plainUrl && res[i].plainUrl,
              messageWithImage: res[i].data && res[i].data,
              type: res[i].type && res[i].type,
              name: res[i].name && res[i].name,
              updatedAt: res[i].updatedAt && res[i].updatedAt,
              messageType: res[i].messageType && res[i].messageType,
              userId: res[i]._sender.userId && res[i]._sender.userId,
              st:status,
              isImage: res[i].type?.match(/^image\/.+$/) ? true : false,
              isFile: res[i].type?.match(/^text\//) || res[i].type?.match(/^application\//) || res[i].type?.match(/^audio\//) ? true : false,
              data: res[i].data && res[i].data
            });
          }
          //console.log(this.messages)
          this.getUserProfilePicture(this.messages);
          this.sbMarkAsRead(this.channelUrl, this.channel);
          localStorage.setItem('collab-chat', JSON.stringify(this.messages));
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  sbListOfGroupChannels() {
    var listQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
    listQuery.includeEmpty = true;
    listQuery.memberStateFilter = 'joined_only';
    listQuery.order = 'latest_last_message';
    listQuery.limit = 15;
    if (listQuery.hasNext) {
      listQuery
        .next()
        .then((res) => {
          this.sbGetGroupChannel(this.channelUrl);
          this.channels = [];
          let i = 1;
          res.forEach((channel) => {
            channel.name = channel.name + ` ${i}`;
            this.channels.push(channel);
            i++;
          });
        })
        .catch((err) => {
          console.log('err sbListOfGroupChannels', err);
        });
    }
  }
 AvoidSpace(event) {
    var k = event.which;
    if (k == 32) return false;
}

  sbSendTextMessage = (
    channel: any,
    textMessage: string = this.textMessage
  ) => {
    if(!this.inputChange){
      this.emptyErrorMessage = true
    }
    console.log(this.emptyErrorMessage)
    this.clickSendButton = true;
    this.replyClick = false;
    const sb = SendBird.getInstance();
    
    if (!this.previewImage && !this.isEdited && this.inputChange) {
      const PARAMS = new sb.UserMessageParams();
      if (this.perentId) {
        PARAMS.parentMessageId = Number(this.perentId);
        PARAMS.message = textMessage;
      } else {
        PARAMS.message = textMessage;
      }
      let messageDetail = this.perentId ? PARAMS : PARAMS;
      this.perentId = null;
      channel.sendUserMessage(
        messageDetail,
        async (message, error: any) => {
          if (!error) {
            this.clickSendButton = false;
            this.textMessage = message.message;
            this.textMessage = '';
            await this.sbPreviousMessages();
            this.textMessage = '';
            this.eventEmitter.emitMessageList();
            this.previewImage = false;
            this.inputChange = false;
          } else {
            console.log(error);
          }
        }
      );
    } else if (this.isEdited && this.inputChange) {
      channel.updateUserMessage(
        this.editedMessageId,
        this.textMessage,
        null,
        null,
        (response, error) => {
          //console.log(response);
          if (error) console.log('message not edited');
          console.log('message edited');
          this.textMessage = '';
          this.isEdited = false;
          this.clickSendButton = false;
          this.isDeleted = false;
          this.isUndoClick = false;
          this.inputChange = false;
          this.sbPreviousMessages();
        }
      );
    }else {
      const params = new sb.FileMessageParams();
      // params.file = file; // Or .fileUrl = FILE_URL (You can also send a file message with a file URL.)
      var count = this.file.length - 1;
      for (var i = 0; i < this.file.length; i++) {
        params.fileUrl = this.file[i].file_url; // Or .fileUrl = FILE_URL (You can also send a file message with a file URL.
        params.fileName = this.file[i].file_name;
        // params.fileSize = file.size;
        params.thumbnailSizes = [
          { maxWidth: 100, maxHeight: 100 },
          { maxWidth: 200, maxHeight: 200 },
        ];
        // params.customType = 'Image';
        if (count == i) params.data = this.textMessage ? this.textMessage : '';
        params.mimeType = this.file[i].type;
        //console.log(params.data)
        // params.mentionType = 'channel'; // Either 'users' or 'channel'
        // params.pushNotificationDeliveryOption = 'default'; // Either 'default' or 'suppress'

        // CustomType, Data, etc. You can include all of them into 'params'
        channel.sendFileMessage(params, async (message, error) => {
         // console.log(message)
          if (!error) {
            this.clickSendButton = false;
            this.textMessage = '';
            await this.sbPreviousMessages();
            this.textMessage = '';
            this.eventEmitter.emitMessageList();
            this.previewImage = false;
            this.file = [];
            this.previews = [];
            this.inputChange = false;
            this.previewImage = false;
          } else {
            console.log(error);
          }
        });
      }
    }
  };

  createChatHandler = (channelUrl) => {
    // return this.sbGetGroupChannel(channelUrl).then(channel => {
    this.registerGroupChannelHandler(channelUrl);
    // })
  };

  registerGroupChannelHandler = (channelUrl) => {
    const sb = SendBird.getInstance();
    let channelHandler: any = new sb.ChannelHandler();
    channelHandler.onTypingStatusUpdated = (channel) => {
      if (channel.url === channelUrl) {
        this.sbIsTyping(channel);
      }
    };
    channelHandler.onReadReceiptUpdated = (channel) => {
      if (channel.url === channelUrl) {
        this.sbPreviousMessages();
        //console.log('message is read');
        this.allMessage;
      }
    };

    channelHandler.onDeliveryReceiptUpdated = (channel) => {
      if (channel.url === channelUrl) {
        this.sbPreviousMessages();
        //console.log('message is delivered');
        this.allMessage;
        // this.tick = 1
      }
    };
    channelHandler.onUndeliveredMemberCountUpdated = (channel) => {
      if (channel.url === channelUrl) {
        this.sbPreviousMessages();
        //console.log('message is delivered');
        this.allMessage;
      }
    };

    sb.addChannelHandler(channelUrl, channelHandler);
  };

  sbIsTyping = (channel) => {
    if (channel.isTyping()) {
      // this.typingStart(channel.url);
      const typingMembers = channel.getTypingMembers();
      if (typingMembers.length == 1) {
        this.typingMember = `${typingMembers[0].nickname} is typing...`;
      } else {
        return 'several member are typing...';
      }
    } else {
      this.typingMember = '';
      this.typingEnd(channel.url);
      return '';
    }
  };

  typingStart = (channel) => {
    channel.startTyping();
    this.sbGetGroupChannel(channel.url);
    const result = this.textMessage.replace(/^\s+/g, '');
    if (result !== '' && result.length > 0) {
      this.inputChange = true;
      this.emptyErrorMessage = false
      // this.textAreaScrit()
    }else{
      this.inputChange = false;
    }
  };

  typingEnd = (channelUrl) => {
    this.sbTypingEnd(channelUrl);
  };

  // sbTypingStart = (channelUrl) => {
  //   return new Promise((resolve, reject) => {
  //     this.sbGetGroupChannel(channelUrl)
  //     .then((channel) => {
  //         channel.startTyping();
  //         resolve(channel);
  //       })
  //       .catch(error => reject(error));
  //   });
  // };

  sbTypingEnd = (channelUrl) => {
    return new Promise((resolve, reject) => {
      this.sbGetGroupChannel(channelUrl)
        .then((channel) => {
          // channel.endTyping();
          resolve(channel);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  ReplyFunction = (e) => {
    if(e.target.attributes.messageType.value == 'file'){
      this.perentMessageType = e.target.attributes.messageType.value;
     this.perentName = e.target.attributes.name.value;
    this.perentPlainUrl = e.target.attributes.plainUrl.value;
    this.perentType = e.target.attributes.type.value;
  }
    this.replyClick = true;
    this.perentId = e.target.attributes.mk.value;
    this.perentText = e.target.attributes.text.value;
    this.perentTime = e.target.attributes.cat.value;
    this.perentSender = e.target.attributes.sender.value;
    this.perentMessageType = e.target.attributes.messageType.value;
  };

  closeReply() {
    this.replyClick = false;
  }

  selectFiles(event: any): void {
    this.clickSendButton = false;
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          var previewObj = {
            url: e.target.result,
            type: this.selectedFiles[i].type,
            file_name: this.selectedFiles[i].name,
            isImage: this.selectedFiles[i].type?.match(/^image\/.+$/) ? true : false,
            isFile: this.selectedFiles[i].type?.match(/^text\//) || this.selectedFiles[i].type?.match(/^application\//) || this.selectedFiles[i].type?.match(/^audio\//) && this.selectedFiles[i].type != 'text/javascript'? true : false
          };
          this.currentFileType = this.selectedFiles[i].type,
          this.previews.push(previewObj);
          this.previewImage = true;
          this.isCheckFileSupport = this.previews.filter(el => el.type === 'text/javascript' || el.type === 'video/mp4');
          //console.log(this.isCheckFileSupport)
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    this.uploadFiles();
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if( (this.selectedFiles[i].type?.match(/^text\//) || this.selectedFiles[i].type?.match(/^application\//) || this.selectedFiles[i].type?.match(/^audio\//) || 
        this.selectedFiles[i].type?.match(/^image\/.+$/)) && (this.selectedFiles[i].type != 'text/javascript'))
                    {
                      this.upload(i, this.selectedFiles[i]);
                    }
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file && !localStorage.getItem('selectedColleague')) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            if(this.selectedFiles.length -1 == idx){
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
            this.progressInfo =this.progressInfos[idx].value
          }
            
          } else if (event instanceof HttpResponse) {
            event.body.data[0].type = file.type;
            this.file.push(event.body.data[0]);
            // this.textMessage = file;
            const msg = 'Uploaded the file successfully: ';
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        },
      });
    }else if(file && !localStorage.getItem('selectedTeam')){
      this.IndividualCollabUploadFile.IndividualCollabUploadFileUpload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            if(this.selectedFiles.length -1 == idx){
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
            this.progressInfo =this.progressInfos[idx].value
          }
            
          } else if (event instanceof HttpResponse) {
            event.body.data[0].type = file.type;
            this.file.push(event.body.data[0]);
            // this.textMessage = file;
            const msg = 'Uploaded the file successfully: ';
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        },
      });
    }
  }

  closeImage(e: any) {
    var idx = this.previews.indexOf(e);
    this.previews.splice(idx, 1);
    this.file.splice(idx, 1);
    if (this.previews.length == 0) {
      this.previewImage = false;
    }
    this.isCheckFileSupport = this.previews.filter(el => el.type === 'text/javascript' || el.type === 'video/mp4');
   // console.log(this.isCheckFileSupport)
  }

  // upload(event) {

  //     this.selectedFiles = event.target.files;
  //       this.previews = [];
  //       if (this.selectedFiles && this.selectedFiles[0]) {
  //         const numberOfFiles = this.selectedFiles.length;
  //         for (let i = 0; i < numberOfFiles; i++) {
  //           this.filenames.push(this.selectedFiles[i].name);

  //           const reader = new FileReader();
  //           reader.onload = (e: any) => {
  //             this.previewImage = true;
  //             this.previews.push(e.target.result);
  //           };
  //           reader.readAsDataURL(this.selectedFiles[i]);
  //           this.uploadService.uploadFile(this.selectedFiles[i], this.selectedFiles[i].name);
  //         }
  //     // this.uploadService.uploadFile(files[i], files[i].name);
  //   }
  // }
  downloadImage(modelData) {
    let imageUrl = modelData.plainUrl;
    // let imageUrl =
    // "http://radium-file-storage.s3.amazonaws.com/org_170/Communication/user_773/61b19d7a-8f90-4ec4-8444-afbec8c662ee.jpg";

    this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
      // save image to disk
      var link = document.createElement('a');

      document.body.appendChild(link); // for Firefox

      link.setAttribute('href', this.base64Image);
      link.setAttribute('download', modelData.name);
      // link.setAttribute("download", "mrHankey.jpg");

      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  DeleteMessageFun(event) {
    if(this.isUndoClick != true){
      this.isUndo = false;
    }
    this.isUndoClick = false;
    this.isUndoClickChild.emit(true);
    this.isDeleted = true;
    this.isEdited = true;
    this.editedMessageId = Number(event.target.attributes.mk.value);
    if (event.target.attributes.type.value !== 'file') {
      const sb = SendBird.getInstance();
      const params = new sb.UserMessageParams();
      params.customType = this.isUndo ? '' : 'DELETED';
      this.channel.updateUserMessage(
        this.editedMessageId,
        params,
        (response, error) => {
          if (error) console.log('message not edited');
          //console.log('message edited');
          this.textMessage = '';
          this.isEdited = false;
          this.isDeleted = false;
          this.sbPreviousMessages();
          this.isUndo = true;
          if (this.isUndo) {
            setTimeout(() => {
              this.isUndo = false;
            }, 20000);
          }
        }
      );
    } else {
      const sb = SendBird.getInstance();
      const params = new sb.FileMessageParams();
      params.customType = this.isUndo ? '' : 'DELETED';
      this.channel.updateFileMessage(
        this.editedMessageId,
        params,
        (response, error) => {
          if (error) console.log('message not edited');
          //console.log('message edited');
          this.textMessage = '';
          this.isEdited = false;
          this.isDeleted = false;
          this.sbPreviousMessages();
          this.isUndo = true;
          if (this.isUndo) {
            setTimeout(() => {
              this.isUndo = false;
            }, 20000);
          }
        }
      );
    }
  }

  editMessage(event) {
    //console.log(event.target.attributes.text.value)
    this.isEdited = true;
    this.textMessage = event.target.attributes.text.value;
    this.editedMessageId = Number(event.target.attributes.mk.value);
    this.messageType = event.target.attributes.type.value;
    //console.log(this.messageType)
  }

  undoMessage(event) {
    this.isUndoClick = true;
    this.DeleteMessageFun(event);
  }

  getUnreadCount = async (message) => {
    this.deliveryMessageId = message.messageId;
    // this.tick = this.channel.getReadReceipt(message)
    //  console.log(this.channel.getDeliveryReceipt(message));
    //  console.log(this.channel.getReadReceipt(message));
    //  console.log(this.channel.getUndeliveredMemberCount(message))
    if (this.channel) {
      if (
        this.channel.getDeliveryReceipt(message) === 0 &&
        this.channel.getReadReceipt(message) === 0 &&
        this.channel.getUndeliveredMemberCount(message) === 0
        // this.channel.getDeliveryReceipt(message) === "0" &&
        // this.channel.getReadReceipt(message) === "0" &&
        // this.channel.getUndeliveredMemberCount(message) === "0"
      ) {
        this.tick = 0;
      } else if (
        this.channel.getDeliveryReceipt(message) === 0 &&
        this.channel.getReadReceipt(message) > 0
        // this.channel.getDeliveryReceipt(message) === "0" &&
        // this.channel.getReadReceipt(message) > "0"
      ) {
        this.tick = 1;
      } else {
        this.tick = 2;
      }
    } else {
      this.tick = 2;
    }
  };

  sbMarkAsRead = (channelUrl, channel) => {
    if (channel) {
      if(channel?.unreadMessageCount){
        channel.markAsRead();
      }
    } else {
      this.sbGetGroupChannel(channelUrl).then((channel: any) =>
        channel.markAsRead()
      );
    }
  };
  handleChange() {
    this.inputChange = true;
  }
  camelCase(str: any) {
    if(str != undefined){
      return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index != 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
    }
   
  }

  forwordFunction(e) {
    this.isForword = true;
    let messageId = Number(e.target.attributes.mk.value);
    this.fileteMessageById = this.allMessage.filter(el => el.messageId == messageId)
    let teams = JSON.parse(localStorage.getItem('teams'));
    let colleagues = JSON.parse(localStorage.getItem('colleagues'))
    this.collegueAndTeamArray = teams.concat(colleagues)
      this.collegueAndTeamArray.forEach((element) => {
        element.toggle = false;
        element.status = 'Select'
      });
  }

 async selectColleagues(e: any){
    //  this.buttonClass = index;
    // if(!this.new.includes(e)){
    //   this.new.push(e)
    //   }else{
    //     this.new.splice(this.new.indexOf(e), 1)
    //   }  
    e.toggle = !e.toggle;
    e.status = e.toggle ? 'Selected' : 'Select';
    // this.new.push(e);  
    // console.log(this.new)
    this.selectedCollugesFunction(e); 
  }

  selectedCollugesFunction(e: any){
    // for(var i = 0; i < this.new.length; i++){
      if (e.sendbird_team_details && e.sendbird_team_details) {
        this.setChannelUrl = e.sendbird_team_details.channel_url;
       this.selectColleague = true;
       this.sbGetGroupChannel1(e.sendbird_team_details.channel_url)
       }else if(e.sendbird_user_details && e.sendbird_user_details){
         this.sbCreateChannelWithUserIds([e.sendbird_user_details.user_id])
       }
    // }
  }

  async forwordMessage (){
    // if(this.targetChannel){
    //   this.selectedData.push(this.targetChannel)
    // }
    // if(this.targetCollegueChannel){
    //   this.selectedData.push(this.targetCollegueChannel)
    // }
    this.fileteMessageById[0].customType = 'FORWARDED';
    for(var i = 0; i < this.teamListArr.length; i++){
      if(this.fileteMessageById[0].messageType == 'user'){
        await this.channel.copyUserMessage(this.teamListArr[i], this.fileteMessageById[0]);
      }else if(this.fileteMessageById[0].messageType == 'file'){
        await this.channel.copyFileMessage(this.teamListArr[i], this.fileteMessageById[0]);
      }
    }
   this.teamListArr = [];
  }

  sbCreateGroupChannelListQuery() {
    const sb = SendBird.getInstance();
    return sb.GroupChannel.createMyGroupChannelListQuery();
  };
  

     sbGetGroupChannelList(groupChannelListQuery: any){ 
     new Promise((resolve, reject) => {
      groupChannelListQuery.next((channels: any, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(channels);
          this.getMembers(channels)
          this.colleagueListData = channels;
          localStorage.setItem('allCollabUsers', JSON.stringify(channels))
        }
      });
    });
  };

  getAllCollabUsers(){
    let data: any = {};
      this.authHttp.getAllUsers(data).subscribe(
        (response) => {
          this.getApiMemberList = response.data
          // this.userName(this.members)
          //console.log(response.data)         
          localStorage.setItem(
            'all_users_data',
            JSON.stringify(response.data)
          );
        },
        (error) => {
          //this.isSubmitFormLoading = false;
        }
      );
   }


  getMembers(channels: any){
    if(channels.length > 0){
      // let res:any = [];
      for(var i = 0; i < channels.length; i++){
        if(channels[i].isDistinct){
          //  res.push(channels[i].members)
          this.userName(channels[i].members);
          this.getUserProfilePicture(channels[i].members);
        } else {
          this.teamName(channels[i]);
        }
      } 
      // let flatResponse = res.flat(res.length)
      // this.userName(flatResponse);
      // this.userName(this.filterMembers);
      localStorage.setItem('memberList', JSON.stringify(this.memberList))
    }else{
      localStorage.setItem('memberList', JSON.stringify([]))
    }
  }

  async userName(members: any){
  //   const key = 'nickname';
  //   const unique = [...new Map(members.map(item => [item[key], item])).values()]
  //  if(unique.length != 0){
  //    for (let member of unique) {
  //       // if (member?.userId != localStorage.getItem('user_id')) {
  //       //   this.memberList.push(member)
  //       // } 
  //       this.memberList.push(member);
  //     }
  if(members.length != 0){
    
    for (let member of members) {
       if (member?.userId != localStorage.getItem('user_id') || member?.designation?.designation != "TEAM-LEAD") {
         this.memberList.push(member)
       }
      }
      localStorage.setItem('memberList', JSON.stringify(this.memberList))
      }else{
      localStorage.setItem('memberList', JSON.stringify([]))
    }
  }

  async teamName(members: any){
    this.teams.map((item: any) => {
      if(item.sendbird_team_details.name == members.name){
        this.memberList.push(item);
      }
     })
    localStorage.setItem('memberList', JSON.stringify(this.memberList))
  }

  // textAreaScrit(){
  //  let textarea = document.querySelector("#autoresizing");
  //   textarea.addEventListener('input', autoResize, false);
  //   function autoResize() {
  //     this.style.height = 'auto';
  //     this.style.height = this.scrollHeight + 'px';
  //   }
  // }
}
