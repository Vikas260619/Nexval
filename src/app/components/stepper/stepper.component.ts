import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';
import { Department } from 'src/app/interfaces/department';
import { DepartmentService } from 'src/app/service/department.service';
import { Team } from 'src/app/interfaces/team';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  orgId: string;
  deptCount: number = 0;
  teamCount: number = 0;
  memberCount: number = 0;
  departmentRes: Department[] = [];
  teamRes: Team[] = [];
  constructor(
    public department: DepartmentService,
    private team: TeamService,
    private store: StoreService
  ) {
    this.orgId = this.store.getOrgIdFromLocal();
  }

  ngOnInit(): void {
    this.department.getDepartments(this.orgId).subscribe((response) => {
      this.departmentRes = response.data;
      this.deptCount = this.departmentRes?.length;
    });
    this.team.getAllTeams(this.orgId).subscribe((response) => {
      this.teamRes = response.data;
      this.teamCount = this.teamRes?.length;
    });
    this.teamCount = this.teamRes.length;
    this.deptCount = this.departmentRes.length;
  }
}
