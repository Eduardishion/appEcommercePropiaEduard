//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const vistasController = require('../controllers/vistasController');


//enrutamiento para rutas de productos
//vista principales
router.get('/', vistasController.vistaIndex);
//vista index
router.get('/Index', vistasController.vistaIndex);

module.exports = router;
