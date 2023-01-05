import { Estado } from "./Estado"
import { Tarea } from "./Tarea"

export interface SubTarea {
    
    uid: String, 
    nombre: String,    
    descripcion: String,    
    prioridad: String,   
    estadoSubtarea: Estado,  
    estado: Boolean,
    fechaLimite: Date,
    tarea: Tarea,    
    createdAt: Date,
    updatedAt: Date,

}