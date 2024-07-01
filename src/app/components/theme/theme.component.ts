import { Component, OnInit } from '@angular/core';
import { UpdateTheme } from './update-theme';
import { ImagePaths } from '../../../assets/img-paths';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  isDarkTheme: boolean = false;
  backgroundUrl: string = ImagePaths.backgroundUrl;
  contactIconUrl: string = ImagePaths.contactIconUrl;
  backgroundUrlDark: string = ImagePaths.backgroundUrlDark;
  contactIconUrlDark: string = ImagePaths.contactIconUrlDark;

  ngOnInit(): void {
    this.detectColorScheme();
    this.updateWeatherText();
  }

  async toggleTheme(): Promise<void> {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? 'true' : 'false');
    await this.waitForWeatherText();
    this.updateWeatherText();
  }

  async detectColorScheme(): Promise<void> {
    const savedTheme = localStorage.getItem('isDarkTheme');
    this.isDarkTheme =
      savedTheme !== null
        ? savedTheme === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    await this.waitForWeatherText();
    this.updateTheme();
  }

  async waitForWeatherText(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkWeatherText = () => {
        const weather = document.querySelectorAll<HTMLElement>('.weather-text');
        weather.length > 0
          ? resolve()
          : requestAnimationFrame(checkWeatherText);
      };
      requestAnimationFrame(checkWeatherText);
    });
  }

  updateTheme(): void {
    UpdateTheme.updateTheme(this.isDarkTheme);
  }

  updateWeatherText(): void {
    const weather = document.querySelectorAll<HTMLElement>('.weather-text');
    weather.forEach((element) => {
      element.classList.toggle('inverted', !this.isDarkTheme);
    });
  }
}
