import { Component, OnInit } from '@angular/core';
import audits from '../result5.json';


@Component({
  selector: 'app-Green',
  templateUrl: './Green.component.html',
  styleUrls: ['./Green.component.css']
})

export class GreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

 if( window.localStorage )
     {
       if( !localStorage.getItem('firstLoad') )
       {
         localStorage['firstLoad'] = true;
         window.location.reload();
       }
       else
         localStorage.removeItem('firstLoad');
     }
  }
  vehicle : any;
    co2g : any = 0;
  error = '';
  co2 : number = 0;
  co2Renewable : number = 0;
  vehicleName : string = '';
  public showstandardImage  = false;
 search (vehicle:string,year :string) {
    if(vehicle == 'greencar' && year == '2022') {
      localStorage.setItem('greencar',this.vehicle);
        this.vehicleName = 'greencar';
        this.showstandardImage = true;
        this.testCo2 ();
        //this.route.navigate(['/Standard_image']);
    }else {
      alert('please search valid vehicle type')
    }
 }
  testCo2 () {
      let keyArr: any[] = Object.keys(audits);
      console.log('keyArr'+keyArr[8]);
      console.log('audits'+JSON.stringify(audits[keyArr[8]]));
      console.log('network-requests'+audits[keyArr[8]]['network-requests']['details']['items']);
      let itemsArr: any[]  = audits[keyArr[8]]['network-requests']['details']['items'];
      var totalBytes = 0;
                itemsArr.forEach((item: any) => {
                  var itemData:any = JSON.stringify(item);
                  console.log('itemData'+itemData);
                  console.log('transferSize'+JSON.stringify(item.transferSize));

                  var numberValue: number = +JSON.stringify(item.transferSize);
                  totalBytes += numberValue;
                });
                console.log('totalBytes \n'+totalBytes);

                var bytes: number = (totalBytes * 0.75) + (0.02 * totalBytes * 0.25);

                var energy: number = bytes * (1.805 / 1073741824);

                this.co2 = energy * 475;

                this.co2Renewable = ((energy * 0.1008) * 33.4) + ((energy * 0.8992) * 475);
                this.co2g = this.co2Renewable.toFixed(2);
                console.log('co2 \n' +this.co2Renewable);

          };
}
