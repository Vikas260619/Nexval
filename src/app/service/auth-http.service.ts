import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import {
  SignupPhaseOne,
  SignupPhaseTwo,
  SignupPhaseThree,
  SignupPhaseFive,
  LoginRequest,
  resendOTPRequest,
  resetPassword,
  Colab,
  createTeam,
  teamList,
  invitation,
  forceUpdate,
  teamwiseMemberList,
  colleagueList,
  attendence,
  allUsers,
  colleagueInvitation,
} from '../interfaces/signup.interface';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private endpoint: string = environment.endpoint;
  private endpoint2: string = environment.endpoint2;
  constructor(private http: HttpClient) {
    
  }
  refresh(){
    let lasLogTimestamp = localStorage.getItem('token_timestamp');
    let currentTimestamp = moment().format();
    // currentTimestamp.diff(lasLogTimestamp,)
    let diff = moment(currentTimestamp).diff(lasLogTimestamp, 'minutes');

    if (diff < 29) {
      console.log('+++' + 'if'+diff);
    } else {
      console.log('+++' + 'else'+diff);
      let data: any = {
        token: localStorage.getItem('authentication-token'),
        refresh_token: localStorage.getItem('refresh_token'),
      };

      let res = this.http.post<HttpResponse>(
        this.endpoint + 'api/User/RefreshToken',
        data
      );
      this.refreshToken(data).subscribe((response) => {
        console.log('>>>>>>>' + lasLogTimestamp + '???????????' + diff);
        if (response.success) {
          localStorage.setItem('authentication-token', response.data['token']);
          localStorage.setItem('refresh_token', response.data['refresh_token']);
        }
      });
    }
  }

  signupPhaseOne(data: SignupPhaseOne) {
    console.log('dasdad');
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/CustomerLead/LeadSignUp',
      data
    );
  }

  signupPhaseTwo(data: SignupPhaseTwo) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/CustomerLead/VerifyOtp',
      data
    );
  }

  resetPassword(data: resetPassword) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/forgotPassword',
      data
    );
  }

  signupPhaseThree(data: SignupPhaseThree) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/OrgAccount/SignUp',
      data
    );
  }
  createTeam(data: createTeam) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/AddUpdateHierarchialNode',
      data
    );
  }

  login(data: LoginRequest) {
    return this.http.post<HttpResponse>(this.endpoint + 'api/User/Login', data);
  }

  getUserDetails() {
    return this.http.get<HttpResponse>(this.endpoint + 'api/getUserDetails');
  }

  resendOTP(data: resendOTPRequest) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/CustomerLead/ResendOtp',
      data
    );
  }

  getVerticals() {
    return this.http.get<HttpResponse>(
      this.endpoint + 'api/Vertical/GetVerticals'
    );
  }
  getColabs() {
    return this.http.get<HttpResponse>(
      this.endpoint + 'api/Module/GetAllModules'
    );
  }
  saveColabs(data: Colab) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/OrgAccount/FinalStepsAddInOrg',
      data
    );
  }
  getCentralized(id: any) {
    let data: any = {
      ID: id,
    };
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/getCentralized',
      data
    );
  }

  getAddons() {
    return this.http.get<HttpResponse>(this.endpoint + 'api/getAddons');
  }

  signupPhaseFive(data: SignupPhaseFive) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/registerFive',
      data
    );
  }
  getTeamList(data: any) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/GetUserAssociatedHierarchy',
      data
    );
  }
  postInvitation(data: invitation) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/AddUpdateHierarchialNode',
      data
    );
  }

  forceUpdate(data: forceUpdate) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/AcceptInvitations',
      data
    );
  }

  teamwiseMemberList(data: teamwiseMemberList) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/GetAllUsers',
      data
    );
  }
  getColleagueList(data: colleagueList) {
    this.refresh();
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/GetColleaugueList',
      data
    );
  }
  getPunch() {
    return this.http.get<HttpResponse>(
      this.endpoint2 +'attendance/Punch/GetMemberLatestPunch'
    );
  }
  getAllUsers(data: allUsers) {
    this.refresh();
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/GetAllUsers',
      data
    );
  }
  postColleagueInvitation(data: colleagueInvitation) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/InviteMembers',
      data
    );
  }
  refreshToken(data: any) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/RefreshToken',
      data
    );
  }
  earlyBirdUser(data: any) {
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/GetEarlybirdUser',
      data
    );
  }
  getAttendencePercentage(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/GetAttendancePercentage ',
      data
    );
  }

  deleteProfilePicture(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/DeleteProfilePicture',
      data
    );
  }

  updateTeamName(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/AddUpdateHierarchialNode',
      data
    );
  }

  forgotPassword(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/SendOtpForForgotPassword',
      data
    );
  }
  forgotPassVerifyOTP(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/VerifyUserOtp',
      data
    );
  }
  changePassword(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/SendOtpForForgotPassword',
      data
    );
  }
  resetPass(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/User/ResetUserPassword',
      data
    );
  }
  sendLink(data){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/CellularMessaging/SendMessage',
      data
    );
  }
  getMyAttendence(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint2 + 'attendance/Attendance/GetMyAttendance',
      data
    );
  }
  getAttendenceReport(data:any){
   let timezone= moment.tz.guess();
   const header= new HttpHeaders().set('TimeZone', timezone)
    return this.http.post<HttpResponse>(
      this.endpoint2 +'attendance/Attendance/GetMyAttendanceReport ',
      data,{headers: header}
    );
  }
  verifyInvCode(data:any){
    return this.http.post<HttpResponse>(
      this.endpoint + 'api/CustomerLead/VerifyPassCode',
      data
    );
  }
  loginDataRefresh(){
    let data=''
    return this.http.get<HttpResponse>(
      this.endpoint + 'api/User/FindUserByToken'
    );
  }
}
