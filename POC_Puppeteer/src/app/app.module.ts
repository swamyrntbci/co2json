import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { GreenComponent } from './Green/Green.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './Login/login/login.component';
import { StandardComponent } from './Standard/Standard.component';
import { MonitorsModule } from './monitors/monitors.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    MonitorsModule,
    RouterModule.forRoot([
     // { path: '', pathMatch: 'full', redirectTo: '/login' },
      {path: 'login',component: LoginComponent},
      {path: 'Green_Webpage',component: GreenComponent},
      {path: 'Standard_Webpage',component: StandardComponent},
      {path: 'Home',component: HomeComponent},
      {path: 'app',component: AppComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    GreenComponent,
    LoginComponent,
    StandardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }


