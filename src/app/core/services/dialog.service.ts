import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmComponent } from '@core/components/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialog } from 'src/app/models/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private translateService: TranslateService) {}

  confirmDialog(data: ConfirmDialog): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data: {
          param: this.translateService.instant(data.param),
        },
        width: '40%',
        disableClose: true,
      })
      .afterClosed();
  }
}
