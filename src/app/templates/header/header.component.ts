import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropHeader() {
    if (document.getElementById("header-flex").classList.contains("header-drop")) {
      document.getElementById("header-flex").classList.toggle("active")
      document.getElementById("navbarSupportedContent").classList.toggle("activedrop")
    } 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
