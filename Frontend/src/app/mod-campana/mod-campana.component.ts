import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mod-campana',
  templateUrl: './mod-campana.component.html',
  styleUrls: ['./mod-campana.component.css']
})
export class ModCampanaComponent implements OnInit{
  constructor(private http: HttpClient,  private router: Router, private cdr: ChangeDetectorRef) {}

  nameError: boolean = false;
  addressError: boolean = false;
  proError: boolean = false;
  dateError: boolean = false;
  hourError: boolean = false;
  descError: boolean = false;
  descSizeError: boolean = false;
  dataLoaded: boolean = false;

  provinceCamp: string = ''; 

  provinces: string[] = ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'];

  idCamp: number = 0;
  nameCamp: string = '';
  addressCamp: string = '';
  dateCamp: string = '';
  hourCamp: string = '';
  descCamp: string = '';
  imageCamp: string = '';


  ngOnInit() {
    const campDataString = localStorage.getItem('campData');
    const campDataArray = JSON.parse(campDataString || '[]');
  
    if (campDataArray.length > 0) {
      const innerArray = campDataArray[0]; 
      const campData = innerArray[0];       
      this.idCamp = campData.idCamp || 0;
      this.nameCamp = campData.nameCamp || '';
      this.addressCamp = campData.addressCamp || '';
      this.dateCamp = this.formatDate(campData.dateCamp) || '';
      this.hourCamp = campData.hourCamp || '';
      this.descCamp = campData.descCamp || '';
      this.imageCamp = campData.imageCamp || '';
      this.provinceCamp = campData.provinceCamp || '';
    }
    
  }
  
  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); 
    const day = ('0' + d.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  updateCamp(idCamp: number){
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

    this.http.post<any>('http://localhost:3300/updateCampana', {
      idCamp, nameCamp, addressCamp, provinceCamp, dateCamp, hourCamp, descCamp, imageCamp
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