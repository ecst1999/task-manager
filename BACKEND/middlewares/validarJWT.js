const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    !token
    &&
    res.status(401).json({
        msg: 'No hay token en la petición.'
    });

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        (!usuario || !usuario.estado)
        &&
        res.status(401).json({
            msg: 'Token no valido'
        });
        
        req.usuario = usuario;

        next();


    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: 'Token no valido!!'
        });
    }

}

module.exports = {
    validarJWT
}