import { Component, OnInit } from '@angular/core';
import { History, HistoryService } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  history$: Observable<History[]>;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.history$ = this.historyService.history$;
  }
}
