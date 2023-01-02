import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/app.constants';

import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
})
export class LangComponent {
  siteLanguage!: string;

  languageList = [
    { code: Language[0], label: Language.langEn },
    { code: Language[1], label: Language.langRu },
  ];

  constructor(private translateService: TranslateService) {}

  changeLang(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLang = this.languageList
      .find((lang) => lang.code === target.value)
      ?.label.toString();
    selectedLang && (this.siteLanguage = selectedLang);
    this.translateService.use(target.value);
  }
}
