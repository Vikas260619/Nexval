import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {
  user:boolean=true;
  @Input()
  collabChat: any;
  filterLink: any;
  filterLinks: any;
  nickName: any;

  constructor() { }

  ngOnInit(): void {
    if (
      localStorage.getItem('user-role') != null &&
      localStorage.getItem('user-role') == 'SUPERADMIN'
    ) {
      this.user = false;
    }
    this.filterLink = this.collabChat.filter(el => (el?.text.indexOf('http://') == 0 ||el?.text.indexOf('https://') == 0 ||el?.text.indexOf('www.') == 0) && el.customType !== 'DELETED');
    this.filterLinks = this.filterLink.sort((a: any,b: any) => b.createdAt - a.createdAt)
    this.nickName = localStorage.getItem('nickname')
  }

  getShortName(fullName) {
    const splitFullName = fullName.split(' ')
    const intials = splitFullName.shift().charAt(0);
      return intials.toUpperCase();
  }

}
