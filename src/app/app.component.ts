import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from '@auth/components/signup/signup.component';
import { AuthPageComponent } from '@auth/pages/auth-page.component';

import { AuthService } from '@auth/services/auth.service';
import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header.component';
import { UserInfo } from 'src/app/models/user.interfaces';
import { MainPageComponent } from './main-page/main-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  currentName!: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUserName$$.subscribe((name) => (this.currentName = name));
  }

  @HostListener('document: click', ['$event'])
  async onClick(event: any) {
    (await this.authService.getToken()) &&
      this.authService.getUsers().subscribe((users: UserInfo[]) => {
        // const blockedUser = this.userControlService.serchBlockedUser(users, this.currentName);
        // const deletedUser = this.userControlService.searchDeletedUser(users, this.currentName);
        // (blockedUser.length > 0 || !deletedUser) && this.authService.logout();
      });
  }
}
