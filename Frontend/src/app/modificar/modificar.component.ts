import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})


export class ModificarComponent implements OnInit {
  user: any = {}; 

  constructor(private http: HttpClient,  private router: Router) { }

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

  ngOnInit() {
    this.http.get('http://localhost:3300/sesion', { withCredentials: true }).subscribe(
      (response: any) => {
        if (response && response.user && Array.isArray(response.user) && response.user.length > 0) {
          this.user = response.user[0];
          this.user.birthDateUser = this.formatDate(new Date(this.user.birthDateUser));
          this.user.passUser = atob(this.user.passUser);
        } else {
          console.log('No se encontraron datos del usuario o la respuesta no es válida.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  update(idUser : number) {
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


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const encryptedPassword = btoa(passUser);

    this.http.post<any>('http://localhost:3300/modificar', {
      userNameUser,
      passUser: encryptedPassword,
      photoUser,
      nameUser,
      surnameUser,
      secondSurnameUser,
      birthDateUser,
      emailUser,
      phoneUser,
      addressUser,
      idUser
    }, { headers, withCredentials: true })
    .subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/perfil']).then(() => {
            window.location.reload();
          });
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
      },
      error => {
        console.error(error);
      }
    );  
}

private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

}