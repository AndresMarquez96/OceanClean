import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  title = 'OceanClean';
  numUser: { num_users: number }[] = [];
  numCamp: { num_camp: number }[] = [];
  numOrg: { num_org: number }[] = [];
  imgOrg: { imageOrg: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3300/inicio', { withCredentials: true }).subscribe(
      data => {
        this.numUser = data.numUser;
        this.numCamp = data.numCamp;
        this.numOrg = data.numOrg;
        this.imgOrg = data.imgOrg;
      },
      error => console.error(error)
    );
  }
}