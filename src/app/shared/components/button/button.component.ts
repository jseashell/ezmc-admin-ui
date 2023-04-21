import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Output() click: EventEmitter<Event> = new EventEmitter();
  @Input() active: boolean | null;

  onClick(event: Event): void {
    this.click.emit(event);
  }
}
