const { Router } = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');
const { validarCampos } = require("../middlewares/validarCampos");

const router = new Router();

router.post('/register', register);

router.post('/login', [
    validarCampos,
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('clave', 'La clave es obligatoria').not().isEmpty()
],login);


module.exports = router;