import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface History {
  timestamp: Date;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private _history$: BehaviorSubject<History[]> = new BehaviorSubject([] as History[]);

  get history$(): Observable<History[]> {
    return this._history$.asObservable();
  }

  add(message: string): void {
    const history = this._history$.value;
    history.unshift({
      timestamp: new Date(),
      message: message,
    } as History);
    this._history$.next(history);
  }
}
