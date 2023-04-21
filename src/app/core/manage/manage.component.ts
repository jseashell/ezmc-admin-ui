import { Component } from '@angular/core';
import { GameService, HistoryService } from '@services';
import { Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent {
  private subs: Subscription[] = [];

  constructor(private gameService: GameService, private historyService: HistoryService) {}

  onStart(event: Event): void {
    event.stopPropagation();
    this.subs.push(
      this.gameService
        .start(environment.adminService.clusterName)
        .pipe(tap(() => this.historyService.add('Starting game server...')))
        .subscribe(),
    );
  }

  onStop(event: Event): void {
    event.stopPropagation();
    this.subs.push(
      this.gameService
        .stop(environment.adminService.clusterName)
        .pipe(tap(() => this.historyService.add('Stopping game server...')))
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
