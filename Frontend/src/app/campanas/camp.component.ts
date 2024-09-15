import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  idUser: number;
  roleUser: number;
}

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css']
})
export class CampComponent {
  title = 'OceanClean';
  camps: any[] = []; 
  choCamp: any[] = []; 
  users: User[] = [];
  provinciaSeleccionada: string = '';
  filteredCamps: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  handleImageErrorCamp(event: any) {
    event.target.src = "../../assets/img/dibujoPlaya.jpg";
  }
  handleImageErrorOrg(event: any) {
    event.target.src = "../../assets/img/logo.jpg";
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:3300/campanas', { withCredentials: true }).subscribe(
      data => {
        this.camps = data.camps; 
        this.filteredCamps = this.camps; 

        this.choCamp = data.choCamp; 
      },
      error => console.error(error)
    );

    this.http.get<any>('http://localhost:3300/sesion', { withCredentials: true }).subscribe(
      data => {
        this.users = data.user;
      },
      error => console.error(error)
    );
  }

  isChoCamp(idCamp: string): boolean {
    return this.choCamp.some(camp => camp.idCampFK === idCamp);
  }

  apuntarse(idCamp: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<any>('http://localhost:3300/apuntar', { idCamp }, { headers, withCredentials: true })
      .subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['/campanas']).then(() => {
              window.location.reload();
            });
          } else {
            console.log('Error en el registro');
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  desapuntarse(idCamp: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<any>('http://localhost:3300/desapuntar', { idCamp }, { headers, withCredentials: true })
      .subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['/campanas']).then(() => {
              window.location.reload();
            });
          } else {
            console.log('Error en el registro');
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  aplicarFiltro() {
    if (this.provinciaSeleccionada) {
      this.filteredCamps = this.camps.filter(camp => camp.provinceCamp === this.provinciaSeleccionada);
    } else {
      this.filteredCamps = this.camps;
    }
  }
}
