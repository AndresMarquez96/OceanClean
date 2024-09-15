import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent {

  user: any[] = [];
  camp: { idCamp: number, nameCamp: string, addressCamp: string, provinceCamp: string, dateCamp: string, hourCamp: string, descCamp: string, imageCamp: string, idOrgFK: number, idOrg: number, nameOrg: string, imageOrg: string }[] = [];
  adminCamp: { idCamp: number, nameCamp: string, addressCamp: string, provinceCamp: string, dateCamp: string, hourCamp: string, descCamp: string, imageCamp: string, idOrgFK: number, idOrg: number, nameOrg: string, imageOrg: string,countPart: number }[] = [];
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
    this.http.get<any>('http://localhost:3300/perfil', { withCredentials: true }).subscribe(
      data => {
        this.user = data.user;
        this.camp = data.camp;
  
        if (this.user.length > 0 && this.user[0].roleUser === 0) {
          this.http.get<any>('http://localhost:3300/adminCampana', { withCredentials: true }).subscribe(
            data => {
              this.adminCamp = data.adminCamp;
              this.filteredCamps = this.adminCamp; 
            },
            error => console.error(error)
          );
        } else {
          this.filteredCamps = this.camp; 
        }
      },
      error => console.error(error)
    );
  }

  desapuntarse(idCamp :number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:3300/desapuntar', {
      idCamp
    }, { headers, withCredentials: true })
    .subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/perfil']).then(() => {
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

  delAdminCampana(idCamp: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:3300/deleteCampana', { idCamp }, { headers, withCredentials: true })
    .subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/perfil']).then(() => {
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

  modAdminCampana(idCamp: number): void {
    this.http.get<any>(`http://localhost:3300/modCampana/?idCamp=${idCamp}`, { withCredentials: true }).subscribe(
      (response) => {
        const campData = response.campData;
        localStorage.setItem('campData', JSON.stringify(campData));
        this.router.navigate(['/modCampana']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  aplicarFiltro() {
    if (this.provinciaSeleccionada) {
      this.filteredCamps = this.adminCamp.filter(camp => camp.provinceCamp === this.provinciaSeleccionada);
    } else {
      this.filteredCamps = this.adminCamp;
    }
  }
}
