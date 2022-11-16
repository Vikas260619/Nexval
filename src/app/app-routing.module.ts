import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './templates/login/login.component';

//  Signup component
import { SignupComponent } from './templates/signup/signup.component';
import { PageOneComponent } from './templates/signup/page-one/page-one.component';
import { HomeComponent } from './templates/home/home.component';
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
import { ChatpageflowComponent } from './templates/chatpageflow/chatpageflow.component';
import { LocationViewComponent } from './templates/location-view/location-view.component';
import { ProfileComponent } from './templates/profile/profile.component';
import { MemberblankComponent } from './templates/memberblank/memberblank.component';
import { ForgetpasswordComponent } from './templates/forgetpassword/forgetpassword.component';
import { ChangepassComponent } from './templates/changepass/changepass.component';
import { EnterotpComponent } from './templates/enterotp/enterotp.component';
import { PrivacyAndriodComponent } from './tempates/privacy-andriod/privacy-andriod.component';
import { TermsAndriodComponent } from './tempates/terms-andriod/terms-andriod.component';



var route: string = "";
  if  (localStorage.getItem('authentication-token') == null) {
  //superadmin role
   route = "login"
  } else {
    //normal user role
    route = "dashboard/home"
  }

  const routes: Routes = [
  {
    path: '',
    redirectTo: route,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'member',
    component: MemberComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'calendar-details',
    component: CalendarDetailsComponent,
  },
  {
    path: 'location-view',
    component: LocationViewComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: 'user-signup', component: PageOneComponent },
      { path: 'orgsetup-1', component: PageTwoComponent },
      { path: 'orgsetup-2', component: PageThreeComponent },
      { path: 'orgsetup-3', component: PageFourComponent },
      { path: 'orgsetup-4', component: PageFiveComponent },
      { path: 'otp-verification', component: OtpComponent },
    ],
  },
  {
    path: 'emp-invite',
    component: EmpInvitationComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'privacy-andriod',
    component: PrivacyAndriodComponent,
  },
  {
    path: 'terms-andriod',
    component: TermsAndriodComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'comingsoon',
    component: ComingsoonComponent,
  },
  {
    path: 'collabtemplate',
    component: CollabtemplateComponent,
  },
  {
    path: 'collabflow',
    component: CollabflowComponent,
  },
  {
    path: 'viewprofile',
    component: ProfileComponent ,
  },
  {
    path: 'memberpage',
    component: MemberblankComponent ,
  },
  {
    path: 'Chatpageflow',
    component: ChatpageflowComponent ,
  },
  {
    path: 'memberblank',
    component: MemberblankComponent ,
  },
  {
    path: 'forgetpass',
    component: ForgetpasswordComponent ,
  },
  {
    path: 'changepass',
    component: ChangepassComponent ,
  },
  
  {
    path: 'enterotp',
    component: EnterotpComponent ,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./templates/authorized/authorized.module').then(
        (module) => module.AuthorizedModule
      ),
  },
  {
    path: 'mediapage',
    component: MediapageComponent,
  },
  {
    path: 'files',
    component: FilesComponent,
  },
  {
    path: 'teamspage',
    component: TeamspageComponent,
  },
  {
    path: 'homewithoutteam',
    component: HomewithoutteamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
