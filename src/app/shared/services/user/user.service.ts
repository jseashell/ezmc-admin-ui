import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(): Observable<any> {
    return this.http.post('', {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      locale: '',
    });
  }
}
