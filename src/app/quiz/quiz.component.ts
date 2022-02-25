import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  questions:any;
  curIndex:number = 0;
  quiz: any;
  answer: any[] = [];
  isValue: any;
  score: number = 0;
  registerUserData: any = {
    name:"",
    email:""
  };
  constructor(
    private router: Router,
    private quizService :QuizService,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
    this.registerUserData.name = params.name;
    this.registerUserData.email = params.email;
    console.log("this.registerUserData",this.registerUserData)
      }
    );
    this.spinner.show();
    this.quizService.getQuestions().subscribe(res=>{
      if(res.data){
        this.spinner.hide();
        this.questions = res.data;
      //this.curIndex = 0;
      this.getQuestion();
      console.log("this.questions",this.questions)
      }
      
    },err=>{
      console.log(err);
    })
  }

  getQuestion(){
    this.quiz = this.questions[this.curIndex]
  }
  next(){

    if(this.curIndex < (Object.values(this.questions).length - 1) ){
      this.curIndex = this.curIndex + 1;

      // making a button active
      (!this.answer[this.curIndex]) ? this.isValue = 0 : this.isValue = this.answer[this.curIndex].value;    
      this.getQuestion();
    } 
  }
  back(){
    
    if(this.curIndex > 0){
      this.curIndex = this.curIndex - 1;
      
      (!this.answer[this.curIndex]) ? this.isValue = 0 : this.isValue = this.answer[this.curIndex].value;
      this.getQuestion();
    }
  }

  selected(selectedAnswer:any, _QnId:any, curIndex:any ,btn:any){
    this.isValue=btn;
    let qn = _QnId
    console.log(_QnId,curIndex)
    if(this.answer.length && this.answer[curIndex] && this.answer[curIndex].qn==_QnId){
      
      this.answer[curIndex].selectedAnswer = selectedAnswer;
      this.answer[curIndex].value = this.isValue;
    }
    else{
      let pair = Object.assign({ qn , selectedAnswer,value:this.isValue })
      //this.answer.push(pair);
      this.answer[curIndex] = pair;
    }
    
    console.log(this.answer)
  }
  ifSubmit():any{
    if(Object.values(this.answer).length == Object.values(this.questions).length){
      return true;
    }
  }
  submit(){
    this.questions.forEach((element:any,ind:any) => {

      if(this.questions[ind].QnId == this.answer[ind].qn && 
        this.questions[ind].Answer == this.answer[ind].selectedAnswer){
        this.score = this.score + 1;
      }
    });
    let candidateScore = {score : this.score};
    let postUserData = {...this.registerUserData, ...candidateScore}
    console.log("postUserData ",postUserData)
    this.spinner.show();
    this.quizService.postCandidateScore(postUserData).subscribe(res=>{
      if(res.success){
        this.spinner.hide();
      }
    },err=>{
      console.log(err);
    })
    console.log("your score is ",this.score)
  }
  reset(){
    // this.document.location.reload();

    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/quiz']);

    
  }
}
