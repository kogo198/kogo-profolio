import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ServiceItem {
  title: string;
  description: string;
  iconSvg: SafeHtml;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills {
  activeService = 0;
  servicesList: ServiceItem[];

  constructor(private sanitizer: DomSanitizer) {
    this.servicesList = [
      {
        title: 'Full-Stack Web Apps',
        description: 'Building reactive, scalable web applications with Angular, TypeScript, React, and Supabase with live Vercel deployments.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'
        )
      },
      {
        title: 'Python & Django Backends',
        description: 'Architecting robust database models, RESTful APIs, reservation engines, and admin dashboards with Django and SQLite/PostgreSQL.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'
        )
      },
      {
        title: 'WhatsApp Bots & Automation',
        description: 'Developing multi-device automated assistants, custom plugin command engines, and Dockerized cloud microservices.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'
        )
      },
      {
        title: 'Systems & Algorithmic Code',
        description: 'Implementing low-level memory allocation, data structures, and computer science coursework utilities in C and Python.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>'
        )
      }
    ];
  }

  selectService(index: number) {
    this.activeService = index;
  }
}
