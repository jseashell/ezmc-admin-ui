import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mockAdminServers } from './mocks/admin-server.mock';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  down(): Observable<string> {
    return of('');
  }

  ipAddress(): Observable<string> {
    return of('');
  }

  start(clusterName: string): Observable<string> {
    return this.http.get<string>(`${environment.adminService.url}/start?clusterName=${clusterName}`).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }

  status(): Observable<string> {
    return of('');
  }

  stop(clusterName: string): Observable<string> {
    return this.http.get<string>(`${environment.adminService.url}/stop?clusterName=${clusterName}`).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }

  up(): Observable<string> {
    return of('');
  }

  get servers$(): Observable<AdminServer[]> {
    return of(mockAdminServers);
  }
}

export interface AdminServer {
  name: string;
  clusterName: string;
}
