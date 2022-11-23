const { Router } = require("express");
const { check } = require("express-validator");
const { getCategorias, getCategoria, postCategoria, updateCategoria } = require("../controllers/categoria.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");

const router = new Router();

router.get('/', [validarJWT, validarCampos], getCategorias);

router.get('/:id', [
    validarJWT,
    check('id', 'No es ID valido').isMongoId(),
    validarCampos
], getCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], postCategoria);

router.patch('/:id', [
    validarJWT,
    validarCampos
], updateCategoria)

module.exports = router;