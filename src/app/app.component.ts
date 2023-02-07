import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '@services';
import { Subscription, switchMap, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  private status: Status = Status.UNKNOWN;
  private runningCount: number = 0;

  tabTitle = 'Manage';
  showCreate = false;
  showManage = true;
  showSettings = false;

  constructor(private http: HttpClient, private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.add('Welcome!');

    this.subs.push(
      timer(0, 3000)
        .pipe(
          switchMap(() =>
            this.http.get(`${environment.adminService.url}/status?clusterName=${environment.adminService.clusterName}`),
          ),
          tap((res: any) => {
            const prevStatus = this.status;
            this.status = res.status as Status;

            if (prevStatus !== this.status) {
              this.historyService.add(this.toHistory(this.status));
            }

            if (prevStatus !== Status.RUNNING && this.status === Status.RUNNING) {
              this.runningCount = 1;
              this.subs.push(
                this.http
                  .get<string>(
                    `${environment.adminService.url}/publicIpAddress?clusterName=${environment.adminService.clusterName}`,
                  )
                  .subscribe((res: any) => {
                    this.historyService.add(`IP Address: ${res.publicIpAddress}`);
                  }),
              );
            } else if (prevStatus === Status.RUNNING && this.status === Status.RUNNING && this.runningCount < 10) {
              this.runningCount++;
            } else if (prevStatus === Status.RUNNING && this.status === Status.RUNNING && this.runningCount === 10) {
              this.runningCount = 0;
              this.historyService.add('Server is healthy.');
            }
          }),
        )
        .subscribe(),
    );
  }

  private toHistory(status: Status) {
    switch (status) {
      case Status.RUNNING:
        return 'Server is running.';
      case Status.LAUNCHING:
        return 'Server is starting up.';
      case Status.PENDING:
        return 'Server status pending.';
      case Status.STOPPED:
        return 'Server is stopped.';
      default:
        return 'Server status unknown.';
    }
  }

  onTabChange(tab: string): void {
    switch (tab) {
      case 'create':
        this.tabTitle = 'Create';
        this.showCreate = true;
        this.showManage = false;
        this.showSettings = false;
        break;
      case 'manage':
        this.tabTitle = 'Manage';
        this.showCreate = false;
        this.showManage = true;
        this.showSettings = false;
        break;
      case 'settings':
        this.tabTitle = 'Settings';
        this.showCreate = false;
        this.showManage = false;
        this.showSettings = true;
        break;
      default:
        throw new Error(`Unhandled tab '${tab}'`);
    }
  }
  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
