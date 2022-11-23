const { request, response } = require('express');
const Categoria = require('../models/categoria');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getCategorias = async (req, res) => {

    const query = {
        estado: true
    }

    const categoria = await Categoria.find(query);

    res.json(categoria);

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getCategoria = async (req, res) => {

    const { id } = req.params;

    const query = {
        id,
        estado: true
    }

    const categoria = await Categoria.findOne(query);

    !categoria
    &&
    res.status(404).json({
        msg: 'No se encontro la categoria solicitada'
    });


    res.json(categoria);
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const postCategoria = async (req, res) => {

    const { nombre, descripcion } = req.body;

    const dataInsert = {
        nombre,
        descripcion
    }

    const categoria = new Categoria(dataInsert);

    categoria.save();

    res.json({
        msg: 'Se guardo de forma exitosa la categoria',
        categoria
    });
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const updateCategoria = async (req, res) => {

    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const dataUpdate = {
        nombre, descripcion
    }

    const existeCategoria = await Categoria.findById(id);

    !existeCategoria
    &&
    res.status(404).json({
        msg: 'No se encuentra la categoria'
    });

    const categoria = await Categoria.findByIdAndUpdate(id, dataUpdate, {new: true});

    res.json({
        msg: 'Se actualizo de forma adecuada',
        categoria
    });
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const deleteCategoria = async (req, res) => {

    const { id }  = req.params;

    const query = {
        id,
        estado: false
    }

    const existeCategoria = await Categoria.findById(id);

    !existeCategoria
    &&
    res.status(404).json({
        msg: 'No existe la categoria'
    });

    const categoria = await Categoria.findByIdAndUpdate(id, query, {new: true});

    req.json({
        msg: 'Se elimino el registro de forma adecuada',
        categoria
    });
}

module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    updateCategoria,
    deleteCategoria
}