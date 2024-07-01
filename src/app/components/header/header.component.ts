import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

interface WeatherResponse {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  weatherData!: WeatherResponse;
  private ipAddressSubscription: Subscription | undefined;
  private weatherDataSubscription: Subscription | undefined;
  picture!: string;
  isSessionActive: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    public authGoogleService: AuthGoogleService
  ) {}

  ngOnInit(): void {
    this.getUserIP();
    this.translate.onLangChange.subscribe(() => {
      this.getUserIP();
    });

    const profile = this.authGoogleService.getProfile();
    if (profile) {
      this.picture = profile['picture'];
    } else {
      this.picture =
        'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp';
    }
  }

  updatePicture(url: string) {
    this.picture = url;
  }

  getUserIP(): void {
    this.ipAddressSubscription = this.http
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .subscribe({
        next: (response) => {
          const ipAddress = response.ip;
          this.getWeatherByIP(ipAddress);
        },
        error: (error) => {
          console.error('Error fetching user IP:', error);
        },
      });
  }

  getWeatherByIP(ipAddress: string): void {
    const apiKey = '14f23aeec6a14fd48ea181740241504';

    const lang = this.translate.currentLang || 'es';

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&lang=${lang}&q=${ipAddress}`;

    this.weatherDataSubscription = this.http
      .get<WeatherResponse>(url)
      .subscribe({
        next: (response) => {
          if (response) {
            this.weatherData = response;
          } else {
            console.error('Empty weather data received');
          }
        },
        error: (error) => {
          console.error('Error fetching weather data:', error);
        },
      });
  }

  goTo(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  ngOnDestroy(): void {
    if (this.ipAddressSubscription) {
      this.ipAddressSubscription.unsubscribe();
    }
    if (this.weatherDataSubscription) {
      this.weatherDataSubscription.unsubscribe();
    }
  }
}
