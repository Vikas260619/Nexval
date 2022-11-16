import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-page-five',
  templateUrl: './page-five.component.html',
  styleUrls: ['./page-five.component.scss'],
})
export class PageFiveComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.setUserRole('SUPERADMIN');
  }
}
