import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  private getAllQuestions = "http://localhost:3000/api/getAllQuestions";
  private postScore = "http://localhost:3000/api/postScore"
  // private getAllQuestions = "api/getAllQuestions";
  // private postScore = "/api/postScore"

  getQuestions() {
    return this.http.get<any>(this.getAllQuestions);
  }
  postCandidateScore(candidateScore:any){
    return this.http.post<any>(this.postScore,candidateScore);
  }
}
