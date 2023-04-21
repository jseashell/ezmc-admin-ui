import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HistoryService } from '@services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private http: HttpClient, private historyService: HistoryService) {}

  create(event: Event) {
    event.stopPropagation();
    this.historyService.add('Create pressed');
  }
}
