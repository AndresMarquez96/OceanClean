import { Component } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent {
  
  selectedMap: number = 1;

  showMap(mapNumber: number) {
  this.selectedMap = mapNumber;
}
}