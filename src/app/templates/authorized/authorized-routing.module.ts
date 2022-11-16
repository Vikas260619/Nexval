import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//ROOT Component
import { AuthorizedComponent } from './authorized.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { TeamCollabComponent } from './team-collab/team-collab.component';
import { TeamCollabInternalComponent } from './team-collab-internal/team-collab-internal.component';
import { TestAutocompleteComponent } from './test-autocomplete/test-autocomplete.component';
import { LogoutComponent } from './logout/logout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AttendenceReportComponent } from './attendence-report/attendence-report.component';
import { MemberCollabInternalComponent } from './member-collab-internal/member-collab-internal.component';
import { EmptyColabsComponent } from './empty-colabs/empty-colabs.component';
import { EmptyColaborationComponent } from './empty-colaboration/empty-colaboration.component';
import { MemberComponent } from '../member/member.component';
import { MembersComponent } from './members/members.component';

import { AttendenceInternalComponent } from './attendence-report/component/attendence-internal/attendence-internal.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'member-list', component: MemberListComponent },
      { path: 'team-collab', component: TeamCollabComponent },
      { path: 'team-collab-internal', component: TeamCollabInternalComponent },
      { path: 'test-auto', component: TestAutocompleteComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'member-collab-internal', component: MemberCollabInternalComponent },
      
    ],
  },{
     path: 'my-profile', component: MyProfileComponent 
  },{
    path: 'attendence-report', component: AttendenceReportComponent 
 },{
    path: 'empty-collab', component: EmptyColaborationComponent
 },{
  path: 'members-collab', component: MembersComponent
 },
 {
  path: 'attendence-internal', component: AttendenceInternalComponent 
 }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
