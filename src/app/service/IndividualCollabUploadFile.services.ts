import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndividualCollabUploadFileService {
  private baseUrl = environment.endpoint;
  constructor(private http: HttpClient) {}

  IndividualCollabUploadFileUpload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('receiver_userid', localStorage.getItem('collogue_id'));
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}api/attachment/IndividualCollabUploadFile`,
       formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

//   getFiles(): Observable<any> {
//     return this.http.get(`${this.baseUrl}api/Attachment/UploadeFile`);
//   }
}
