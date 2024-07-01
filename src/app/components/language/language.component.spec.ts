import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageComponent } from './language.component';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageComponent],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
    });
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    const language = 'en';
    const useSpy = spyOn(translateService, 'use');
    component.switchLanguage(language);
    expect(useSpy).toHaveBeenCalledWith(language);
  });
});
