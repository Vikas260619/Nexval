export interface addArrivalMessage {
  id: string;
  arrival_msg: string;
}

export interface getArrivalMessage {
  id: string;
  orgid: string;
  userid: string;
  arrival_msg: string;
  isdeleted: string;
  createdby: string;
  createdon: string;
  modifiedby: string;
  modifiedon: string;
}
