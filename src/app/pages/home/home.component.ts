/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UpdateTheme } from '../../components/theme/update-theme';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess!: boolean;
  inputAmount: string = '1.00';
  inputCurrency: string = 'USD';
  currencies: string[] = [
    'USD',
    'EUR',
    'GBP',
    'CHF',
    'CAD',
    'AUD',
    'MXN',
    'BRL',
    'RUB',
    'HKD',
    'JPY',
  ];
  name: string | null = null;
  web3: any;
  metamaskConnected: boolean = false;
  inputAmountMetaMask: string = '0.001';

  constructor(private authGoogleService: AuthGoogleService) {
    const savedTheme: string | null = localStorage.getItem('isDarkTheme');
    this.isDarkTheme =
      savedTheme !== null
        ? savedTheme === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
    }
  }

  ngOnInit(): void {
    const selectedCurrency = localStorage.getItem('selectedCurrency');
    if (selectedCurrency && this.currencies.includes(selectedCurrency)) {
      this.inputCurrency = selectedCurrency;
    } else {
      this.inputCurrency = this.currencies[0];
    }
    this.initConfig();

    const profile = this.authGoogleService.getProfile();
    if (profile) {
      this.name = ` ${profile['name']}`;
    } else {
      this.name = '';
    }
  }

  connectToMetamask(): void {
    if (!this.web3) {
      console.error('Metamask is not installed');
      return;
    }

    this.web3.eth
      .requestAccounts()
      .then((accounts: string[]) => {
        const pElement: NodeListOf<HTMLElement> =
          document.querySelectorAll('.metamask-p');
        if (pElement.length > 0) {
          pElement.forEach((element) => {
            element.style.opacity = '1';
          });
        }

        const connectedElement: HTMLElement | null = document.querySelector(
          '.metamask-connected'
        );
        if (connectedElement) {
          connectedElement.innerHTML += `${accounts[0]}`;
        }
        const metamaskButtonElement: HTMLElement | null =
          document.querySelector('.metamask-connect');
        if (metamaskButtonElement) {
          metamaskButtonElement.style.display = 'none';
        }
        console.log('Connected to Metamask. User address:', accounts[0]);
        this.metamaskConnected = true;
      })
      .catch((error: unknown) => {
        console.error('Error connecting to Metamask:', error);
      });
  }

  metamaskPayment(): void {
    if (!this.web3) {
      console.error('Metamask is not installed');
      return;
    }

    this.web3.eth.getAccounts().then((accounts: string[]) => {
      const sender = accounts[0];
      const receiver = '0xe7D618092EbC1A7Fe973A8541e2e40C5cc76671a';
      const amount = this.web3.utils.toWei('0.0001', 'ether');

      this.web3.eth
        .sendTransaction({
          from: sender,
          to: receiver,
          value: amount,
        })
        .then((receipt: unknown) => {
          console.log('Transaction completed:', receipt);
        })
        .catch((error: unknown) => {
          const errorElement: HTMLElement | null =
            document.querySelector('.metamask-error');
          if (errorElement) {
            errorElement.style.opacity = '1';
          }
          console.error('Error while processing payment:', error);
        });
    });
  }

  updateCurrency(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.inputCurrency = target.value;
    localStorage.setItem('selectedCurrency', this.inputCurrency);
    this.reloadPage();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: this.inputCurrency,
      clientId:
        'Ab4Fe-3MEuZq5YmmyOJ4c8wYG_M08kx04siiEBtgK4wFDk_ZlON_npfmD8xcpoLqnSbbNKlASkooJJGt',
      createOrderOnClient: () =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: this.inputCurrency,
                value: this.inputAmount,
                breakdown: {
                  item_total: {
                    currency_code: this.inputCurrency,
                    value: this.inputAmount,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: this.inputCurrency,
                    value: this.inputAmount,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onClientAuthorization: () => {
        this.showSuccess = true;
        const thanksElement: HTMLElement | null =
          document.querySelector('.thanks');
        if (thanksElement) {
          thanksElement.style.opacity = '1';
        }
      },
    };
  }

  reloadPage(): void {
    window.location.reload();
  }

  isDarkTheme: boolean;

  ngAfterViewInit(): void {
    UpdateTheme.updateTheme(this.isDarkTheme);
  }
  openPhoto() {
    window.open('https://i.ibb.co/1LWPk4m/FOTO-CARN-3.png', '_blank');
  }
  openContact() {
    window.open('mailto:mark.musicteam@hotmail.com');
  }
}
