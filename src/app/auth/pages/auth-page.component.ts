import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SigninComponent } from '@auth/components/login/login.component';
import { SignupComponent } from '@auth/components/signup/signup.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, SigninComponent, SignupComponent, RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {}
