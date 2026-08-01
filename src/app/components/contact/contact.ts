import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  openWhatsApp() {
    const phoneNumber = '254748711776';
    const message = encodeURIComponent("Hi Nehemiah, I'm interested in working with you!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
