export interface SignupPhaseOne {
  fname: string;
  lname: string;
  email: string;
  pwd: string;
}

export interface SignupPhaseTwo {
  otp: number;
  email: string;
}

export interface SignupPhaseThree {
  orgname: any;
  domain_properties: any;
  vertical_properties: any;
}

export interface Colab {
  moduleids: any;
}
export interface createTeam {
  name: string;
  hierarchy_type: string;
  desc: string;
  invitedemail: string,
}

export interface SignupPhaseFour {
  range: number;
  centralize: number;
  addons: number;
}

export interface LoginRequest {
  email: string;
  pwd: string;
  encrypted_invitation_details: any;
}

export interface resendOTPRequest {
  email: string;
}

export interface Vertcals {
  id: number;
  name: string;
}

export interface SignupPhaseFive {
  fname: string;
  lname: string;
  email: string;
  roleid: string;
  orgid: string;
  gender: string;
}

export interface resetPassword {
  mobileNumber: string;
}
export interface teamList {
  attendance_date: Date;
  offset: number;
  limit: string;
  userlimit: string;
}

export interface invitation {
  id: string;
  hierarchy_type: string;
  invitedemail: any;
}

export interface forceUpdate {
  encrypted_invitation_details: string;
  fname: string;
  lname: string;
  pwd: string;
}

export interface teamwiseMemberList {
  hierarchyid: string;
}

export interface colleagueList {
  offset: number;
  limit: string;
}

export interface attendence {
  punch_type: string;
}
export interface allUsers {
  regionid: string;
  is_full_tree_user_req: string;
}
export interface colleagueInvitation {
  email: string;
  hierarchyid: string;
}
