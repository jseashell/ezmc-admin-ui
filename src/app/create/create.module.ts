import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/@core/components/components.module';
import { CreateFormModule } from './create-form/create-form.module';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, ComponentsModule, CreateFormModule],
  exports: [CreateComponent],
})
export class CreateModule {}
