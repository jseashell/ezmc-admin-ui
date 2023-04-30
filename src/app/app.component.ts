import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Status } from '@enums';
import { HistoryService } from '@services';
import { BehaviorSubject, Subscription, switchMap, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  private status = Status.UNKNOWN;
  private runningCount = 0;

  tabTitle$ = new BehaviorSubject('Manage');
  showCreate$ = new BehaviorSubject(false);
  showManage$ = new BehaviorSubject(true);
  showSettings$ = new BehaviorSubject(false);

  showHistory$ = new BehaviorSubject(false);
  historyCta$ = new BehaviorSubject('Show Console');

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

  onTabChange(event: Event): void {
    event.stopPropagation();

    const tabTitle = (event.target as HTMLInputElement).value;
    this.tabTitle$.next(tabTitle);

    switch (tabTitle) {
      case 'Create':
        this.showCreate$.next(true);
        this.showManage$.next(false);
        this.showSettings$.next(false);
        break;
      case 'Manage':
        this.showCreate$.next(false);
        this.showManage$.next(true);
        this.showSettings$.next(false);
        break;
      case 'Settings':
        this.showCreate$.next(false);
        this.showManage$.next(false);
        this.showSettings$.next(true);
        break;
      default:
        throw new Error(`Unhandled tab '${tabTitle}'`);
    }
  }

  toggleHistory(event: Event): void {
    event.stopPropagation();
    const next = !this.showHistory$.value;
    this.showHistory$.next(next);
    this.historyCta$.next(next ? 'Hide Console' : 'Show Console');
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
