import { Routes } from '@angular/router';

import { Path } from '../app.constants';
import { SigninComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthPageComponent } from './pages/auth-page.component';

export const authroutes: Routes = [
  { path: Path.signupPage, component: SignupComponent },
  { path: Path.loginPage, component: SigninComponent },
];
