import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collabflow',
  templateUrl: './collabflow.component.html',
  styleUrls: ['./collabflow.component.scss']
})
export class CollabflowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
  }

}
