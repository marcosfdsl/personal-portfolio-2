import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UpdateTheme } from '../../components/theme/update-theme';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements AfterViewInit {
  isDarkTheme: boolean;

  ngAfterViewInit(): void {
    UpdateTheme.updateTheme(this.isDarkTheme);
  }

  constructor(translate: TranslateService) {
    translate.setDefaultLang('es');

    const savedTheme = localStorage.getItem('isDarkTheme');
    this.isDarkTheme =
      savedTheme !== null
        ? savedTheme === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
