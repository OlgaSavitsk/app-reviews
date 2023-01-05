import { Routes } from '@angular/router';
import { ReviewDetailsPageComponent } from './review-details-page.component';

export const reviewDetailsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReviewDetailsPageComponent,
  },
];
