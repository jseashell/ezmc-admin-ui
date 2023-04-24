import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/@core/components/components.module';
import { CreateFormComponent } from './create-form.component';

@NgModule({
  declarations: [CreateFormComponent],
  imports: [CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  exports: [CreateFormComponent],
})
export class CreateFormModule {}
