import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GameService } from './game.service';
import { HistoryService } from './history.service';

@NgModule({
  imports: [CommonModule],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [HistoryService, GameService],
    };
  }
}
