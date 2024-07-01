import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name: string = '';
  email: string = '';

  constructor(private authGoogleService: AuthGoogleService) {}

  ngOnInit() {
    this.showData();
  }

  showData() {
    const data = this.authGoogleService.getProfile();
    if (data) {
      const dataObject = JSON.parse(JSON.stringify(data));
      this.name = dataObject.name;
      this.email = dataObject.email;
    } else {
      console.error('Error trying to obtain data.');
    }
  }
  

  logOut() {
    this.authGoogleService.logout();
    window.location.href = '/';
  }
}
