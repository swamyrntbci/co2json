import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorsRoutingModule } from './monitors-routing.module';
import { ListComponent } from './list/list.component';

import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MonitorsRoutingModule,
    TabsModule.forRoot()
  ]
})
export class MonitorsModule { }
