import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {BrowserStorageService} from "./BrowserStorageService/BrowserStorage.service";
import {BrowserStorageServerService} from "./BrowserStorageService/BrowserStorageServerService";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: BrowserStorageService,
      useClass: BrowserStorageServerService,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppServerModule {}
