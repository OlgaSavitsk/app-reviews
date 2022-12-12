import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent],
  // providers: [{
  //   provide: 'SocialAuthServiceConfig',
  //   useValue: {
  //     autoLogin: true,
  //     providers: [
  //       {
  //         id: GoogleLoginProvider.PROVIDER_ID,
  //         provider: new GoogleLoginProvider(`${environment.GOOGLE_CLIENT_ID}`)
  //       }
  //     ]
  //   }
  // }],
  bootstrap: [],
})
export class AppModule { }
