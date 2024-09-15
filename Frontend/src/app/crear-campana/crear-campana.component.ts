import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-campana',
  templateUrl: './crear-campana.component.html',
  styleUrls: ['./crear-campana.component.css']
})
export class CrearCampanaComponent {
  
  constructor(private http: HttpClient,  private router: Router) {}

  nameError: boolean = false;
  addressError: boolean = false;
  proError: boolean = false;
  dateError: boolean = false;
  hourError: boolean = false;
  descError: boolean = false;
  descSizeError: boolean = false;

  provinceCamp: string = ''; 

  provinces: string[] = ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'];

  crearCamp(){
  this.hourError= false;
  this.dateError = false;
  this.proError = false;
  this.addressError = false;
  this.nameError = false;
  this.descError = false;

    const nameCamp = (document.getElementById('nameCamp') as HTMLInputElement).value;
    const addressCamp = (document.getElementById('addressCamp') as HTMLInputElement).value;
    const provinceCamp = (document.getElementById('provinceCamp') as HTMLInputElement).value;
    const dateCamp = (document.getElementById('dateCamp') as HTMLInputElement).value;
    const hourCamp = (document.getElementById('hourCamp') as HTMLInputElement).value;
    const descCamp = (document.getElementById('descCamp') as HTMLInputElement).value;
    var imageCamp = (document.getElementById('imageCamp') as HTMLInputElement).value;

    for(var i = 0; i < 1; i++){
      if(!nameCamp){
        this.nameError = true;
      }
      if(!addressCamp){
        this.addressError = true;
      }
      if(!provinceCamp){
        this.proError = true;
      }
      if(!dateCamp){
        this.dateError = true;
      }
      if(!hourCamp){
        this.hourError = true;
      }
      if(!descCamp){
        this.descError = true;
      }
      if(descCamp.length > 255){
        this.descSizeError = true;
      }
      if (!nameCamp || !addressCamp || !provinceCamp || !dateCamp || !hourCamp ||
        !descCamp ) {
        return; 
      }
    }

    if (!imageCamp) {
      imageCamp = " ";
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:3300/crearCampana', {
      nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp
    }, { headers, withCredentials: true })
    .subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/perfil']).then(() => {
            window.location.reload();
          });
        } else {
          
        }
      },
      error => {
        console.error(error);
      }
    );

  }
  checkProvince() {
    this.proError = false;
    if (!this.provinceCamp) {
      this.proError = true;
    }
  }
}