import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.translate.setDefaultLang('es');
    this.updateTitle();
  }

  updateTitle() {
    this.translate
      .get('title')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translatedTitle: string) => {
        this.titleService.setTitle(translatedTitle);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
