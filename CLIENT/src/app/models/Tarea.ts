import { Categoria } from "./Categoria";
import { Estado } from "./Estado";

export interface Tarea {
    uid: String,
    archivo: String,
    categoria: Categoria,
    descripcion: String,
    estado: Boolean,
    estadoTarea: Estado,
    fechaLimite: Date,
    icono: String,
    prioridad: String,
    titulo: String,
    ubicacion: String,
    usuario: String,
    createdAt: Date,
    updatedAt: Date,
}