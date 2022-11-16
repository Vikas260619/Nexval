import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../interfaces/http-response.interface';
import { SignupPhaseFive } from '../interfaces/signup.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private endpoint: string = environment.endpoint;
  constructor(private http: HttpClient) {}

  addMember(data: SignupPhaseFive) {
    return this.http.post<HttpResponse>(this.endpoint + 'api/addMember', data);
  }

  deleteMember(data: any){
    // console.log(id)
    let datas: any = {
      hierarchy_id: data.hierarchy_id, 
      user_id: data.userId
    };
    return  this.http.post<HttpResponse>(
       this.endpoint + 'api/Hierarchy/RemoveHierarchyMember',
       datas
    );
  }
  
}
