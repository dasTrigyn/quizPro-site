import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})  
export class RegisterComponent implements OnInit {
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  // passwordPattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
  // phonePattern = "^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$";
  // emailPattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
  // name: any;
  // email: any;
  registerUserData = {
    name:"",
    email:"",
    phone:"",
    password:""

  }
  // registerForm = {
  //   valid :false
  // }
  constructor(private _auth: AuthService,private _router:Router) { }

  ngOnInit(): void {

  }

  OnSubmit(formValue:any){
    this.registerUserData.name = formValue.form.value.Name;
    this.registerUserData.email = formValue.form.value.Email;
    this.registerUserData.phone = formValue.form.value.Phone;
    this.registerUserData.password = formValue.form.value.Password;
    console.log(this.registerUserData)
    console.log(formValue)
    this._auth.registerCandidate(this.registerUserData).subscribe(
      res =>{
        localStorage.setItem('token',res.token);
        this._router.navigate(['./quiz'],{ queryParams: { name : this.registerUserData.name, email:this.registerUserData.email } } )
        console.log(res)
      },
      err =>{
        console.log(err);
      }
    )
    
    
  }

}
