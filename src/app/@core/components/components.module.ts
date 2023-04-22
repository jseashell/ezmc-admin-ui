import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';

const modules = [ButtonModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class ComponentsModule {}
