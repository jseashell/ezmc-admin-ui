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
