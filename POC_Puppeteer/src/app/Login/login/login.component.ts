import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import audits from './result4.json';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username : any;
  password : any;
  error = '';

  //form : FormGroup;
  public submitted = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router  ) {
    //  this.form = this.fb.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    //   });
    }
  
  // username : string = '';
 
 

//   @HostBinding('@.disabled')
//   public animationsDisabled = false;
//   isShown: boolean = false ;
//   isShownSmall: boolean = false ;
//   isLargeSizeVideo: boolean = false;
//   isSmallSizeVideo: boolean = false;
//   co2 : number = 0;
//   co2Renewable : number = 0;



  login (username:string,password:string) {

      if(username == 'z034313' && password == 'gumma') {
         localStorage.setItem('user',this.username);
          //this.route.navigate(['home/'+this.name]);
          this.router.navigate(['/Standard_Webpage']);
      } else{
         alert('username or password is incorrect');
        
      }
   }

// submitForm() { 
//      localStorage.setItem('user',this.username);
//      this.router.navigate(['/Home']);
// }


}
