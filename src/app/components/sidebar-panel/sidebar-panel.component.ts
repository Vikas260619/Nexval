import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidePanel } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss'],
})
export class SidebarPanelComponent implements OnInit, OnDestroy {
  sideBarPanel: SidePanel;
  userRole: string;

  constructor(private store: StoreService) {
    this.sideBarPanel = this.store.sideBarInit();
    this.userRole = this.store.getUserRole();
  }

  ngOnInit(): void {
    this.store.getSidebarEvent.subscribe((value) => {
      this.sideBarPanel = value;
    });
  }

  ngOnDestroy(): void {
    this.store.getSidebarEvent.unsubscribe();
  }
}
