import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { UserInfo } from 'src/app/models/user.interfaces';
import { SelectControlService } from './services/select-control.service';
import { displayedColumns } from '../app.constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns = displayedColumns;
  userState: UserInfo[] = [];
  currentName!: string;

  constructor(
    public authService: AuthService,
    public selectControlService: SelectControlService,
  ) {}

  ngOnInit(): void {}
}
