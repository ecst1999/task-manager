const { Schema, model } = require('mongoose')

const NotificacioneSchema = Schema({

    notificacion: {
        type: String,
        required: [true, 'La notificación es obligatoria']
    },

    tipoNotificacion: {
        type: String,
        required: [true, 'El tipo de notificación es obligatorio']
    },

    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario es obligatorio'],
        ref: 'Usuario'
    },  
    
    estado: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});

module.exports = model('Notificacione', NotificacioneSchema);

/*
TODO: 

*Guardar tareas por usuario 
*Guardar subtareas 
*Guardar hora de creacion 
*Guardar hora de cumpliento de tarea
*Guardar fecha de cumplimiento de tarea 
*Guardar icono 
*Guardar prioridad
*Guardar titulo de tarea 
*Guardar descripcion de tarea 
Desplegar en calendario 
*Guardar archivos de tarea 
*Guardar ubicacion 
Desplegar tiempo de desarrollo de tarea
*Guardar estado de tarea 

*Guardar categorias 
*Guardar nombre Categoria


*Guardar notificaciones 
*Guardar tipo notificaciones
*Guardar fecha de generacion
*Guardar usuario
Guardar fecha inicio
Guardar hora inicio 
Guardar hora fin
Guardar fecha fin

*Guardar ruta de archivo
*Guardar archivo

*/