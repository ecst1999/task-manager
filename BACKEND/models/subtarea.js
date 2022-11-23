const { Schema, model } = require('mongoose');

const SubtareaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la subtarea es obligatorio'],
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion de la subtarea es obligatorio'],
    },

    fechaFinalizacion: {
        type: Date,
    },

    fechaLimite: {
        type: Date,
    },

    prioridad: {
        type: String,
        default: 'Baja',
    },    

    estadoSubtarea: {
        type: Schema.Types.ObjectId,
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    },
    
    tarea: {
        type: Schema.Types.ObjectId,
        required: [true, 'La tarea es obligatoria'],
        ref: 'Tarea'
    },

}, {timestamps: true});

SubtareaSchema.methods.toJSON = function() {
    const { __v, _id, ...subtarea } = this.toObject();
    subtarea.uid = _id;
    return subtarea;
}

module.exports = model('Subtarea', SubtareaSchema);