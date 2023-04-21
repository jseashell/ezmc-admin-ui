import { Component } from '@angular/core';
import { AdminService, HistoryService } from '@services';
import { Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent {
  private subs: Subscription[] = [];

  constructor(private adminService: AdminService, private historyService: HistoryService) {}

  onStart(event: Event): void {
    event.stopPropagation();
    this.subs.push(
      this.adminService
        .start(environment.adminService.clusterName)
        .pipe(tap(() => this.historyService.add('Starting game server...')))
        .subscribe(),
    );
  }

  onStop(event: Event): void {
    event.stopPropagation();
    this.subs.push(
      this.adminService
        .stop(environment.adminService.clusterName)
        .pipe(tap(() => this.historyService.add('Stopping game server...')))
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
