import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderComponent implements AfterViewInit {
  private images: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Capoeira%2C_Brazils.png/500px-Capoeira%2C_Brazils.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Rugendasroda.jpg/500px-Rugendasroda.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Ant%C3%B4nio_Parreiras_-_Zumbi.jpg/500px-Ant%C3%B4nio_Parreiras_-_Zumbi.jpg'
  ];  

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupCarrossel();
  }

  private setupCarrossel(): void {
    const carrosselContainer = document.querySelector<HTMLElement>('.carousel-inner');
    const indicatorsContainer = document.querySelector<HTMLElement>('.carousel-indicators');

    if (!carrosselContainer || !indicatorsContainer) return;

    this.images.forEach((image, index) => {
      // Cria botão indicador
      const button = this.renderer.createElement('button');
      this.renderer.setAttribute(button, 'type', 'button');
      this.renderer.setAttribute(button, 'data-bs-target', '#carouselExampleIndicators');
      this.renderer.setAttribute(button, 'data-bs-slide-to', index.toString());
      this.renderer.setAttribute(button, 'aria-label', `Slide ${index + 1}`);
      if (index === 0) {
        this.renderer.addClass(button, 'active');
        this.renderer.setAttribute(button, 'aria-current', 'true');
      }
      this.renderer.appendChild(indicatorsContainer, button);

      // Cria item do carrossel
      const divItem = this.renderer.createElement('div');
      this.renderer.addClass(divItem, 'carousel-item');
      if (index === 0) this.renderer.addClass(divItem, 'active');
      this.renderer.setAttribute(divItem, 'data-bs-interval', '5000');

      const link = this.renderer.createElement('a');
      this.renderer.setAttribute(link, 'href', 'pages/galeria/index.html');
      this.renderer.setAttribute(link, 'target', '_blank');

      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', image);
      this.renderer.setAttribute(img, 'alt', `Carrossel Image ${index + 1}`);
      this.renderer.addClass(img, 'd-block'); // classe bootstrap
      this.renderer.addClass(img, 'w-100');

      this.renderer.appendChild(link, img);
      this.renderer.appendChild(divItem, link);
      this.renderer.appendChild(carrosselContainer, divItem);
    });
  }
}