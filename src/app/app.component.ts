import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    private subs: Subscription[] = [];
    history: { timestamp: Date; message: string }[] = [];
    isRunning = false;

    constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

    ngOnInit(): void {
        // x number of milliseconds
        this.subs.push(
            interval(5000)
                .pipe(
                    // make first request right away; otherwise we have to wait x seconds before first one
                    startWith(),

                    // cancel previous request if it had not finished yet
                    switchMap(() => {
                        // catch the error inside to allow for a retry each time
                        // you could also use `.catch` on the entire observable stream which will
                        // cancel it if there's an error.
                        return this.http.get(`${environment.adminService.url}/status`);
                    }),
                )
                .subscribe((data: any) => {
                    this.isRunning = data.isRunning;
                    this.cdr.markForCheck();
                }),
        );
    }

    onStart(): void {
        this.addToHistory('Starting game server...');
        this.subs.push(
            this.http.get(`${environment.adminService.url}/start`).subscribe((res: any) => {
                this.addToHistory(res.message);
            }),
        );
    }

    onStop(): void {
        this.addToHistory('Stopping game server...');
        this.subs.push(
            this.http.get(`${environment.adminService.url}/stop`).subscribe((res: any) => {
                this.addToHistory(res.message);
            }),
        );
    }

    private addToHistory(message: string): void {
        this.history.unshift({
            timestamp: new Date(),
            message: message,
        });
        console.log('Stopped game server.', message);
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub?.unsubscribe());
    }
}
