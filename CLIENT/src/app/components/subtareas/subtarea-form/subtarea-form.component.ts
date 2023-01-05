import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/Estado';
import { SubTareaService } from 'src/app/services/modules/sub-tarea.service';
import { TareaService } from 'src/app/services/modules/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subtarea-form',
  templateUrl: './subtarea-form.component.html',
  styleUrls: ['./subtarea-form.component.css']
})
export class SubtareaFormComponent implements OnInit {

  public formulario: FormGroup;    
  estados: Estado[];
  idTarea: any;
  idSubtarea: String;
  isSubmited = false;
  ruta: String;
  editar = false;

  constructor(private tareaService: TareaService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private subTareaService: SubTareaService,
              private router: Router) {        

      this.idTarea = this.route.snapshot.paramMap.get('idTarea');      
      this.idSubtarea = this.route.snapshot.paramMap.get('idSubtarea');  
      this.ruta = this.route.snapshot.routeConfig.path;
      this.getEstados();
      this.cargarFormulario();

      if(this.ruta.includes('edit-form') && this.idSubtarea != null){
        this.editar = true;
        this.subTareaService.getSubtarea(this.idSubtarea).subscribe(resp => {
          this.formulario.reset({
            nombre: resp.nombre,
            descripcion: resp.descripcion,
            fechaLimite:  formatDate(resp.fechaLimite, 'yyyy-MM-dd', 'en'),
            prioridad: resp.prioridad,
            estadoSubtarea: resp.estadoSubtarea  
          });     
          this.idTarea = resp.tarea;          
        });        
      }

      
  }

  ngOnInit(): void {    
  }

  cargarFormulario(){
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],      
      fechaLimite: [''],
      prioridad: [''],
      estadoSubtarea: ['', Validators.required],
      tarea: [this.idTarea]
    });
  }

  submitFormulario(){
    this.isSubmited = true;    

    if(this.formulario.invalid) return;

    if(this.formulario.valid){      
      if(!this.editar){
        this.crearSubtarea();
      }else{
        this.actualizarSubtarea();
      }      
    }
  }

  private crearSubtarea(){
    this.subTareaService.postSubtarea(this.formulario.value).subscribe(resp => {
      Swal.fire({          
        icon: 'success',
        text: resp['msg'],
        timer: 1800,
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer){
          this.router.navigate(['/tarea/'+ this.idTarea]);
        }
      }); 
    }, (error: HttpErrorResponse) => {
        Swal.fire({          
          icon: 'error',
          text: error.error['msg'],
        }); 
    });    
  }

  private getEstados(){
    this.tareaService.getEstados().subscribe(resp => this.estados = resp);
  }

  private actualizarSubtarea(){
    this.subTareaService.patchSubtarea(this.formulario.value, this.idSubtarea).subscribe(resp => {
      console.log(resp);
      Swal.fire({          
        icon: 'success',
        text: resp['msg'],
        timer: 1800,
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer){
          this.router.navigate(['/tarea/'+ this.idTarea]);
        }
      }); 
    }, (error: HttpErrorResponse) => {
        Swal.fire({          
          icon: 'error',
          text: error.error['msg'],
        });
    });
  }


}
