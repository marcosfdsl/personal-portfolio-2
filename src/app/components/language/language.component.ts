import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
