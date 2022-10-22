//modulos 
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");

//middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validacionesFormProducto = require('../middlewares/validacionesFormProducto');
const auth = require('../middlewares/auth')();


//controlador de productosDB
const controladorDeProductosDB = require('../controllers/controladorDeProductosDB');

// configuracion de multer primera version
const storage = multer.diskStorage({
    //carpeta donde almacenaremos 
    destination: (req, file, cb) => {
        let folderOfStore = path.join(__dirname,'../public/images/imagenesDeProductos');
        cb(null, folderOfStore);
    },
    filename: (req, file, cb) => {
        //uso de fecha para nombrar los archivos
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

//constante para almacenar 
const upload = multer({ storage: storage });

//prueba conexion a la base de datos, y autenticacion de API mediante JWT
/**
 * @swagger
 * /test:
 *  get:
 *      description: List of products for test.
 *      responses:
 *          200:
 *              description: Return list of products
 */ 
router.get("/test", auth.authenticate(),controladorDeProductosDB.test);
/**
 * @swagger
 * /test2:
 *  get:
 *      description: List of products for test.
 *      responses:
 *          200:
 *              description: Return list of products
 */ 
router.get("/test2", auth.authenticate(),controladorDeProductosDB.test2);

router.get("/test3", controladorDeProductosDB.test3);

//api
router.get("/api", controladorDeProductosDB.viewApi);

//Accion de entrar a la vista de carrito de compra 
router.get("/carritoCompra", controladorDeProductosDB.vistaCarritoDeCompra);

//Accion de mostrar todos los productos desde ruta rais
router.get("/listaProductos", authMiddleware , controladorDeProductosDB.listaDeProductos);

//Accion de solo mostrar un solo producto por detalle
router.get('/detalleProducto/:id', controladorDeProductosDB.vistaDetalleProducto);

//Accion de entrar al formulario de registrar un nuevo producto
router.get('/registrarProducto', authMiddleware , controladorDeProductosDB.vistaRegistrarProducto);

router.post('/guardarProducto', upload.any('imagesProducto'), validacionesFormProducto , controladorDeProductosDB.guardarProducto);

//Acccion de entrara a la vistar de edicion de producto
router.get('/editarProducto/:id', authMiddleware , controladorDeProductosDB.vistaEdicionProducto);

//Accion de editar producto 
router.put('/actulizaProducto/:id', upload.any('imagesProducto'), validacionesFormProducto , controladorDeProductosDB.actulizaProducto);

//Accion de eliminar producto 
router.delete('/eliminaProducto/:id', controladorDeProductosDB.eliminaProducto);

module.exports = router;
