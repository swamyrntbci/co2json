import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MonitorsComponent } from './monitors.component'
const routes: Routes = [
    {
      path: 'monitor/list',component:ListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorsRoutingModule { }
