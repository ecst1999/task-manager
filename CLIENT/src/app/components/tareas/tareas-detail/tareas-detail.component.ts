import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTarea } from 'src/app/models/SubTarea';
import { Tarea } from 'src/app/models/Tarea';
import { SubTareaService } from 'src/app/services/modules/sub-tarea.service';
import { TareaService } from 'src/app/services/modules/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-detail',
  templateUrl: './tareas-detail.component.html',
  styleUrls: ['./tareas-detail.component.css']
})
export class TareasDetailComponent implements OnInit {

  public tarea: Tarea;
  public subTareas: SubTarea[];
  private idTarea: String;

  constructor(private tareaService: TareaService,
            private route: ActivatedRoute,
            private subTareaService: SubTareaService,
            private router: Router) { }

  ngOnInit(): void {
    this.idTarea = this.route.snapshot.paramMap.get('id');    
    this.getTarea(this.idTarea);
    this.getSubTarea(this.idTarea);
  }

  private getTarea(id: String){
    this.tareaService.getTarea(id).subscribe((resp) => this.tarea = resp);
  }

  private getSubTarea(id: String){
    this.subTareaService.getSubtareas(id).subscribe((resp) => this.subTareas = resp);
  }

  eliminarTarea(idTarea: String){    
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      text: 'De eliminar la tarea',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if(result.isConfirmed){
        this.tareaService.deleteTarea(idTarea).subscribe(resp => {          
          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado de forma adecuada la tarea.',
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          }).then(result => {
            if(result.dismiss === Swal.DismissReason.timer){
              this.router.navigate(['/tareas']);
            }
          });
        }, (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.error['msg']
          });
        });
      }
    });
  }

  eliminarSubtarea(idSubtarea: String){    
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      text: 'De eliminar la subtarea',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if(result.isConfirmed){
        this.subTareaService.deleteSubtarea(idSubtarea).subscribe(resp => {
          Swal.fire({
            title: 'Eliminado!',
            text: resp['msg'],
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          }).then(result => {
            if(result.dismiss === Swal.DismissReason.timer){
              this.router.navigate(['/tarea/'+ this.idTarea]);
            }
          });
        }, (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.error['msg']
          });
        });
      }
    });
  }
}
