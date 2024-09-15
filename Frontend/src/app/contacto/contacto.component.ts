import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: any = {}; 

  submitForm() {
    console.log(this.contactForm);
    this.contactForm = {};
  }

}
