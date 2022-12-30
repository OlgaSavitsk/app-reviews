import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from '../redux/effects/user.effects';
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
