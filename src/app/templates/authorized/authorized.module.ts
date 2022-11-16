import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedRoutingModule } from './authorized-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { SidebarPaneComponent } from './sidebar-pane/sidebar-pane.component';
import { HeaderPaneComponent } from './header-pane/header-pane.component';
// shared modules
import { SharedDirectiveModule } from 'src/app/shared/shared-directive.module';
import { SharedComponents } from 'src/app/shared/shared-components.module';
import { ColleaguesComponent } from './members/colleagues/colleagues.component';

import { MemberInvitationComponent } from './members/modals/member-invitation/member-invitation.component';
import { MemberCardComponent } from './members/component/member-card/member-card.component';
import { TeamsComponent } from './teams/teams.component';
import { AddTeamComponent } from './teams/modals/add-team/add-team.component';
import { TeamCardComponent } from './teams/compoment/team-card/team-card.component';
import { HomeComponent } from './home/home.component';
import { TeamCollabComponent } from './team-collab/team-collab.component';
import { ForceLoginComponent } from './team-collab/modals/force-login/force-login.component';
import { TeamCollabInternalComponent } from './team-collab-internal/team-collab-internal.component';
import { MemberCollabInternalComponent } from './member-collab-internal/member-collab-internal.component';
import { ChatBoardComponent } from './chat-board/chat-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedinUserAttendenceComponent } from './team-collab-internal/modals/loggedin-user-attendence/loggedin-user-attendence.component';
import { MaterialModule } from 'src/material.module';
import { AgmCoreModule } from '@agm/core';
import { TestAutocompleteComponent } from './test-autocomplete/test-autocomplete.component';
import { FormatTimestampPipe } from 'src/app/pipes/format-timestamp.pipe';
import { FormatLatPipe } from 'src/app/pipes/format-lat.pipe';
import { FormatLongPipe } from 'src/app/pipes/format-long.pipe';
import { FormatTimestampDatePipe } from 'src/app/pipes/format-timestamp-date.pipe';
import { FormatTimestampTimePipe } from 'src/app/pipes/format-timestamp-time.pipe';
import { FormatonlyDatePipe } from 'src/app/pipes/formatonly-date.pipe';
import { MinuteToHourPipe } from 'src/app/pipes/minute-to-hour.pipe';
import { TokenFilterPipe } from 'src/app/pipes/token-filter.pipe';
import { ColleagueProfileComponent } from './team-collab-internal/modals/colleague-profile/colleague-profile.component';
import { UserSelfAttendenceComponent } from './sidebar-pane/modals/user-self-attendence/user-self-attendence.component';
import { ColleagueAutocompleteComponent } from './colleague-autocomplete/colleague-autocomplete.component';
import { ColleagueInvitationComponent } from './members/modals/colleague-invitation/colleague-invitation.component';
import { LogoutComponent } from './logout/logout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileImageUploadComponent } from './my-profile/modals/profile-image-upload/profile-image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SidebarPaneBlackComponent } from './sidebar-pane-black/sidebar-pane-black.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { EditInputComponent } from './edit-input/edit-input.component';
import { MediaPageComponent } from './media-page/media-page.component';
import { DocPageComponent } from './doc-page/doc-page.component';
import { LinksPageComponent } from './links-page/links-page.component';
import { ImagesPageComponent } from './images-page/images-page.component';
import { AttendenceReportComponent } from './attendence-report/attendence-report.component';
import { SidebarPaneCalenderComponent } from './sidebar-pane-calender/sidebar-pane-calender.component';
import { MyDaysDateCardComponent } from './attendence-report/component/my-days-date-card/my-days-date-card.component';
import { TeamSearchPopupComponent } from './attendence-report/component/team-search-popup/team-search-popup.component';
import { TeamSearchComponent } from './attendence-report/component/team-search/team-search.component';
import { WeekEndComponent } from './attendence-report/component/week-end/week-end.component';
import { GetLinkComponent } from './home/modals/get-link/get-link.component';
import { EmptyColabsComponent } from './empty-colabs/empty-colabs.component';
import { EmptyColaborationComponent } from './empty-colaboration/empty-colaboration.component';
import { SidebarPaneAllcollabComponent } from './sidebar-pane-allcollab/sidebar-pane-allcollab.component';
import { AllCollabsComponent } from './all-collabs/all-collabs.component';
import { AttendenceInternalComponent } from './attendence-report/component/attendence-internal/attendence-internal.component';
import { FilterComponent } from './attendence-report/component/filter/filter.component';
import { SingleMapPopupComponent } from './attendence-report/component/single-map-popup/single-map-popup.component';
import { ArrivalMessageModalComponent } from './chat-board/modals/arrival-message-modal/arrival-message-modal.component';
import { InvCodeComponent } from './home/modals/inv-code/inv-code.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AuthorizedComponent,
    MembersComponent,
    MemberListComponent,
    SidebarPaneComponent,
    HeaderPaneComponent,
    ColleaguesComponent,
    MemberInvitationComponent,
    MemberCardComponent,
    TeamsComponent,
    AddTeamComponent,
    TeamCardComponent,
    HomeComponent,
    TeamCollabComponent,
    ForceLoginComponent,
    TeamCollabInternalComponent,
    MemberCollabInternalComponent,
    ChatBoardComponent,
    LoggedinUserAttendenceComponent,
    TestAutocompleteComponent,
    FormatTimestampPipe,
    FormatLatPipe,
    FormatLongPipe,
    FormatTimestampTimePipe,
    FormatTimestampDatePipe,
    FormatonlyDatePipe,
    MinuteToHourPipe,
    ColleagueProfileComponent,
    UserSelfAttendenceComponent,
    ColleagueAutocompleteComponent,
    ColleagueInvitationComponent,
    LogoutComponent,
    MyProfileComponent,
    ProfileImageUploadComponent,
    SidebarPaneBlackComponent,
    MemberPageComponent,
    EditInputComponent,
    MediaPageComponent,
    DocPageComponent,
    LinksPageComponent,
    ImagesPageComponent,
    AttendenceReportComponent,
    SidebarPaneCalenderComponent,
    MyDaysDateCardComponent,
    TeamSearchPopupComponent,
    TeamSearchComponent,
    WeekEndComponent,
    GetLinkComponent,
    EmptyColabsComponent,
    EmptyColaborationComponent,
    SidebarPaneAllcollabComponent,
    AllCollabsComponent,
    AttendenceInternalComponent,
    FilterComponent,
    SingleMapPopupComponent,
    ArrivalMessageModalComponent,
    TokenFilterPipe,
    InvCodeComponent,

  ],
  imports: [
    CommonModule,
    AuthorizedRoutingModule,
    SharedDirectiveModule,
    SharedComponents,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ImageCropperModule,
    PdfViewerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByWI1IhEbJRSidQOowPJlnU0j7mivE9ys',
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorizedModule {}
