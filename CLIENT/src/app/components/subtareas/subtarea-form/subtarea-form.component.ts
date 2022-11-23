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
  idTarea: String;
  isSubmited = false;

  constructor(private tareaService: TareaService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private subTareaService: SubTareaService,
              private router: Router) {                
              this.idTarea = this.route.snapshot.paramMap.get('idTarea');      
              this.getEstados();
              this.cargarFormulario();
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

  crearSubtarea(){

    this.isSubmited = true;    

    if(this.formulario.invalid) return;

    if(this.formulario.valid){      
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
  }

  private getEstados(){
    this.tareaService.getEstados().subscribe(resp => this.estados = resp);
  }

}
