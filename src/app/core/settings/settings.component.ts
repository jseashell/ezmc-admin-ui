import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '@services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private http: HttpClient, private historyService: HistoryService) {}

  foo(): void {}
}
