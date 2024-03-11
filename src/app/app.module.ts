import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {JwtModule} from '@auth0/angular-jwt';
import {BrowserStorageService} from "./BrowserStorageService/BrowserStorage.service";
import {DashboardComponent} from "./dashboard/dashboard.component";



export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({maxAge: 25}),
        JwtModule.forRoot({ // for JwtHelperService
            config: {
                tokenGetter
            }
        }),
        DashboardComponent
    ],
  providers: [BrowserStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
    ]
})
export class AppModule {
}
