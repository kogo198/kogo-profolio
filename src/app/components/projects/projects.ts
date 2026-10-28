import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Python & Django' | 'Bots & Automation' | 'Systems & C' | 'Web Design';
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  gradient?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  status: 'Live' | 'Production' | 'Open Source';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {
  activeCategory: string = 'All';

  categories = [
    { id: 'All', label: 'All Projects' },
    { id: 'Full-Stack', label: 'Full-Stack & Web' },
    { id: 'Python & Django', label: 'Python & Django' },
    { id: 'Bots & Automation', label: 'Bots & Automation' },
    { id: 'Systems & C', label: 'Systems (C)' },
    { id: 'Web Design', label: 'Web Design' }
  ];

  projects: Project[] = [
    {
      id: 'hostel-kutus',
      title: 'Hostel Kutus Discovery & Booking',
      category: 'Full-Stack',
      categoryLabel: 'Full-Stack & Web',
      tagline: 'Student accommodation booking platform with live database & scrapers',
      description: 'Full-stack platform built for university students to search, filter, and book verified hostels in Kutus. Integrates Supabase backend, real-time availability, and automated web scrapers.',
      image: 'project-dashboard.png',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      tags: ['Vite', 'JavaScript', 'Supabase', 'SQL', 'Scraper'],
      liveUrl: 'https://hostel-kutus.vercel.app',
      githubUrl: 'https://github.com/kogo198/hostel-kutus',
      featured: true,
      status: 'Live'
    },
    {
      id: 'front-app',
      title: 'Front - Modern UI Web Platform',
      category: 'Full-Stack',
      categoryLabel: 'Full-Stack & Web',
      tagline: 'High-performance interactive TypeScript frontend experience',
      description: 'Cutting-edge frontend web application engineered with modular components, smooth CSS transitions, and client-side routing deployed on Vercel.',
      image: 'project-travel.png',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
      tags: ['TypeScript', 'React/Next.js', 'Vercel', 'Tailwind/CSS'],
      liveUrl: 'https://front-orpin-psi.vercel.app',
      githubUrl: 'https://github.com/kogo198/front',
      featured: true,
      status: 'Live'
    },
    {
      id: 'hostelbooking-django',
      title: 'Django Hotel & Hostel Reservation',
      category: 'Python & Django',
      categoryLabel: 'Python & Django',
      tagline: 'Full-featured Django reservation engine & admin dashboard',
      description: 'Complete Python/Django booking system with room inventory management, customer check-in tracking, automated reservation workflows, and SQLite database models.',
      image: 'project-ecommerce.png',
      gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      tags: ['Python', 'Django', 'SQLite', 'REST APIs', 'Vercel'],
      liveUrl: 'https://hostelbooking-seven.vercel.app',
      githubUrl: 'https://github.com/kogo198/hostelbooking',
      featured: true,
      status: 'Live'
    },
    {
      id: 'whatsapp-bot',
      title: 'WhatsApp Automation Bot Suite',
      category: 'Bots & Automation',
      categoryLabel: 'Bots & Automation',
      tagline: 'Multi-device WhatsApp automated assistant with plugin system',
      description: 'Engineered with Node.js and containerized via Docker. Features plugin architecture, group auto-moderation, custom commands, and multi-cloud deployment (Railway, Render, Fly.io).',
      image: 'project-mobile.png',
      gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      tags: ['Node.js', 'JavaScript', 'Docker', 'WebSockets', 'Railway'],
      liveUrl: 'https://github.com/kogo198/whatsapp_bot',
      githubUrl: 'https://github.com/kogo198/bot',
      featured: true,
      status: 'Open Source'
    },
    {
      id: 'kitchenware-shop',
      title: 'Kitchenware E-Commerce Store',
      category: 'Python & Django',
      categoryLabel: 'Python & Django',
      tagline: 'Digital cookware marketplace with automated catalog seeder',
      description: 'Full e-commerce platform built with Django for culinary and household appliances. Features dynamic inventory catalogs, category filtering, cart management, and Render deployment scripts.',
      image: 'project-ecommerce.png',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      tags: ['Python', 'Django', 'E-Commerce', 'PostgreSQL', 'Render'],
      githubUrl: 'https://github.com/kogo198/my_kitchenwareshop',
      featured: true,
      status: 'Production'
    },
    {
      id: 'kogo-web',
      title: 'Kogo Digital Web Space',
      category: 'Full-Stack',
      categoryLabel: 'Full-Stack & Web',
      tagline: 'Interactive personal web application & creative portfolio',
      description: 'Modern, highly responsive web portal built with JavaScript and deployed on Vercel showcasing frontend layouts, micro-interactions, and web experiments.',
      image: 'dashboard-mockup.png',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
      liveUrl: 'https://kogo.vercel.app',
      githubUrl: 'https://github.com/kogo198/kogo-',
      featured: true,
      status: 'Live'
    },
    {
      id: 'cypherx-bot',
      title: 'CypherX Multi-Device Suite',
      category: 'Bots & Automation',
      categoryLabel: 'Bots & Automation',
      tagline: 'High-performance WhatsApp bot system & cloud automation',
      description: 'Feature-rich multi-device WhatsApp engine featuring rich automated command handlers, webhook listeners, group management tools, and continuous uptime monitoring.',
      image: 'project-mobile.png',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      tags: ['Node.js', 'WhatsApp Web API', 'Cloud Deploy'],
      liveUrl: 'https://www.cypherx.space',
      githubUrl: 'https://github.com/kogo198/CypherX',
      featured: false,
      status: 'Live'
    },
    {
      id: 'python-scripts',
      title: 'Python Automation & Scripts Suite',
      category: 'Python & Django',
      categoryLabel: 'Python & Django',
      tagline: 'Automated workflow scripts, algorithms & utilities',
      description: 'Comprehensive repository of Python automation scripts covering file handling, data wrangling, algorithmic problem solving, and practical utilities from beginner to advanced.',
      image: 'project-dashboard.png',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      tags: ['Python 3', 'Automation', 'Algorithms', 'Data Utilities'],
      liveUrl: 'https://python-learning-psi.vercel.app',
      githubUrl: 'https://github.com/kogo198/Python-project-Scripts',
      featured: false,
      status: 'Open Source'
    },
    {
      id: 'c-programs',
      title: 'C Systems Programming & CS Suite',
      category: 'Systems & C',
      categoryLabel: 'Systems (C)',
      tagline: 'Low-level memory management, data structures & CLI utilities',
      description: 'Low-level systems programming projects written in C, demonstrating pointer manipulation, dynamic memory allocation, coursework algorithms, and university unit modules.',
      image: 'project-travel.png',
      gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
      tags: ['C', 'Systems Programming', 'Data Structures', 'Memory Optimization'],
      githubUrl: 'https://github.com/kogo198/c-programs',
      featured: false,
      status: 'Open Source'
    },
    {
      id: 'winnie-app',
      title: 'Winnie Interactive Web Design',
      category: 'Web Design',
      categoryLabel: 'Web Design',
      tagline: 'Creative frontend showcase with responsive aesthetics',
      description: 'Polished creative web experience crafted with responsive CSS layouts, modern typography, fluid grid architectures, and live deployment on Vercel.',
      image: 'project-travel.png',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      tags: ['CSS3', 'HTML5', 'Responsive Design', 'Vercel'],
      liveUrl: 'https://winnie-woad.vercel.app',
      githubUrl: 'https://github.com/kogo198/winnie',
      featured: false,
      status: 'Live'
    },
    {
      id: 'hardware-guide',
      title: 'Hardware & Computing Architecture',
      category: 'Systems & C',
      categoryLabel: 'Systems (C)',
      tagline: 'Computer hardware architectures and interface documentation',
      description: 'Technical engineering repository documenting computer hardware components, embedded interfaces, electronic circuits, and computer architecture fundamentals.',
      image: 'project-dashboard.png',
      gradient: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
      tags: ['Hardware', 'Architecture', 'Documentation', 'Embedded'],
      githubUrl: 'https://github.com/kogo198/hardware',
      featured: false,
      status: 'Open Source'
    },
    {
      id: 'kogo-portfolio-app',
      title: 'Nehemiah Kiplagat Portfolio App',
      category: 'Full-Stack',
      categoryLabel: 'Full-Stack & Web',
      tagline: 'Official developer portfolio website built with Angular',
      description: 'Modern, high-performance web portfolio built with Angular 21 standalone components, interactive project showcases, filterable galleries, and WhatsApp contact integration.',
      image: 'kiplaa-studio.png',
      gradient: 'linear-gradient(135deg, #6345ed 0%, #4338ca 100%)',
      tags: ['Angular 21', 'TypeScript', 'Responsive CSS', 'Vercel'],
      liveUrl: 'https://kogo-profolio.vercel.app',
      githubUrl: 'https://github.com/kogo198/kogo-profolio',
      featured: false,
      status: 'Live'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.activeCategory);
  }

  setCategory(categoryId: string) {
    this.activeCategory = categoryId;
  }

  openUrl(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}