const { Router } = require("express");
const { getEstados } = require("../controllers/estados.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");

const router = new Router();

router.get('/', [validarJWT, validarCampos], getEstados);


module.exports = router;