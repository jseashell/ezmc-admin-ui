import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateFormModule } from './create-form/create-form.module';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, CreateFormModule],
  exports: [CreateComponent],
})
export class CreateModule {}
