//modulos nativos
const express = require("express");
const router = express.Router();

//controlador de productos
const controladorDeProductos = require('../controllers/controladorDeProductos');

//Accion de mostrar todos los productos desde ruta rais
router.get("/listaProductos", controladorDeProductos.listaDeProductos);

//Accion de solo mostrar un solo producto por detalle
router.get('/detalleProducto/:id', controladorDeProductos.vistaDetalleProducto);

//Accion de entrar al formulario de registrar un nuevo producto
router.get('/registrarProducto', controladorDeProductos.vistaRegistrarProducto);

//Accion de guardar producto en base de datos
router.post('/guardarProducto', controladorDeProductos.guardarProducto);

//Acccion de entrara a la vistar de edicion de producto
router.get('/editarProducto/:id',  controladorDeProductos.vistaEdicionProducto);

//Accion de editar producto 
router.put('/actulizaProducto/:id', controladorDeProductos.actulizaProducto);

//Accion de eliminar producto 
router.delete('/eliminaProducto/:id', controladorDeProductos.eliminaProducto);


module.exports = router;
