import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private store: StoreService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.store.removeInvitationToken();
    this.router.navigate(['./login']);
  }
}
