import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoryService } from '@services';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  createForm: FormGroup;
  @Output() cancel = new EventEmitter();
  constructor(private fb: FormBuilder, private historyService: HistoryService) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: [''],
    });
  }

  submit(event: Event): void {
    event.stopPropagation();
    this.historyService.add(`Creating ${this.createForm.controls.name.value}`);
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.cancel.emit();
  }
}
