import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
//import { tokenInterceptor } from "@core/interceptors/token.interceptor";
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { AppModule } from './app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { apiInterceptor } from '@core/interceptors/api.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule, BrowserAnimationsModule),
    provideRouter(appRoutes),
    // provideHttpClient()
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
}).catch((err) => console.error(err));
