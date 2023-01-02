import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ValidationService } from '@core/services/validation.service';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { Path } from 'src/app/app.constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, NgOptimizedImage, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  isSpinner = false;

  private ngUnsubscribe = new Subject();

  private errorMessage$ = new BehaviorSubject<string>('');

  errorMessage$$ = this.errorMessage$.pipe();
  // roles = new FormControl({value: false, disabled: true});

  constructor(
    private authService: AuthService,
    public validationService: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.validationService.setValidationErrors(this.formGroup);
    });
    if (!this.formGroup.invalid) {
      this.formGroup.get('roles')?.enable();
    }
  }

  setRole(complete = false) {
    if (complete) {
      this.formGroup.addControl('roles', new FormControl('admin'));
    } else {
      this.formGroup.removeControl('roles');
    }
    return 'admin';
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    this.isSpinner = !this.isSpinner;
    this.authService.register(this.formGroup.value).subscribe({
      next: () => {
        this.formGroup.reset();
        this.isSpinner = false;
        this.router.navigateByUrl(Path.loginPage);
      },
      error: (err) => {
        this.errorMessage$.next(err.error.message);
        this.isSpinner = false;
      },
    });
  }

  googleLogin() {
    window.open('http://localhost:4000/auth/google', '_self');
  }

  githubLogin() {
    window.open('http://localhost:4000/auth/github', '_self');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
