import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './guards/auth.guard';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { UpdateQuizComponent } from './admin-panel/update-quiz/update-quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuizComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,
    AdminPanelComponent,
    UpdateQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
