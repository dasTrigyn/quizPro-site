import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard, AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : 'register' , component : RegisterComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'admin-panel' , component : AdminPanelComponent, canActivate:[AdminGuard]},
  {path : 'quiz' , component : QuizComponent , canActivate:[AuthGuard]},
  {path : '' , redirectTo : '/landing-page', pathMatch:'full'},
  {path : 'landing-page' , component : LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
