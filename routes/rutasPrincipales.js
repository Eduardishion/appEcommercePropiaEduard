//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const controladorRutasPrincipales = require('../controllers/controladorRutasPrincipales');
const controladorDeProductosDB = require('../controllers/controladorDeProductosDB');


//enrutamiento para rutas de productos
router.get('/', controladorDeProductosDB.vistaCatalogo);

router.get('/Index', controladorDeProductosDB.vistaCatalogo);

module.exports = router;
