import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Standard',
  templateUrl: './Standard.component.html',
  styleUrls: ['./Standard.component.css']
})
export class StandardComponent implements OnInit {

  vehicle: any;
  error = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
    const wcU = encodeURIComponent(window.location.href);

    //if(sessionStorage.getItem('wcb_'+wcU) != null){

    let cachedResponse = sessionStorage.getItem('wcb_' + wcU)!;
    var obj = JSON.parse(cachedResponse);
    // document.getElementById("wcb")!.innerHTML = obj.co2 + 'g of CO<sub>2</sub>/view';
    //}
  }
  vehicleName: string = '';
  public showstandardImage = false;
  search(vehicle: string, year: string) {
    if (vehicle == 'standardcar' && year == '2022') {
      localStorage.setItem('standardcar', this.vehicle);
      this.vehicleName = 'standardcar';
      this.showstandardImage = true;
      //this.route.navigate(['/Standard_image']);
    } else {
      alert('please search valid vehicle type')
    }
  }
}
