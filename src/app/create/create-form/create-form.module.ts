import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form.component';

@NgModule({
  declarations: [CreateFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CreateFormComponent],
})
export class CreateFormModule {}
