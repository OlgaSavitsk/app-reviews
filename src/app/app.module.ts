import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import * as fromUser from './redux/reducers/user.reduser'
import { UserEffects } from './redux/effects';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    NgOptimizedImage,
    StoreModule.forRoot({ user: fromUser.userReduser }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // StoreModule.forFeature('users', reducer),
    EffectsModule.forRoot([UserEffects]),
    // EffectsModule.forFeature([UserEffects]),
    StoreRouterConnectingModule.forRoot()],
  providers: [],
  bootstrap: [],
})
export class AppModule { }
