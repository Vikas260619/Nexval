import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//  Services
import { AuthInterceptor } from './service/auth.interceptor';

// Shared components, directives, pipes
import { SharedComponents } from './shared/shared-components.module';
import { SharedDirectiveModule } from './shared/shared-directive.module';
import { SharedPipes } from './shared/shared-pipes.module';

//Components
import { SignupComponent } from './templates/signup/signup.component';
import { LoginComponent } from './templates/login/login.component';
import { PageOneComponent } from './templates/signup/page-one/page-one.component';
import { HomeComponent } from './templates/home/home.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { HeaderComponent } from './templates/header/header.component';
import { PageTwoComponent } from './templates/signup/page-two/page-two.component';
import { PageThreeComponent } from './templates/signup/page-three/page-three.component';
import { PageFourComponent } from './templates/signup/page-four/page-four.component';
import { PageFiveComponent } from './templates/signup/page-five/page-five.component';
import { EmpInvitationComponent } from './templates/emp-invitation/emp-invitation.component';
import { PrivacyComponent } from './templates/privacy/privacy.component';
import { TermsComponent } from './templates/terms/terms.component';
import { OtpComponent } from './templates/signup/otp/otp.component';
import { MemberComponent } from './templates/member/member.component';
import { ComingsoonComponent } from './templates/signup/comingsoon/comingsoon.component';
import { CollabtemplateComponent } from './templates/collabtemplate/collabtemplate.component';
import { CollabflowComponent } from './templates/collabflow/collabflow.component';
import { CalendarComponent } from './templates/calendar/calendar.component';
import { CalendarDetailsComponent } from './templates/calendar-details/calendar-details.component';
import { MediapageComponent } from './templates/mediapage/mediapage.component';
import { FilesComponent } from './templates/files/files.component';
import { TeamspageComponent } from './templates/teamspage/teamspage.component';
import { HomewithoutteamComponent } from './templates/homewithoutteam/homewithoutteam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatpageflowComponent } from './templates/chatpageflow/chatpageflow.component';
import { LocationViewComponent } from './templates/location-view/location-view.component';
import { ProfileComponent } from './templates/profile/profile.component';
import { SidebarPanelBlankComponent } from './templates/sidebar-panel-blank/sidebar-panel-blank.component';
import { MemberblankComponent } from './templates/memberblank/memberblank.component';
import { ForgetpasswordComponent } from './templates/forgetpassword/forgetpassword.component';
import { ChangepassComponent } from './templates/changepass/changepass.component';
import { EnterotpComponent } from './templates/enterotp/enterotp.component';
import { OnlyDatePipe } from './pipes/only-date.pipe';
import { InvitationCodePopupComponent } from './templates/signup/modals/invitation-code-popup/invitation-code-popup.component';
import { PrivacyAndriodComponent } from './tempates/privacy-andriod/privacy-andriod.component';
import { TermsAndriodComponent } from './tempates/terms-andriod/terms-andriod.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageOneComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    PageTwoComponent,
    PageThreeComponent,
    PageFourComponent,
    PageFiveComponent,
    EmpInvitationComponent,
    PrivacyComponent,
    TermsComponent,
    OtpComponent,
    MemberComponent,
    ComingsoonComponent,
    CollabtemplateComponent,
    CollabflowComponent,
    CalendarComponent,
    CalendarDetailsComponent,
    MediapageComponent,
    FilesComponent,
    TeamspageComponent,
    HomewithoutteamComponent,
    ChatpageflowComponent,
    LocationViewComponent,
    ProfileComponent,
    SidebarPanelBlankComponent,
    MemberblankComponent,
    ForgetpasswordComponent,
    ChangepassComponent,
    EnterotpComponent,
    OnlyDatePipe,
    InvitationCodePopupComponent,
    PrivacyAndriodComponent,
    TermsAndriodComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedComponents, // shared component module includes reactive form module, hence no need to import manually
    SharedDirectiveModule,
    SharedPipes,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
