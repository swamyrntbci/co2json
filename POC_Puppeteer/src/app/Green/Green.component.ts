import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Green',
  templateUrl: './Green.component.html',
  styleUrls: ['./Green.component.css']
})

export class GreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  vehicle: any;
  error = '';
  vehicleName: string = '';
  public showstandardImage = false;
  search(vehicle: string, year: string) {
    if (vehicle == 'greencar' && year == '2022') {
      localStorage.setItem('greencar', this.vehicle);
      this.vehicleName = 'greencar';
      this.showstandardImage = true;
      //this.route.navigate(['/Standard_image']);
    } else {
      alert('please search valid vehicle type')
    }
  }
}
