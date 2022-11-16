import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import { map } from 'rxjs/operators';
import { RegionRadium } from '../interfaces/region-radium';

@Injectable({
  providedIn: 'root',
})
export class RegionRadiumService {
  private endpoint: string = environment.endpoint;
  constructor(private httpClient: HttpClient) {}

  getRegions(data: any) {
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/Hierarchy/GetHierarchyList',
      data
    );
  }
}
