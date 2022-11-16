import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UpdateDepartment,
  AddDepartment,
  Department,
} from '../interfaces/department';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private endpoint: string = environment.endpoint;
  constructor(private httpClient: HttpClient) {}

  getDepartments(id: any) {
    let data: any = {
      orgid: id,
    };
    return this.httpClient
      .post<HttpResponse>(this.endpoint + 'api/getAllDepartments', data)
      .pipe(
        map((response) => {
          let list: Department[] = response.data;
          response.data = list;
          return response;
        })
      );
  }
  getParentDepartments(id: any) {
    let data: any = {
      orgid: id,
    };
    return this.httpClient
      .post<HttpResponse>(this.endpoint + 'api/getParentDepartments', data)
      .pipe(
        map((response) => {
          let list: Department[] = response.data;
          response.data = list;
          return response;
        })
      );
  }
  getChildDepartments(id: any) {
    let data: any = {
      orgid: id,
    };
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/getChildDepartments',
      data
    );
  }

  addDepartment(data: AddDepartment) {
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/addDepartment',
      data
    );
  }

  updateDepartment(data: UpdateDepartment) {
    return this.httpClient.post<HttpResponse>(
      this.endpoint + 'api/addDepartment',
      data
    );
  }
}
