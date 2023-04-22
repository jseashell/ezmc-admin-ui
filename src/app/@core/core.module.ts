import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services';

const modules = [ComponentsModule, ServicesModule];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class CoreModule {}
