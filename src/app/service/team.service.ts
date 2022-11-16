import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import { AddTeam, Team } from '../interfaces/team';
import { updateTeam } from '../interfaces/team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private endpoint: string = environment.endpoint;
  constructor(private httpClient: HttpClient) {}

  getAllTeams(id: any) {
    let data: any = {
      orgId: id,
    };
    return this.httpClient
      .post<HttpResponse>(this.endpoint + 'api/getAllTeams', data)
      .pipe(
        map((response) => {
          let list: Team[] = response.data;
          response.data = list;
          return response;
        })
      );
  }

  addTeam(data: AddTeam) {
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/addTeam',
      data
    );
  }

  updateTeam(data: updateTeam) {
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/addTeam',
      data
    );
  }

  deleteTeam(id: any){
    console.log(id)
    let data: any = {
      id: id, 
    };
    return  this.httpClient.post<HttpResponse>(
       this.endpoint + 'api/Hierarchy/RemoveHierarchy',
      data
    );
  }
}
