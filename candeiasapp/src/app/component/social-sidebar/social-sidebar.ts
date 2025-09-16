import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  url: string;
  iconClass: string;      // classe do ícone (ex: 'ri-instagram-line')
  label: string;          // texto da rede
  bgColor?: string;       // cor de fundo opcional
}

@Component({
  selector: 'app-social-sidebar',
  standalone: true,
  imports: [CommonModule], // ✅ necessário para ngFor, ngIf, ngClass
  templateUrl: './social-sidebar.html',
  styleUrls: ['./social-sidebar.css']
})
export class SocialSidebar {
  @Input() socialLinks: SocialLink[] = [];
}
