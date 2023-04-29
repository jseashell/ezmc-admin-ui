import { Component } from '@angular/core';
import { HistoryService } from '@services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private historyService: HistoryService) {}

  foo(event: Event): void {
    event.stopPropagation();
    this.historyService.add('Foo pressed');
  }
}
