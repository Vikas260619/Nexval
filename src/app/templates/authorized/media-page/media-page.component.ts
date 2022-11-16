import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss']
})
export class MediaPageComponent implements OnInit {
  user: boolean = true;
  @Input()
  collabChat: any;
  filterMedia: any;
  filterMedias: any;
  nickName: any;

  constructor() { }

  ngOnInit(): void {
    if (
      localStorage.getItem('user-role') != null &&
      localStorage.getItem('user-role') == 'SUPERADMIN'
    ) {
      this.user = false;
    }
    console.log("===="+this.user);
    this.filterMedias = this.collabChat.filter(el => el.type == el.type?.match(/^video\/.+$/) && el.type || el.type == el.type?.match(/^audio\/.+$/) && el.type);
    this.filterMedia = this.filterMedias.sort((a: any,b: any) => b.createdAt - a.createdAt)
    this.nickName = localStorage.getItem('nickname')
  }

  getShortName(fullName) {
    const splitFullName = fullName.split(' ')
    const intials = splitFullName.shift().charAt(0);
      return intials.toUpperCase();
  }
}
