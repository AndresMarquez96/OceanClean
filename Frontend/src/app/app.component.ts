import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  userNameUser: string;
  photoUser: number;
  roleUser: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'OceanClean';

  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3300/sesion', { withCredentials: true }).subscribe(
      data => {
        this.users = data.user;
      },
      error => console.error(error)
    );
  }

  logout() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.get<any>('http://localhost:3300/cerrarSesion', { headers, withCredentials: true })
      .subscribe(
        data => {
          if (data.success) {
            console.log('Cierre de sesión exitoso');
          
            this.router.navigate(['/inicio']).then(() => {
              window.location.reload();
            });
          } else {
            console.log('Error al cerrar sesión');
          }
        },
        error => {
          console.error(error);
        }
      );
  }

}