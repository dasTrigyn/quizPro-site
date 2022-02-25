import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn():boolean {
    return !!localStorage.getItem('token');
  }

  loggedOut():boolean{
     localStorage.removeItem('token');
     return true;
  }

  constructor(private http:HttpClient) { }
  
  private registerUrl = "http://localhost:3000/api/addCandidate";
  private nregisterUrl = "http://localhost:3000/api/register";
  private loginUrl = "http://localhost:3000/api/login"
  // private getAllQuestions = "http://localhost:3000/api/getAllQuestions";
  registerCandidate(candidate:any) {
    // return this.http.post<any>(this.registerUrl,candidate)
    return this.http.post<any>(this.nregisterUrl,candidate)
  } 
  
  loginUser(user:any){
    return this.http.post<any>(this.loginUrl, user)
  }
  // getQuestions() {
  //   return this.http.get<any>(this.getAllQuestions);
  // }

  
}
