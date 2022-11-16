import { Component, OnInit } from '@angular/core';
import { ComingsoonService } from './comingsoon.service';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.scss']
})
export class ComingsoonComponent implements OnInit {
  counter: number;
  constructor(private appService: ComingsoonService) { }

  ngOnInit(): void {
    this.appService.ee.subscribe(counter => {
      this.counter = counter;
    });
  }

}
