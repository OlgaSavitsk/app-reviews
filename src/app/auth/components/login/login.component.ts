import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { ValidationService } from '@core/services/validation.service';
import { Path } from 'src/app/app.constants';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class SigninComponent implements OnInit {
  formGroup!: FormGroup;
  private errorMessage$ = new BehaviorSubject<string>('');
  errorMessage$$ = this.errorMessage$.pipe();
  private ngUnsubscribe = new Subject();

  constructor(
    private authService: AuthService,
    public validationService: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.validationService.setValidationErrors(this.formGroup);
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe({
        next: (response) => {
          this.router.navigateByUrl(Path.adminPage);
        },
        error: (err) => {
          this.errorMessage$.next(err.error.message);
        },
      });
    }
  }

  googleLogin() {
    window.open(environment.GOOGLE_URL, '_self');
  }

  githubLogin() {
    window.open(environment.GIT_HUB_URL, '_self');
  }
}
