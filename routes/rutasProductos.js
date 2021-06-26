
//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//controlador de productos 
const productosController = require('../controllers/productosController');


//Accion de mostrar todos los productos desde ruta rais
router.get('/', productosController.mostrarListaDeProductos);

//Accion de mostrar todos los productos accesando como pagina index
router.get('/Index', productosController.mostrarListaDeProductos);

//Accion de solo mostrar un solo producto por detalle
router.get('/:id', productosController.mostrarDetalleDeProducto);

//Accion de entrar al formulario de registrar un nuevo producto
//router.get('/crear', productosController.vistaCrearProducto);

//Accion de guardar producto en base de datos
//router.post('/productos', productosController.guardarProducto);

//Acccion de entrara la edicion de formulacio de edicion 
//router.get('/productos/editar/:id', productosController.entrarAvistaEdicionProducto);

//Accion de editar producto 
//router.put('/productos/:id', productosController.editarProducto);

//Accion de eliminar producto 
//router.put('/productos/:id', productosController.eliminarProducto);

module.exports = router;