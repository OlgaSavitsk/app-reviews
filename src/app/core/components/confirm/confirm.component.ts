import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';

import { ConfirmDialog } from 'src/app/models/confirm-dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MaterialModule, TranslateModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {}
}
