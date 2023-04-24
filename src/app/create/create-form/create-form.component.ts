import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  createForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  submit(event: Event): void {
    event.stopPropagation();
  }
}
