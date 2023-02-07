import { NgModule } from '@angular/core';
import { CreateModule } from './create/create.module';
import { HistoryModule } from './history/history.module';
import { ManageModule } from './manage/manage.module';
import { SettingsModule } from './settings/settings.module';

const modules = [CreateModule, HistoryModule, ManageModule, SettingsModule];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class CoreModule {}
