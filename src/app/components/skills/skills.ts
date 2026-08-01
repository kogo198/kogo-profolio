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
        title: 'UI/UX Design',
        description: 'I create intuitive and engaging user interfaces with best user experience.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>'
        )
      },
      {
        title: 'Web Design',
        description: 'I design modern and responsive websites that build strong digital presence.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'
        )
      },
      {
        title: 'Product Design',
        description: 'I design digital products that are usable, scalable and impactful.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'
        )
      },
      {
        title: 'Motion Graphics',
        description: 'I create smooth and eye-catching animations that engage users.',
        iconSvg: this.sanitizer.bypassSecurityTrustHtml(
          '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>'
        )
      }
    ];
  }

  selectService(index: number) {
    this.activeService = index;
  }
}
