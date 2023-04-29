import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageComponent } from './manage.component';

@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule],
  exports: [ManageComponent],
})
export class ManageModule {}
