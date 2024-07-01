import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRoutingModule } from './cv-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { CvComponent } from './cv.component';
import { NgxPayPalModule } from 'ngx-paypal';

export function cvHTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    CvComponent
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    CvRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: cvHTTPLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
  ],
})
export class CvModule { }
