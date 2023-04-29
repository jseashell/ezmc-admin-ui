import { NgModule } from '@angular/core';
import { ServicesModule } from './services';

const modules = [ServicesModule];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class CoreModule {}
