import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormError } from 'src/app/models/forms.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  errorMessage: string = '';

  setValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl!.hasError('required')) {
        this.errorMessage = 'You must enter a value';
      }
      return this.errorMessage;
    });
  }
}
