export interface Team {
  id: string;
  name: string;
  orgid: string;
  userid: string;
  prtregionid: string;
  prtdeptid: string;
  modifiedon: string;
  createdon: Date;
  bgcolor?: string;
}

export interface AddTeam {}
export interface updateTeam {
  orgId: string;
  name: string;
  userId: string;
  id: string;
}
