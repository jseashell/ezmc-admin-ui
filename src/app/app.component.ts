import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    history: { timestamp: Date; message: string }[] = [];

    onStart(): void {
        this.history.unshift({
            timestamp: new Date(),
            message: 'Game server started.',
        });
    }

    onStop(): void {
        this.history.unshift({
            timestamp: new Date(),
            message: 'Game server stopped.',
        });
    }
}
