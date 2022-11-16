import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatpageflow',
  templateUrl: './chatpageflow.component.html',
  styleUrls: ['./chatpageflow.component.scss']
})
export class ChatpageflowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {    window.onscroll = function() {myFunction()};

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
