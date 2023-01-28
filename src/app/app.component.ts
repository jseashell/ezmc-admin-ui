import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, ReplaySubject, Subscription, switchMap, tap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from './shared/enums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    private subs: Subscription[] = [];

    history: { timestamp: Date; message: string }[] = [];
    publicIpAddress$: ReplaySubject<String> = new ReplaySubject(1);

    private status: Status = Status.UNKNOWN;
    private runningCount: number = 0;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.subs.push(
            timer(0, 3000)
                .pipe(
                    switchMap(() =>
                        this.http.get(
                            `${environment.adminService.url}/status?clusterName=${environment.adminService.clusterName}`,
                        ),
                    ),
                    tap((res: any) => {
                        const prevStatus = this.status;
                        this.status = res.status as Status;

                        if (prevStatus !== this.status) {
                            this.addToHistory(this.toHistory(this.status));
                        }

                        if (prevStatus !== Status.RUNNING && this.status === Status.RUNNING) {
                            this.runningCount = 1;
                            this.subs.push(
                                this.http
                                    .get<string>(
                                        `${environment.adminService.url}/publicIpAddress?clusterName=${environment.adminService.clusterName}`,
                                    )
                                    .subscribe((res: any) => {
                                        this.addToHistory(`IP Address: ${res.publicIpAddress}`);
                                    }),
                            );
                        } else if (
                            prevStatus === Status.RUNNING &&
                            this.status === Status.RUNNING &&
                            this.runningCount < 10
                        ) {
                            this.runningCount++;
                        } else if (
                            prevStatus === Status.RUNNING &&
                            this.status === Status.RUNNING &&
                            this.runningCount === 10
                        ) {
                            this.runningCount = 0;
                            this.addToHistory('Server is healthy.');
                        }
                    }),
                )
                .subscribe(),
        );
    }

    onStart(): void {
        this.subs.push(
            this.http
                .get<string>(
                    `${environment.adminService.url}/start?clusterName=${environment.adminService.clusterName}`,
                )
                .pipe(
                    tap(() => this.addToHistory('Starting game server...')),
                    catchError((err, caught) => {
                        console.error(err);
                        this.addToHistory('Request to start game server failed.');
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
                    tap(() => this.addToHistory('Stopping game server...')),
                    catchError((err, caught) => {
                        console.error(err);
                        this.addToHistory('Request to stop game server failed.');
                        return EMPTY;
                    }),
                )
                .subscribe(),
        );
    }

    private addToHistory(message: string): void {
        this.history.unshift({
            timestamp: new Date(),
            message: message,
        });
        console.log('Stopped game server.', message);
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
}
