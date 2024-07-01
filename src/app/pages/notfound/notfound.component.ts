import { Component, AfterViewInit } from '@angular/core';
import { UpdateTheme } from '../../components/theme/update-theme';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements AfterViewInit {
  isDarkTheme: boolean;

  constructor() {
    const savedTheme = localStorage.getItem('isDarkTheme');
    this.isDarkTheme =
      savedTheme !== null
        ? savedTheme === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  ngAfterViewInit(): void {
    UpdateTheme.updateTheme(this.isDarkTheme);
  }
}
