import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SubtareaFormComponent } from './components/subtareas/subtarea-form/subtarea-form.component';
import { TareasDetailComponent } from './components/tareas/tareas-detail/tareas-detail.component';
import { TareasFormComponent } from './components/tareas/tareas-form/tareas-form.component';
import { TareasListComponent } from './components/tareas/tareas-list/tareas-list.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [  
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tareas', component: TareasListComponent, canActivate: [AuthGuard] },
  { path: 'tarea/:id', component: TareasDetailComponent, canActivate: [AuthGuard] },
  { path: 'tarea-form', component: TareasFormComponent, canActivate: [AuthGuard] },
  { path: 'tarea-form/:idTarea', component: TareasFormComponent, canActivate: [AuthGuard] },
  { path: 'subtarea/form/:idTarea', component: SubtareaFormComponent, canActivate: [AuthGuard]},
  { path: 'subtarea/edit-form/:idSubtarea', component: SubtareaFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
