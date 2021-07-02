//modulos nativos
const express = require("express");
const router = express.Router();
//modulo multer
const multer = require('multer');
const path = require("path");

// configuracion de multer primera version
// let multerDiskStorage = multer.diskStorage({

//     destination: (req, file, callback)=>{
//         //carpeta donde almacenaremos 
//         let folderOfStore = path.join(__dirname,'../public/images/imagenesDeProductos');
//         callback(null, folderOfStore);
//     },
//     filename: (req, file, callback)=>{
//         //nombre de archivo
//         //para ver la propiedades de la imagen cargada
//         console.log(file);
//         //uso de fecha para nombrar los archivos
//         let imageName =  Date.now() +'_imageProduct_'+ path.extname(file.originalname); 
//         callback(null, imageName);
//     }

// });

// variable para configurar carga de imagen 
// const fileUpload = multer({ store: multerDiskStorage });


let storage = multer.diskStorage({
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
let upload = multer({ storage: storage });


//controlador de productos
const controladorDeProductos = require('../controllers/controladorDeProductos');

//Accion de mostrar todos los productos desde ruta rais
router.get("/listaProductos", controladorDeProductos.listaDeProductos);

//Accion de solo mostrar un solo producto por detalle
router.get('/detalleProducto/:id', controladorDeProductos.vistaDetalleProducto);

//Accion de entrar al formulario de registrar un nuevo producto
router.get('/registrarProducto', controladorDeProductos.vistaRegistrarProducto);

//Accion de guardar producto en base de datos y carga de imagen mediante multer
//router.post('/guardarProducto', fileUpload.single('imageProducto'), controladorDeProductos.guardarProducto);
router.post('/guardarProducto', upload.any(), controladorDeProductos.guardarProducto);

//Acccion de entrara a la vistar de edicion de producto
router.get('/editarProducto/:id',  controladorDeProductos.vistaEdicionProducto);

//Accion de editar producto 
router.put('/actulizaProducto/:id', upload.any(), controladorDeProductos.actulizaProducto);

//Accion de eliminar producto 
router.delete('/eliminaProducto/:id', controladorDeProductos.eliminaProducto);


module.exports = router;
