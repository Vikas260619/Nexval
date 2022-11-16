import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private endpoint: string = environment.endpoint;
  constructor(private http: HttpClient) {}

  test() {
    return this.http.get<HttpResponse>(this.endpoint);
  }
}
