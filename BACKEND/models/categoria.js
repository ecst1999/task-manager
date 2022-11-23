const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre de categoria es obligatorio.']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatorio.']
    },

    estado: {
        type: Boolean,
        default: true
    }

});

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);