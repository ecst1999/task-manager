const { request, response } = require('express')
const Estado = require('../models/estado');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getEstados =  async (req, res) => {

    const estados = await Estado.find();

    res.json(estados);
}

module.exports = {
    getEstados
}