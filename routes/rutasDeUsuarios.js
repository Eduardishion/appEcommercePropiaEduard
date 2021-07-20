//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//modulo multer
const multer = require('multer');
//modulo path
const path = require("path");

//controlador de productos 
const controladorDeUsuarios = require('../controllers/controladorDeUsuarios');
//validador 
const validacionesFormUsuario = require('../middlewares/validacionesFormUsuario');

let storage = multer.diskStorage({
    //carpeta donde almacenaremos 
    destination: (req, file, cb) => {
        let folderOfStore = path.join(__dirname,'../public/images/imagenesUsuarios');
        cb(null, folderOfStore);
    },
    filename: (req, file, cb) => {
        //uso de fecha para nombrar los archivos
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

let upload = multer({ storage: storage });

//Accion de mostrar todos los usuarios
router.get("/loginUsuario", controladorDeUsuarios.loginUsuario);

//Accion de mostrar todos los usuarios
router.get("/listaUsuarios", controladorDeUsuarios.listaDeUsuarios);

//Accion de solo mostrar un solo usuario por detalle
//router.get('/detalleUsuario/:id', controladorDeUsuarios.vistaDetalleUsuario);

//Accion de entrar al formulario de registrar un nuevo usuario
router.get('/registrarUsuario', controladorDeUsuarios.vistaRegistrarUsuario);

//Accion de guardar usuario en base de datos 
router.post('/guardarUsuario',upload.single('imagenUsuario'), validacionesFormUsuario , controladorDeUsuarios.guardarUsuario);

//Acccion de entrara a la vistar de edicion de usuario
router.get('/editarUsuario/:id',  controladorDeUsuarios.vistaEdicionUsuario);

//Accion de actulisar usuario en la base de datos 
router.put('/actulizaUsuario/:id', upload.single('imagenUsuario'), validacionesFormUsuario , controladorDeUsuarios.actulizaUsuario);

//Accion de eliminar usuario
router.delete('/eliminaUsuario/:id', controladorDeUsuarios.eliminaUsuario);


module.exports = router;