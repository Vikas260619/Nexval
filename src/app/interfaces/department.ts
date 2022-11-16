import { Team } from './team';

export interface Department {
  id: string;
  name: string;
  parentId?: string;
  teams?: Team[];
  childDepartments?: Department[];
}

export interface AddDepartment {
  orgid: string;
  name: string;
  userid: string;
  desc: string;
  regionid: string;
  prtid: string;
}

export interface UpdateDepartment {
  orgId: string;
  name: string;
  userId: string;
  desc: string;
  prtId: string;
  id: string;
}
