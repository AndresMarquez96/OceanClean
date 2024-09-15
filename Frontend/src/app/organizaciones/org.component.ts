import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Org {
  imageOrg: string;
  nameOrg: string;
  descOrg: string;
}

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})

export class OrgComponent {
  orgs: Org[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3300/organizaciones', { withCredentials: true }).subscribe(
      data => {
        this.orgs = data.Org;
      },
      error => console.error(error)
    );
  }
}