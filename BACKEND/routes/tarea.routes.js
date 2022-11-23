const { Router } = require("express");
const { getTareas, addTarea, updateTarea, getTarea, deleteTarea } = require("../controllers/tarea.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const { check } = require('express-validator');

const router = new Router();

const { validarCampos } = require('../middlewares/validarCampos');

router.get('/', [validarJWT, validarCampos] ,getTareas);

router.get('/:id', [validarJWT, validarCampos], getTarea);

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatorio').not().isEmpty(),
    check('estadoTarea', 'El estado de la tarea es obligatorio').not().isEmpty(),
    validarCampos
    ], addTarea);

router.patch('/:id', [
    validarJWT,
    check('id', 'El ID es invalido').isMongoId(),
    validarCampos
], updateTarea);

router.delete('/:id', [
    validarJWT,
    validarCampos
], deleteTarea);


module.exports = router;