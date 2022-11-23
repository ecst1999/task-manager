const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

/** 
 * @param {request} req
 * @param {response} res 
 **/
const register = async(req, res) => {

    const { nombre, correo, clave, rol } = req.body;

    const role = await Role.findOne({rol});

    !role 
    && 
    res.status(400).json({
        msg: `El rol ${rol} no existe!!`
    });    

    const { _id } = role;

    
    const usuario = new Usuario({nombre, correo, clave, rol: _id});
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.clave = bcryptjs.hashSync( clave, salt);

    await usuario.save();


    res.json({
        msg: 'Usuario creado con exito!!',
        usuario
    });

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const login = async (req, res) => {

    const { correo, clave } = req.body;

    try {

        //Verificar si el email existe 
        const usuario = await Usuario.findOne({ correo });
        
        !usuario
        &&
        res.status(400).json({
            msg: 'Usuario o contraseña incorrecta'
        });

        const validPassword = bcryptjs.compareSync( clave, usuario.clave);
        
        !validPassword
        &&
        res.status(400).json({
            msg: 'Usuario o contraseña incorrecta'
        });

        const token = await generarJWT(usuario, usuario._id);

        res.json({            
            token,
            usuario  
        });
        
    } catch (error) {        
        res.status(500).json({
            msg: 'Contactarse con el administrador del API'
        });
    }

}

module.exports = {
    register,
    login
}