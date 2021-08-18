//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const controladorRutasPrincipales = require('../controllers/controladorRutasPrincipales');
const controladorDeProductos = require('../controllers/controladorDeProductos');


//enrutamiento para rutas de productos
router.get('/', controladorDeProductos.vistaCatalogo);

router.get('/Index', controladorDeProductos.vistaCatalogo);

module.exports = router;
