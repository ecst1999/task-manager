const { Schema, model } = require('mongoose');

const EstadoSchema = Schema({

    descripcion: {
        type: String,
        required: [true, 'La descripcion del estado es obligatoria']
    },

    color: {
        type: String,
        required: [true, 'El color del estado es obligatorio']
    },
    
},{timestamps: true});

EstadoSchema.methods.toJSON = function() {
    const { __v, _id, ...estado } = this.toObject();
    estado.uid = _id;
    return estado;
}

module.exports = model('Estado', EstadoSchema);