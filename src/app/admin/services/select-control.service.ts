import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { UserDetails, UserInfo } from 'src/app/models/user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectControlService {
  userDetails: UserDetails = {
    users: [],
    completed: false,
  };
  allComplete: boolean = false;
  checkedUsers: UserInfo[] = [];
  userState$!: Observable<UserInfo[]>;
  currentUser: string = '';
  completedUser!: boolean;

  constructor(public authService: AuthService) { }

  updateAllComplete(el: any): void {
    this.allComplete =
      this.userDetails.users != null && this.userDetails.users.every((t) => t.completed);
    this.currentUser = el.name;
    this.completedUser = el.completed;
  }

  someComplete(): boolean {
    if (this.userDetails.users == null) {
      return false;
    }
    this.checkedUsers = this.userDetails.users.filter((t) => t.completed);
    return this.checkedUsers.length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    if (this.userDetails.users == null) {
      return;
    }
    this.userDetails.users.forEach((user) => (user.completed = completed));
  }
}
