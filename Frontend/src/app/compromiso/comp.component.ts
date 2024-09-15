import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {
  numUser: { num_users: number }[] = [];
  numCamp: { num_camp: number }[] = [];
  numOrg: { num_org: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3300/compromiso', { withCredentials: true }).subscribe(
      data => {
        this.numUser = data.numUser;
        this.numCamp = data.numCamp;
        this.numOrg = data.numOrg;
      },
      error => console.error(error)
    );
  }
}