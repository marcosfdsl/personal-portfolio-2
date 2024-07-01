import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPayPalModule } from 'ngx-paypal';
import { OAuthModule } from 'angular-oauth2-oidc';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LanguageComponent } from './components/language/language.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/account/account.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { RouterModule } from '@angular/router';

export function HTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ThemeComponent,
    NotfoundComponent,
    LanguageComponent,
    LoginComponent,
    AccountComponent,
    LoadingComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HTTPLoaderFactory,
        deps: [HttpClient],
      },
    }),
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
