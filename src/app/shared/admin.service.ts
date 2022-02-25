import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 

  constructor(private http:HttpClient) { }

  private getAllUsers = "http://localhost:3000/api/users";
  private getScores = "http://localhost:3000/api/leaderboard";
  private postQuiz = "http://localhost:3000/api/addItems";

  getUsers() {
    return this.http.get<any>(this.getAllUsers);
  }

  getLeaderBoard() {
    return this.http.get<any>(this.getScores);
  }

  postQuizQuestions(quizFormData: FormGroup) {
    return this.http.post<any>(this.postQuiz,quizFormData);
  }
}
