import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private _router: Router,) { }

  ngOnInit(): void {
  }
  logout(){
    console.log("logout")
    if(this.authService.loggedOut()){
      this._router.navigate(['/landing-page'])
    }
  }

}
