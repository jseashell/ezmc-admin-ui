import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    history: { timestamp: Date; message: string }[] = [];
    publicIpAddress$: ReplaySubject<String> = new ReplaySubject(1);

    constructor(private http: HttpClient) {}

    onStart(): void {
        this.addToHistory('Starting game server...');
        this.http.get<string>(`${environment.adminService.url}/start`).subscribe((_res: string) => {
            const getStatus = setTimeout(() => {
                this.http.get<string>(`${environment.adminService.url}/status`).subscribe((res: string) => {
                    if (res === 'RUNNING') {
                        clearTimeout(getStatus);
                        this.addToHistory('Started successfully!');
                        this.http.get<string>(`${environment.adminService.url}/publicIpAddress`).subscribe((res) => {
                            this.addToHistory(`IP Address: ${res}`);
                        });
                    } else {
                        this.addToHistory('Checking status...');
                    }
                });
            }, 1000);
        });
    }

    onStop(): void {
        this.addToHistory('Stopping game server...');
        this.http.get<string>(`${environment.adminService.url}/stop`).subscribe((_res: string) => {
            const getStatus = setTimeout(() => {
                this.http.get<string>(`${environment.adminService.url}/status`).subscribe((res: string) => {
                    if (res === 'RUNNING') {
                        clearTimeout(getStatus);
                        this.addToHistory('Stopped successfully!');
                    } else {
                        this.addToHistory('Checking status...');
                    }
                });
            }, 1000);
        });
    }

    private addToHistory(message: string): void {
        this.history.unshift({
            timestamp: new Date(),
            message: message,
        });
        console.log('Stopped game server.', message);
    }
}
