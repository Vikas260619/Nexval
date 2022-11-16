import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderPanel } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/service/store.service';
import { RegionService } from 'src/app/service/region.service';
import { Region } from 'src/app/interfaces/region';
import { Department } from 'src/app/interfaces/department';
import { Team } from 'src/app/interfaces/team';
import { DepartmentService } from 'src/app/service/department.service';
import { TeamService } from 'src/app/service/team.service';
import { Dropdown } from 'bootstrap';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss'],
})
export class HeaderPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  header: HeaderPanel;
  regionsList: Region[] = [];
  departmentList: Department[] = [];
  teamList: Team[] = [];
  orgId: string;

  //  Dropdown
  @ViewChild('settings_dropdown', { static: false })
  settingDropdownEle?: ElementRef;

  @ViewChild('region_dropdown', { static: false })
  regionDropdownEle?: ElementRef;

  @ViewChild('teams_dropdown', { static: false })
  teamDropdownEle?: ElementRef;

  @ViewChild('department_dropdown', { static: false })
  departmentDropdownEle?: ElementRef;

  constructor(
    private store: StoreService,
    private reg: RegionService,
    private department: DepartmentService,
    private team: TeamService,
    private event: EventEmitterService,
    private route: Router
  ) {
    this.header = this.store.headerInit();
    this.orgId = this.store.getOrgIdFromLocal();
  }

  ngOnInit(): void {
    this.store.getHeaderEvent.subscribe((value) => {
      this.header = value;
    });

   // this.event.TeamEventEmitter.subscribe((_) => {
      //this.getTeams();
    //});

    ///this.event.DepartmentEventEmitter.subscribe((_) => {
      //this.getDepartments();
    //});

    this.getRegions();
    this.getDepartments();
    this.getTeams();
  }

  getRegions() {
    this.reg.getRegions(this.orgId).subscribe((response) => {
      this.regionsList = response.data;
    });
  }

  getTeams() {
    this.team.getAllTeams(this.orgId).subscribe((response) => {
      this.teamList = response.data;
      this.teamList?.reverse();
    });
  }

  getDepartments() {
    this.department.getDepartments(this.orgId).subscribe((response) => {
      this.departmentList = response.data;
      this.departmentList?.reverse();
    });
  }

  settingDropdown?: Dropdown;
  regionDropdown?: Dropdown;
  teamDropdown?: Dropdown;
  departmentDropdown?: Dropdown;

  ngAfterViewInit(): void {
    if (this.regionDropdownEle)
      this.regionDropdown = new Dropdown(this.regionDropdownEle?.nativeElement);

    if (this.teamDropdownEle)
      this.teamDropdown = new Dropdown(this.teamDropdownEle?.nativeElement);

    if (this.departmentDropdownEle)
      this.departmentDropdown = new Dropdown(
        this.departmentDropdownEle?.nativeElement
      );

    if (this.settingDropdownEle)
      this.settingDropdown = new Dropdown(
        this.settingDropdownEle?.nativeElement
      );
  }

  ngOnDestroy(): void {
    this.store.getHeaderEvent.unsubscribe();
  }

  toggleSettingDropdown() {
    if (this.settingDropdown) this.settingDropdown?.toggle();
  }

  toggleRegionDropdown() {
    if (this.regionDropdown) this.regionDropdown?.toggle();
  }

  toggleTeamDropdown() {
    if (this.teamDropdown) this.teamDropdown?.toggle();
  }

  toggleDepartmentDropdown() {
    if (this.departmentDropdown) this.departmentDropdown?.toggle();
  }

  logout() {
    this.store.logout();
    this.route.navigate(['/login']);
  }
}
