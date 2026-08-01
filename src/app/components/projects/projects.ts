import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Dashboard Application',
      category: 'Web Application',
      image: 'project-dashboard.png'
    },
    {
      title: 'E-Commerce Website',
      category: 'Web Design',
      image: 'project-ecommerce.png'
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile App',
      image: 'project-mobile.png'
    },
    {
      title: 'Travel Website',
      category: 'Web Design',
      image: 'project-travel.png'
    }
  ];
}