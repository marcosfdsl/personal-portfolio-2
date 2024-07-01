import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import esJson from '../../../assets/i18n/es.json';
import { UpdateTheme } from '../../components/theme/update-theme';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements AfterViewInit {
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

  cvEducationLength: number = esJson.cv.education.length;
  cvworkExperienceLength: number = esJson.cv.workExperience.length;
  cvSkillsLength: number = esJson.cv.skills.length;
  cvLanguagesLength: number = esJson.cv.languages.length;

  cvEducationIndexes(): number[] {
    return Array(this.cvEducationLength)
      .fill(0)
      .map((x, i) => i);
  }
  cvWorkExperienceIndexes(): number[] {
    return Array(this.cvworkExperienceLength)
      .fill(0)
      .map((x, i) => i);
  }
  cvSkillsIndexes(): number[] {
    return Array(this.cvSkillsLength)
      .fill(0)
      .map((x, i) => i);
  }
  cvLanguagesIndexes(): number[] {
    return Array(this.cvLanguagesLength)
      .fill(0)
      .map((x, i) => i);
  }
}
