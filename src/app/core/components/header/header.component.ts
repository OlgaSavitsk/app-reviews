import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderAnimateDirective } from '@core/directives/header-animate.directive';
import { SocialAuthService } from 'angularx-social-login';

import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderAnimateDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  slideValue: boolean = false;
  lang!: string;
  constructor(private router: Router) { }

  changeLang(value: boolean): void {
    if (value) {
      this.lang = 'en';
    } else {
      this.lang = 'ru';
    }
    //this.translateService.use(this.lang);
  }

  logout() {
    window.open('http://localhost:4200/auth/logout', '_self')
    //this.socialAuthService.signOut().then(() => this.router.navigate(['signup']))
  }
}
