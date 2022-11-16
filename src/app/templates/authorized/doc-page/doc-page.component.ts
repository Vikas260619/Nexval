import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss']
})
export class DocPageComponent implements OnInit {
  user:boolean=true;
  @Input()
  collabChat: any;
  filterDoc: any;
  filterDocs: any;
  nickName: any;
  modelFileData: any;

  constructor() { }

  ngOnInit(): void {     
    if (
      localStorage.getItem('user-role') != null &&
      localStorage.getItem('user-role') == 'SUPERADMIN'
    ) {
      this.user = false;
    }                                                                                  
    this.filterDoc = this.collabChat.filter(el => (el.type == "text/plain" || el.type == "application/pdf" || el.type == "application/msword" || el.type == "application/x-zip-compressed" || el.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || el.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||  el.type === 'text/csv' ||
    el.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || el.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || el.type == "application/vnd.ms-powerpoint" || el.type === 'application/vnd.ms-excel') && el.customType !== 'DELETED' );
    this.filterDocs = this.filterDoc.sort((a: any,b: any) => b.createdAt - a.createdAt)
    this.nickName = localStorage.getItem('nickname')
  }

  getShortName(fullName) {
    const splitFullName = fullName.split(' ')
    const intials = splitFullName.shift().charAt(0);
      return intials.toUpperCase();
  }

  getModelfile(message: any) {
    this.modelFileData = message;
  }

}
