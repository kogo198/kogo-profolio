import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  scrollTo(section: string) {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openWhatsApp() {
    const phoneNumber = '254748711776';
    const message = encodeURIComponent("Hi Nehemiah, I'm interested in working with you!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
