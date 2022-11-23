import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { TareasListComponent } from './components/tareas/tareas-list/tareas-list.component';
import { TareasFormComponent } from './components/tareas/tareas-form/tareas-form.component';
import { TareasDetailComponent } from './components/tareas/tareas-detail/tareas-detail.component';
import { SubtareaDetailComponent } from './components/subtareas/subtarea-detail/subtarea-detail.component';
import { SubtareaFormComponent } from './components/subtareas/subtarea-form/subtarea-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,    
    NavbarComponent,
    FooterComponent,
    TareasListComponent,
    TareasFormComponent,
    TareasDetailComponent,
    SubtareaDetailComponent,
    SubtareaFormComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
