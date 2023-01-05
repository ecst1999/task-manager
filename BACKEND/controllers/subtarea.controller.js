const { request, response} = require('express');
const Subtarea = require('../models/subtarea');
const Estado = require('../models/estado');
const Tarea = require('../models/tarea');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getSubtareas = async (req, res) => {

    const { id } = req.params;

    const query = {
        tarea: id,
        estado: true
    };

    const subtarea = await Subtarea.find(query);

    res.json(subtarea);
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getSubtarea = async (req, res) => {

    const { id } = req.params;

    const query = {
        _id: id,
        estado: true
    }

    const subtarea = await Subtarea.findOne(query).populate('estadoSubtarea', 'descripcion');    

    res.json(subtarea);
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const addSubtarea = async (req, res) => {

    const { nombre, descripcion, fechaFinalizacion, fechaLimite, prioridad, estadoSubtarea, tarea } = req.body;

    const tareaSchema = await Tarea.findById(tarea);

    !tareaSchema
    &&
    res.status(404).json({
        msg: 'La tarea no se encuentra'
    });

    const dataInsert = {
        nombre,
        descripcion,
        fechaFinalizacion,
        fechaLimite,
        prioridad,
        tarea,
        estadoSubtarea
    };

    const subtarea = new Subtarea(dataInsert);

    await subtarea.save();

    res.json({
        msg: 'Subtarea creada',
        subtarea
    });
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const updateSubtarea = async (req, res) => {

    const { id } = req.params;

    const { nombre, descripcion, fechaFinalizacion, fechaLimite, prioridad, estadoSubtarea } = req.body;

    const existeSubtarea = await Subtarea.findById(id);

    !existeSubtarea
    &&
    res.status(404).json({
        msg: 'No existe la subtarea'
    });

    const dataUpdate = {
        nombre,
        descripcion,
        fechaFinalizacion,
        fechaLimite,
        prioridad,        
        estadoSubtarea
    }

    const subTarea = await Subtarea.findByIdAndUpdate(id, dataUpdate,  {new: true});

    !subTarea
    &&
    res.status(404).json({
        msg: 'No se pudo actualizar la subtarea'
    });

    res.json({
        msg: 'SubTarea actualizada',
        subTarea
    });

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const deleteSubtarea = async (req, res) => {

    const { id } = req.params;

    const existeSubtarea = await Subtarea.findById(id);

    !existeSubtarea
    &&
    res.status(404).json({
        msg: 'No se encuentra la subtarea solicitada'
    });

    const dataUpdate = {
        estado: false
    }

    const subtarea = await Subtarea.findByIdAndUpdate(id, dataUpdate, {new: true});

    !subtarea
    && 
    res.status(500).json({
        msg: 'No se pudo actualizar'
    });

    res.json({
        msg: 'Se elimino la subtarea de forma adecuada',
        subtarea
    });
}


module.exports = {
    getSubtareas,
    getSubtarea,
    addSubtarea,
    updateSubtarea,
    deleteSubtarea
}