import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/Estado';
import { Tarea } from 'src/app/models/Tarea';
import { EstadoTareaService } from 'src/app/services/modules/estado-tarea.service';
import { TareaService } from 'src/app/services/modules/tarea.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {

  public estados: Estado[];
  public tareas: Tarea[];  

  constructor(private tareaService: TareaService,
            private estadoService: EstadoTareaService) { }

  ngOnInit(): void {

    this.getEstados();

    this.getTareas();

  }

  private getEstados(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp);
  }

  private getTareas(){
    this.tareaService.getTareas().subscribe(resp => this.tareas = resp );
  }

}
