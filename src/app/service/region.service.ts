import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import { map } from 'rxjs/operators';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private endpoint: string = environment.endpoint;
  constructor(private httpClient: HttpClient) {}

  getRegions(id: any) {
    let data: any = {
      orgid: id,
    };
    return this.httpClient
      .post<HttpResponse>(this.endpoint + 'api/getRegions', data)
      .pipe(
        map((response) => {
          let list: Region[] = response.data;
          response.data = list;
          return response;
        })
      );
  }
}
