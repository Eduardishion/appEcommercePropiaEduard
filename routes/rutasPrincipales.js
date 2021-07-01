//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const controladorRutasPrincipales = require('../controllers/controladorRutasPrincipales');


//enrutamiento para rutas de productos
//vista principales
router.get('/', controladorRutasPrincipales.vistaIndex);
//vista index
router.get('/Index', controladorRutasPrincipales.vistaIndex);

module.exports = router;
