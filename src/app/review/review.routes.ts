import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReviewEffects } from '@redux/effects/review.effect';
import * as fromReview from '../redux/reducers/review.reducer';
import { ReviewComponent } from './review.component';

export const reviewRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReviewComponent,
  },
  {
    path: ':id',
    component: ReviewComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('review', fromReview.reviewReduser),
        EffectsModule.forFeature([ReviewEffects])
      ),
    ],
  },
];
