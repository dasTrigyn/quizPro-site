import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  loginUserData = {
    email:"",
    password:""

  }

  OnSubmit(formValue:any){
    
    this.loginUserData.email = formValue.form.value.Email;
    this.loginUserData.password = formValue.form.value.Password;

    this._auth.loginUser(this.loginUserData).subscribe(
      res =>{

        localStorage.setItem('token',res.token);

        const tokenDecode = JSON.parse(atob(res.token.split('.')[1]));

        if(!tokenDecode.isAdmin){
          this._router.navigate(['./quiz'],{ queryParams: { name : res.name, email:res.email } } )
        }
        else{
          this._router.navigate(['./admin-panel'],{ queryParams: { name : res.name, email:res.email } } )
        }

        
        console.log(res)
      },
      err =>{
        console.log(err);
      }
    )
    
    
  }

}
