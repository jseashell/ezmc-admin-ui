import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '@components';
import { ServicesModule } from './@core/services/services.module';
import { AppComponent } from './app.component';
import { CreateModule } from './create/create.module';
import { HistoryModule } from './history/history.module';
import { ManageModule } from './manage/manage.module';
import { SettingsModule } from './settings/settings.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ComponentsModule,
        CreateModule,
        HistoryModule,
        HttpClientTestingModule,
        ManageModule,
        RouterTestingModule,
        ServicesModule,
        SettingsModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
