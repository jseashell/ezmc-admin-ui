import { Component, OnInit } from '@angular/core';
import { AdminServer, AdminService, HistoryService } from '@services';
import { Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  private subs: Subscription[] = [];
  servers$: Observable<AdminServer[]>;

  constructor(private adminService: AdminService, private historyService: HistoryService) {}

  ngOnInit(): void {
    this.servers$ = this.adminService.servers$;
  }

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

  onDelete(event: Event): void {
    event.stopPropagation();
    this.subs.push(
      this.adminService
        .down()
        .pipe(tap(() => this.historyService.add('Deleting game server...')))
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
