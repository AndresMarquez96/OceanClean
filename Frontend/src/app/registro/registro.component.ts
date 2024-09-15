import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private http: HttpClient, private router: Router) {}

  userError: boolean = false;
  userEqError: boolean = false;
  passError: boolean = false;
  passSizeError: boolean = false;
  photoError: boolean = false;
  nameError: boolean = false;
  nameOrgError: boolean = false
  birthError: boolean = false;
  surnameError: boolean = false;
  emailError: boolean = false;
  emailSizeError: boolean = false;
  phoneError: boolean = false;
  phoneSizeError: boolean = false;

  register() {
  this.userError= false;
  this.userEqError = false;
  this.passError = false;
  this.passSizeError = false;
  this.photoError = false;
  this.nameError = false;
  this.nameOrgError = false;
  this.birthError = false;
  this.surnameError = false;
  this.emailError = false;
  this.emailSizeError = false;
  this.phoneError = false;
  this.phoneSizeError = false;

    const userNameUser = (document.getElementById('userNameUser') as HTMLInputElement).value;
    const passUser = (document.getElementById('passUser') as HTMLInputElement).value;
    const photoUser = (document.querySelector('input[name="photoUser"]:checked') as HTMLInputElement)?.value;
    const nameUser = (document.getElementById('nameUser') as HTMLInputElement).value;
    const surnameUser = (document.getElementById('surnameUser') as HTMLInputElement).value;
    var secondSurnameUser = (document.getElementById('secondSurnameUser') as HTMLInputElement).value;
    const birthDateUser = (document.getElementById('birthDateUser') as HTMLInputElement).value;
    const emailUser = (document.getElementById('emailUser') as HTMLInputElement).value;
    const emailInput = document.getElementById('emailUser') as HTMLInputElement;
    const phoneUser = (document.getElementById('phoneUser') as HTMLInputElement).value;
    var addressUser = (document.getElementById('addressUser') as HTMLInputElement).value;

    for(var i = 0; i < 1; i++){
      if (!userNameUser) {
        this.userError = true
      }
      if (passUser.length < 8) {
        if (!passUser) {
          this.passError = true
        }
        else{
          this.passSizeError = true
        }
      }
      if (!photoUser) {
        this.photoError = true
        
      }
      if (!nameUser) {
        this.nameError = true
        
      }
      if (!surnameUser) {
        this.surnameError = true
        
      }
      if (!birthDateUser) {
        this.birthError = true
        
      }
      if (!emailUser) {
        this.emailError = true
      }
      if (emailInput.validity.typeMismatch) {
        this.emailSizeError = true
      }
      if (phoneUser.length != 9) {
        if (!phoneUser) {
          this.phoneError = true
        }
        else{
          this.phoneSizeError = true
        }
      }
      if (!userNameUser || !passUser || !photoUser || !nameUser || !surnameUser ||
        !birthDateUser || !emailUser || emailInput.validity.typeMismatch || !phoneUser || phoneUser.length != 9 || passUser.length < 8 ) {
        return; 
      }
    }
    
    if (!secondSurnameUser) {
      secondSurnameUser = " ";
    }
    if (!addressUser) {
      addressUser = " ";
    }

    const encryptedPassword = btoa(passUser);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    
    this.http.post<any>('http://localhost:3300/crear', {
      userNameUser,
      passUser: encryptedPassword,
      photoUser,
      nameUser,
      surnameUser,
      secondSurnameUser,
      birthDateUser,
      emailUser,
      phoneUser,
      addressUser
    }, { headers, withCredentials: true })
    .subscribe(
      data => {
        if (data.success) {
          this.login(userNameUser, encryptedPassword);
        } else {
          if (data.error === "equal") {
            this.userEqError = true;
            return;
          }
          else if (data.error === "nameOrg") {
            this.nameOrgError = true;
            return;
          }
        }
      }, error => {
        console.log(error);
      }
    );
}
  
  login(login: string, password: string) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://localhost:3300/inicioSesion', { login, password }, { headers, withCredentials: true })
      .subscribe(
        data => {
          if (data.success) {
            
            this.router.navigate(['/perfil']).then(() => {
              window.location.reload();
            });
          } else {
            console.log('Error en el inicio de sesión');
          }
        },
        error => {
          console.error(error);
        }
      );
  }
}