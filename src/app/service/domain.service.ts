import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domain } from '../interfaces/domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private httpClient: HttpClient) { }

  getProhibitedDomains() {
    return this.httpClient.get<Domain[]>('../assets/domain.json');
  }
}
