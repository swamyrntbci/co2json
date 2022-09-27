import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data:any;
  constructor( private apiService: ApiService) { }

  listjsondata()
  {
    this.apiService.getExternalUrl('https://raw.githubusercontent.com/swamyrntbci/co2json/main/calc-latest.json').subscribe( res => {
      console.log('----res----', res)
      this.data = res;
    })
  }

  ngOnInit(): void {
    this.listjsondata();
  }

}
