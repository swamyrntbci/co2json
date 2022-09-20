import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private route:Router){}

  ngOnInit(): void {
  }
   vehicleName : string = '';

 search (vehicle:string) {
    if(vehicle == 'greenpage') {
        this.vehicleName = 'greenpage';
        this.route.navigate(['/Green_Webpage']);
    } else  if(vehicle == 'standardpage') {
        this.vehicleName = 'standardpage';
        this.route.navigate(['/Standard_Webpage']);
    }else {
      alert('please search valid vehicle type')
    }
 }
}
