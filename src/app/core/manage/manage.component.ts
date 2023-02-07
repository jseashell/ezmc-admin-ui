import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '@services';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent {
  private subs: Subscription[] = [];

  constructor(private http: HttpClient, private historyService: HistoryService) {}

  onStart(): void {
    this.subs.push(
      this.http
        .get<string>(`${environment.adminService.url}/start?clusterName=${environment.adminService.clusterName}`)
        .pipe(
          tap(() => this.historyService.add('Starting game server...')),
          catchError((err, caught) => {
            console.error(err);
            this.historyService.add('Request to start game server failed.');
            return EMPTY;
          }),
        )
        .subscribe(),
    );
  }

  onStop(): void {
    this.subs.push(
      this.http
        .get<string>(`${environment.adminService.url}/stop?clusterName=${environment.adminService.clusterName}`)
        .pipe(
          tap(() => this.historyService.add('Stopping game server...')),
          catchError((err, caught) => {
            console.error(err);
            this.historyService.add('Request to stop game server failed.');
            return EMPTY;
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
