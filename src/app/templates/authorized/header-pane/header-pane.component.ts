import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { rejects } from 'assert';
import { Dropdown } from 'bootstrap';
import { promise } from 'protractor';
import { RegionRadium } from 'src/app/interfaces/region-radium';
import { RegionRadiumService } from 'src/app/service/region-radium.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-header-pane',
  templateUrl: './header-pane.component.html',
  styleUrls: ['./header-pane.component.scss'],
})
export class HeaderPaneComponent implements OnInit {
  regionsList: Promise<[]> | null = null;
  regionsListIds: Promise<[]> | null = null;
  currentRegion: string = '';
  currentOrg: string = '';
  showHeader: boolean = true;
  dropHeader() {
    if (
      document.getElementById('header-flex').classList.contains('header-drop')
    ) {
      document.getElementById('header-flex').classList.toggle('active');
      document
        .getElementById('navbarSupportedContent')
        .classList.toggle('activedrop');
    }
  }

  @ViewChild('region_dropdown', { static: false })
  regionDropdownEle?: ElementRef;

  @ViewChild('teams_dropdown', { static: false })
  teamDropdownEle?: ElementRef;

  constructor(
    private reg: RegionRadiumService,
    private route: Router,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('authentication-token') == null) {
      this.route.navigate(['/dashboard/logout']);
    }
    this.currentRegion = localStorage.getItem('region_name');
    let org = localStorage.getItem('org_name');
    if (org != 'null') {
      this.currentOrg = org.charAt(0).toUpperCase() + org.slice(1);
    } else {
      this.currentOrg = ' ';
    }

    this.getRegions();

    if (localStorage.getItem('user-role') != 'SUPERADMIN') {
      this.showHeader = false;
    }
  }

  getRegions() {
    let data: any = {
      hierarchy_type: 'DC1/O1127x9ZL4GU2bhQgg==',
    };
    this.reg.getRegions(data).subscribe((response) => {
      this.regionsList = new Promise((resolve, reject) => {
        return resolve(response.data);
      });
    });
  }

  teamDropdown?: Dropdown;
  regionDropdown?: Dropdown;

  ngAfterViewInit(): void {
    // localStorage.removeItem('page')
    if (this.teamDropdownEle)
      this.teamDropdown = new Dropdown(this.teamDropdownEle?.nativeElement);
    if (this.regionDropdownEle)
      this.regionDropdown = new Dropdown(this.regionDropdownEle?.nativeElement);
  }

  toggleRegionDropdown() {
    if (this.regionDropdown) this.regionDropdown?.toggle();
  }
  toggleTeamDropdown() {
    if (this.teamDropdown) this.teamDropdown?.toggle();
  }

  setRegion(region) {
    this.currentRegion = region;
  }
  goBack() {
    this.eventEmitterService.emitBckCollab();
    this.route.navigate(['dashboard/home']);
  }
}
