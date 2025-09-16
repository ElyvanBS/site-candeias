import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './component/slider/slider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
import { SocialSidebar } from './component/social-sidebar/social-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, SocialSidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('candeiasapp');

  ngAfterViewInit(): void {
    AOS.init({ once: true });

    // Menu hamburger
    const hamburger = document.querySelector<HTMLElement>(".hamburger");
    const nav = document.querySelector<HTMLElement>(".nav");

    hamburger?.addEventListener('click', () => {
      if (!hamburger || !nav) return;
      const rect = hamburger.getBoundingClientRect();
      const topPosition = rect.top;
      const rightPosition = window.innerWidth - rect.right;

      nav.classList.toggle('active');

      if (nav.classList.contains('active')) {
        hamburger.style.position = 'fixed';
        hamburger.style.top = topPosition + 'px';
        hamburger.style.right = rightPosition + 'px';
      } else {
        hamburger.style.position = '';
        hamburger.style.top = '';
        hamburger.style.right = '';
      }
    });

    // Estatísticas
    const statsContainer = document.querySelector<HTMLElement>('.stats-container');
    if (statsContainer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startCounting();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(statsContainer);
    }

    // Voltar ao topo
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
      });

      backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  private startCounting(): void {
    const counters = document.querySelectorAll<HTMLElement>('.counter');
    const duration = 20000;
    const frameDuration = 60;

    counters.forEach(counter => {
      const target = Number(counter.getAttribute('data-target')) || 0;
      const totalFrames = duration / frameDuration;
      let frame = 0;

      const updateCount = () => {
        frame++;
        const currentCount = this.easeOutQuad(frame, 0, target, totalFrames);
        counter.innerText = Math.floor(currentCount).toString();

        if (frame < totalFrames) requestAnimationFrame(updateCount);
        else counter.innerText = target.toString();
      };

      requestAnimationFrame(updateCount);
    });
  }

  private easeOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d;
    return -c * t * (t - 2) + b;
  }
}
