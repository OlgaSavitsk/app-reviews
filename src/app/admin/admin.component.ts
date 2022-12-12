import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { UserInfo } from 'src/app/models/user.interfaces';
import { UserApiService } from '@core/services/user-api.service';
import { SelectControlService } from './services/select-control.service';
import { BlockStatus, displayedColumns } from '../app.constants';

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
    //private userControlService: UserControlService,
    private userService: UserApiService,
    public selectControlService: SelectControlService
  ) { }

  ngOnInit(): void {
    this.authService.currentUserName$$.subscribe((name) => (this.currentName = name));
    // this.getAllUsers();
    // this.blockUser();
    // this.deleteUser();
  }

  // blockUser() {
  //   this.userControlService.blockStatus$.subscribe((val) => {
  //     this.selectControlService.checkedUsers.forEach((user) => {
  //       if (user.status == val) return;
  //       if (user.completed) {
  //         user.status = val;
  //         this.userService.updateUserStatus(val, user.id).subscribe();
  //         val === BlockStatus.blocked && this.logout();
  //       }
  //     });
  //   });
  // }

  // deleteUser(): void {
  //   this.userControlService.isDeleted$.subscribe((val: boolean) => {
  //     val &&
  //       this.selectControlService.checkedUsers.forEach((user) => {
  //         this.userService.deleteUser(user.id).subscribe();
  //         this.userControlService.deleteUser(false);
  //         this.setUserState(user.id);
  //         this.logout();
  //       });
  //   });
  // }

  logout(): void {
    if (
      (this.selectControlService.completedUser &&
        this.currentName === this.selectControlService.currentUser) ||
      !this.userState.length
    ) {
      this.authService.logout();
    }
    return;
  }

  setUserState(id: string) {
    this.userState = this.selectControlService.userDetails.users.filter((user) => user.id !== id);
    this.selectControlService.userDetails.users = this.userState;
    return this.userState;
  }

  public async getAllUsers(): Promise<void> {
    await this.authService.getUsers().subscribe((users: UserInfo[]) => {
      this.selectControlService.userDetails.users = users;
      this.userState = users;
      this.selectControlService.userDetails.users.forEach((user) => (user.completed = false));
    });
  }
}
