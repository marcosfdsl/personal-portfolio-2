import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Injectable({
  providedIn: 'root',
})
export class authGoogleGuard {
  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authGoogleService.isSessionActive()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
