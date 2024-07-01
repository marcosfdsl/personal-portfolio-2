import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { PortfolioComponent } from './portfolio.component';
import { ProjectComponent } from '../../components/project/project.component';
import { NgxPayPalModule } from 'ngx-paypal';

export function portfolioHTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [PortfolioComponent, ProjectComponent],
  imports: [
    CommonModule,
    NgxPayPalModule,
    PortfolioRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: portfolioHTTPLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
  ],
})
export class PortfolioModule {}
