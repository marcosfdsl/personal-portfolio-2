import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { AccountComponent } from './pages/account/account.component';
import { authGoogleGuard } from './guards/auth-google.guard';

const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'loading',
    title: 'Loading...',
    component: LoadingComponent,
  },
  {
    path: 'account',
    title: 'Account',
    component: AccountComponent,
    canActivate: [authGoogleGuard],
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'cv',
    loadChildren: () =>
      import('./modules/cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./modules/portfolio/portfolio.module').then(
        (m) => m.PortfolioModule
      ),
  },
  {
    path: '**',
    title: '404 Not Found',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
