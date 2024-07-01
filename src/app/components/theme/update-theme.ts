export class UpdateTheme {
  static updateTheme(isDarkTheme: boolean): void {
    const backgrounds = document.querySelectorAll<HTMLElement>('.background');
    const contact = document.querySelector<HTMLImageElement>('.contact-icon');
    const containerCv = document.querySelector<HTMLElement>('.container-cv');

    const backgroundUrl = isDarkTheme
      ? 'assets/img/fondo1.webp'
      : 'assets/img/fondo0.webp';
    const contactIconUrl = isDarkTheme
      ? 'assets/img/svg/envelope-icon.svg'
      : 'assets/img/svg/envelope-icon-black.svg';

    if (backgrounds) {
      backgrounds.forEach((fondo) => {
        fondo.style.backgroundImage = `url('${backgroundUrl}')`;
      });
    }

    if (contact) {
      contact.src = contactIconUrl;
    }

    if (containerCv) {
      if (!isDarkTheme) {
        containerCv.classList.remove('bg-white');
        containerCv.classList.add('bg-black');
      } else {
        containerCv.classList.remove('bg-black');
        containerCv.classList.add('bg-white');
      }
    }

    const elements = document.querySelectorAll<HTMLElement>(
      'p, h1, h2, h3, h4, h5, span, .icon, .car-icons, .reversible-link'
    );
    elements.forEach((element) => {
      element.classList.toggle('inverted', !isDarkTheme);
    });
  }
}
