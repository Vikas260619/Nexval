import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import { addArrivalMessage, getArrivalMessage } from '../interfaces/arrival-message.interface';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
  })

  export class ArrivalMessageService {
    private endpoint: string = environment.endpoint;
    constructor(private httpClient: HttpClient) {}
  
    // getAllTeams(id: any) {
    //   let data: any = {
    //     orgId: id,
    //   };
    //   return this.httpClient
    //     .post<HttpResponse>(this.endpoint + 'api/getAllTeams', data)
    //     .pipe(
    //       map((response) => {
    //         let list: Team[] = response.data;
    //         response.data = list;
    //         return response;
    //       })
    //     );
    // }
  
    addArrivalMessage(data: addArrivalMessage) {
      return this.httpClient.post<HttpResponse>(
        this.endpoint + 'api/User/AddUpdateUserArrivalMessage',
        data
      );
    }

        getArrivalMessage(data: any) {
           
            return this.httpClient
              .post<HttpResponse>(this.endpoint + 'api/User/GetUserArrivalMessage',
                data
                )
              .pipe(
                map((response) => {
                  let list: getArrivalMessage[] = response.data;
                  response.data = list;
                  return response;
                })
              );
          
    }
  
    // updateTeam(data: updateTeam) {
    //   return this.httpClient.post<HttpResponse>(
    //     this.endpoint + 'api/addTeam',
    //     data
    //   );
    // }
  }
  