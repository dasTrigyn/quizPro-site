import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  quizForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _adminService : AdminService
    ) { }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      QnId: ['', [Validators.required] ],
    Question: ['', [Validators.required]],
    option1: ['', [Validators.required]],
    option2: ['', [Validators.required]],
    option3: ['', [Validators.required]],
    option4: ['', [Validators.required]],
    Answer: ['', [Validators.required]],
    })
  }
  onSubmit(){
    if(this.quizForm?.valid){
      this._adminService.postQuizQuestions(this.quizForm).subscribe(res =>{

      })
    }
  }

}
