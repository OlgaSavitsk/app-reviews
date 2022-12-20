import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { DateAgoPipe } from '@core/pipes/date-ago.pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Path } from '../app.constants';
import { UserEffects } from '../redux/effects';
import * as fromUser from '../redux/reducers/user.reduser';
import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('user', fromUser.userReduser),
        EffectsModule.forFeature([UserEffects]),
      ),
    ],
  },
];
