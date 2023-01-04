const { request, response } = require('express');
const Tarea = require('../models/tarea');
const Estado = require('../models/estado');
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const addTarea = async (req, res) => {

    const { categoria, titulo, archivo, ubicacion, descripcion, fechaLimite, icono, prioridad, estadoTarea } = req.body;

    const estado = await Estado.findOne({descripcion: estadoTarea});

    const categoriaSchem = await Categoria.findById(categoria);
    
    !estado 
    && 
    res.status(404).json({
        msg: `El estado ${estadoTarea} no existe en los registros.`
    });

    !categoriaSchem
    &&
    res.status(404).json({
        msg: 'No existe el ID de categoria'
    });
    
    const dataInsert = {
        categoria,
        titulo, 
        archivo, 
        ubicacion, 
        descripcion, 
        fechaLimite, 
        icono, 
        prioridad, 
        estadoTarea: estado._id,
        usuario: req.usuario._id
    }

    const tarea = await new Tarea(dataInsert);

    tarea.save();

    res.status(201).json({
        msg: 'Se creo la tarea de forma adecuada',
        tarea
    });

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getTareas = async (req, res) => {

    const usuario = req.usuario._id;

    const query = {estado: true, usuario};

    const tarea = await Tarea.find(query).populate('categoria', 'nombre').populate('estadoTarea', 'descripcion');

    res.status(200).json(tarea);

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getTarea = async (req, res) => {

    const { id } = req.params;
    const usuario = req.usuario._id;
    const user = await Usuario.findById(usuario);    

    !user
    &&
    res.status(404).json({
        msg: 'No se encontro el usuario'
    });

    const query = {
        estado: true,
        usuario: user._id,
        _id: id
    };

    const tarea = await Tarea.findOne(query).populate('usuario', 'nombre').populate('categoria').populate('estado').populate('estadoTarea', 'descripcion');

    !tarea 
    && 
    res.status(404).json({
        msg: 'No se encontro la tarea requerida'
    });

    res.json(tarea);

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const updateTarea = async (req, res) => {
    
    const { id } = req.params;    
    const usuarioID = req.usuario._id;
    const { categoria, titulo, archivo, ubicacion, descripcion, fechaLimite, icono, prioridad, estadoTarea } = req.body;
    const estado = await Estado.findOne({descripcion: estadoTarea});
    const usuario = await Usuario.findById(usuarioID);
    
    !usuario
    &&
    res.status(404).json({
        msg: 'No se encontro el usuario'
    });
    
    !estado
    &&
    res.status(404).json({
        msg: `No se encontro el estado: ${estadoTarea}`
    });
    
    const query = { _id: id, usuario: usuarioID };

    const dataUpdate = {
        categoria,
        titulo,
        archivo,
        ubicacion,
        descripcion,
        fechaLimite,
        icono,
        prioridad,
        estadoTarea: estado._id
    }

    const tarea = await Tarea.findOneAndUpdate(query, dataUpdate, {new: true});

    !tarea
    &&
    res.status(404).json({
        msg: 'No se encontro la tarea solicitada'
    });


    res.json({
        msg: 'Se actualizo la tarea de forma adecuada.',
        tarea
    });
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const deleteTarea = async (req, res) => {

    const { id } = req.params;

    const usuarioID = req.usuario;

    const existeTarea = await Tarea.findById(id);

    !existeTarea
    && 
    res.status(404).json({
        msg: 'No se encontro la tarea'
    });

    const usuario = await Usuario.findById(usuarioID);

    !usuario
    &&
    res.status(404).json({
        msg: 'No se encuentra el usuario'
    });

    const query = {
        _id: id,
        usuario: usuarioID
    };

    const tarea = await Tarea.findOneAndUpdate(query, {estado: false});

    !tarea
    &&
    res.status(404).json({
        msg: 'No tiene permisos para borrar la tarea'
    });

    res.json({
        msg: 'Se elimino de forma adecuada',
        tarea
    });

}


module.exports = {
    addTarea,
    getTareas,
    updateTarea,
    getTarea,
    deleteTarea
}