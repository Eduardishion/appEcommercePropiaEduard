//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const productosController = require('../controllers/vistasController');

//enrutamiento para rutas de productos
//vista principal
router.get('/', productosController.vistaIndex);
//vista index
router.get('/Index', productosController.vistaIndex);
//vista detalle producto
router.get('/DetalleProducto', productosController.vistaDetalleProducto);
//vista carrito de compra
router.get('/CarritoCompra', productosController.vistaCarritoCompra);
//vista carrito de compra
router.get('/InicioSesion', productosController.vistaInicioSesion);
//vista carrito de compra
router.get('/Registro', productosController.vistaRegistro);

module.exports = router;
