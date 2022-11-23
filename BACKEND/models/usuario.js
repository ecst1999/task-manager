const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    clave: {
        type: String,
        required: [true, 'La clave es obligatoria']
    },

    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    },
    
    google: {
        type: Boolean,
        default: false
    }
    
});


UsuarioSchema.methods.toJSON = function() {
    const { __v, clave, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);