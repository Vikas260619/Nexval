import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicUploadService {
  private baseUrl = environment.endpoint;
  constructor(private http: HttpClient) { }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}api/User/UploadProfilePicture`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  delete(){
    
  }
}
