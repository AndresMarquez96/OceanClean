import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inic-sesion',
  templateUrl: './inic-sesion.component.html',
  styleUrls: ['./inic-sesion.component.css']
})
export class InicSesionComponent {

  constructor(private http: HttpClient, private router: Router) {}

  userError: boolean = false;
  passwordError: boolean = false;

  login() {


    this.userError= false;


    const login = (document.getElementById('loginInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    if (!login || !password) {
      this.userError = true
    }
    
    if (!login || !password) {
      return; 
    }

    const encryptedPassword = btoa(password);
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:3300/inicioSesion', { login, password: encryptedPassword }, { headers, withCredentials: true })
  .subscribe(
    data => {
      this.userError = false;
      this.passwordError = false;

      if (data.success) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/perfil']).then(() => {
          window.location.reload();
        });
      } else {
        this.userError = true;
      }
    },
    error => {
      console.error(error);
      this.userError = true;
    }
  );
  }
}