import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ManageComponent } from './manage.component';

@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ManageComponent],
})
export class ManageModule {}
