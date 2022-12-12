import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ValidationService } from '@core/services/validation.service';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Path } from 'src/app/app.constants';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, NgOptimizedImage],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  isSpinner: boolean = false;

  private ngUnsubscribe = new Subject();
  private errorMessage$ = new BehaviorSubject<string>('');
  errorMessage$$ = this.errorMessage$.pipe();

  constructor(
    private authService: AuthService,
    public validationService: ValidationService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
      roles: new FormControl('admin')
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.validationService.setValidationErrors(this.formGroup);
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault()
    this.isSpinner = !this.isSpinner;
    this.authService.signUp(this.formGroup.value).subscribe({
      next: () => {
        this.formGroup.reset();
        this.isSpinner = false;
        this.router.navigate([Path.loginPage])
      },
      error: (err) => {
        this.errorMessage$.next(err.error.message);
        this.isSpinner = false;
      }
    });
  }

  google() {
    window.open("http://localhost:4000/auth/google", '_self')
  }

  github() {
    window.open("http://localhost:4000/auth/github", '_self')
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
