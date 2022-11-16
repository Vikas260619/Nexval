import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  showStream() {
    if (document.getElementById("hyper").classList.contains("active")) {
      document.getElementById("hyper").classList.remove("active")
    } else {
      document.getElementById("hyper").classList.add("active")
    }
  }  
  constructor() { }

  ngOnInit(): void {
  }

}
