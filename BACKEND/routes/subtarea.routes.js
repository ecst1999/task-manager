const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { check } = require('express-validator');

const router = new Router();

const { validarCampos } = require('../middlewares/validarCampos');
const { getSubtareas, getSubtarea, addSubtarea, updateSubtarea, deleteSubtarea } = require("../controllers/subtarea.controller");

router.get('/tarea/:id', [validarJWT, validarCampos] ,getSubtareas);
router.get('/:id', [validarJWT, validarCampos], getSubtarea);

router.post('/', [
    validarJWT,
    check('estadoSubtarea', 'El estado de la subtarea es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre de la subtarea es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion de la subtarea es obligatorio').not().isEmpty(),
    check('tarea', 'La tarea de la subtarea es obligatorio').not().isEmpty(),
    validarCampos
], addSubtarea);

router.patch('/:id', [
    validarJWT, 
    check('id', 'El ID es invalido').isMongoId(),
    validarCampos
], updateSubtarea);

router.delete('/:id', [
    validarJWT,
    check('id', 'El ID es invalido').isMongoId(),
    validarCampos
], deleteSubtarea);

module.exports = router;