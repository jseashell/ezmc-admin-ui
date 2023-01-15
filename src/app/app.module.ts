import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
