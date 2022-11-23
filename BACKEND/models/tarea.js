const { Schema, model } = require('mongoose');

const TareaSchema = Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'El usuario es obligatorio'],
        ref: 'Usuario'
    },

    categoria: {
        type: Schema.Types.ObjectId,
        required: [true, 'La categoria es obligatorio'],
        ref: 'Categoria',
    },

    titulo: {
        type: String,
        required: [true, 'El titulo de la tarea es obligatorio']
    },

    archivo: {
        type: String,
        default: null
    },

    ubicacion: {
        type: String,
        default: null
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción de la tarea es obligatorio']
    },

    fechaLimite: {
        type: Date,
        default: null  
    },

    icono: {
        type: String,
        default: null
    },

    prioridad: {
        type: String,
        default: 'Baja'
    },

    estadoTarea: {
        type: Schema.Types.ObjectId,
        required: [true, 'El estado de la tarea es obligatorio'],
        ref: 'Estado'
    },

    estado: {
        type: Boolean,
        default: true
    },

}, {timestamps: true});


TareaSchema.methods.toJSON = function() {
    const { __v, _id, ...tarea } = this.toObject();
    tarea.uid = _id;
    return tarea;
}

module.exports = model('Tarea', TareaSchema);
