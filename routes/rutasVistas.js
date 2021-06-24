//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const vistasController = require('../controllers/vistasController');

//enrutamiento para rutas de productos
//vista principal
router.get('/', vistasController.vistaIndex);
//vista index
router.get('/Index', vistasController.vistaIndex);
//vista detalle producto
router.get('/DetalleProducto', vistasController.vistaDetalleProducto);
//vista carrito de compra
router.get('/CarritoCompra', vistasController.vistaCarritoCompra);
//vista carrito de compra
router.get('/InicioSesion', vistasController.vistaInicioSesion);
//vista carrito de compra
router.get('/Registro', vistasController.vistaRegistro);

module.exports = router;
