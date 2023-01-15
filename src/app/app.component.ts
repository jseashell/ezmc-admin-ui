import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    private subs: Subscription[] = [];

    constructor(private http: HttpClient) {}

    history: { timestamp: Date; message: string }[] = [];

    ngOnInit(): void {}

    onStart(): void {
        this.history.unshift({
            timestamp: new Date(),
            message: 'Starting game server...',
        });
        this.subs.push(
            this.http.get(environment.adminService.start).subscribe((res: any) => {
                this.history.unshift({
                    timestamp: new Date(),
                    message: res.message,
                });
                console.log('Started game server.', res);
            }),
        );
    }

    onStop(): void {
        this.history.unshift({
            timestamp: new Date(),
            message: 'Stopping game server...',
        });
        this.subs.push(
            this.http.get(environment.adminService.stop).subscribe((res: any) => {
                this.history.unshift({
                    timestamp: new Date(),
                    message: res.message,
                });
                console.log('Stopped game server.', res);
            }),
        );
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub?.unsubscribe());
    }
}
