import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { Estado } from 'src/app/models/Estado';
import { Tarea } from 'src/app/models/Tarea';
import { TareaService } from 'src/app/services/modules/tarea.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styleUrls: ['./tareas-form.component.css']
})
export class TareasFormComponent implements OnInit {
  
  public tarea: Tarea;
  public categorias: Categoria[];
  public estados: Estado[];
  private editar = false;
  private idTarea: String;

  public formulario: FormGroup;

  submitted = false;

  constructor(private tareaService: TareaService, 
            private fb: FormBuilder,
            private router: Router,
            private route: ActivatedRoute) {

    this.idTarea = this.route.snapshot.paramMap.get('idTarea');    
    
    this.getCategoria();
    
    this.getEstado();
    
    this.cargarFormulario();

    if(this.idTarea != null){
      this.editar = true;
      this.tareaService.getTarea(this.idTarea).subscribe(resp => {        
        this.formulario.reset({    
          categoria: resp.categoria._id,
          titulo: resp.titulo,
          //archivo: resp.archivo,
          ubicacion: resp.ubicacion,
          descripcion: resp.descripcion,
          fechaLimite: formatDate(resp.fechaLimite, 'yyyy-MM-dd', 'en'),
          icono: resp.icono,
          prioridad: resp.prioridad,
          estadoTarea: resp.estadoTarea.descripcion
        });                                
        
      });
    }    
    
   }

  ngOnInit(): void {    
  }

  private getCategoria(){
    this.tareaService.getCategoria().subscribe(res => this.categorias = res);
  }

  private getEstado(){
    this.tareaService.getEstados().subscribe(res => this.estados = res);
  }

  enviarFormulario(){    
    this.submitted = true;    

    if (this.formulario.invalid) return;

    if(this.formulario.valid){      
      if(!this.editar){
        this.agregarTarea();
      }else{
        this.actualizarTarea();
      }
    }else{
      
    }
  }

  private agregarTarea(){
    this.tareaService.postTarea(this.formulario.value).subscribe((resp) => {
      Swal.fire({          
        icon: 'success',
        text: resp['msg'],
        timer: 1800,
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer){
          this.router.navigate(['/tareas']);
        }
      });     
    }, (error: HttpErrorResponse) => {
      Swal.fire({          
        icon: 'error',
        text: error.error['msg'],
      }); 
    });
  }

  private actualizarTarea(){
        
    this.tareaService.patchTarea(this.formulario.value, this.idTarea).subscribe((resp) => {      

      Swal.fire({          
        icon: 'success',
        text: resp['msg'],
        timer: 1800,
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer){
          this.router.navigate(['/tareas']);
        }
      });     
    }, (error: HttpErrorResponse) => {
      Swal.fire({          
        icon: 'error',
        text: error.error['msg'],
      }); 
    });
  }

  private cargarFormulario(){

    this.formulario = this.fb.group({
      categoria: ['', Validators.required],
      titulo: ['', Validators.required],
      archivo: [''],
      ubicacion: [''],
      descripcion: ['', Validators.required],
      fechaLimite: [''],
      icono: [''],
      prioridad: [''],
      estadoTarea: ['', Validators.required],
    });
    
  }

}

