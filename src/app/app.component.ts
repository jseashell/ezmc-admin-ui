import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
    private subs: Subscription[] = [];
    history: { timestamp: Date; message: string }[] = [];

    constructor(private http: HttpClient) {}

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
