//objeto express
const express = require('express');
//enrutador
const router = express.Router();
//modulo multer
const multer = require('multer');
//modulo path
const path = require("path");
//verificaicon de session activa 
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//controlador de usuarios
const controladorDeUsuarios = require('../controllers/controladorDeUsuarios');
//validador de formulario de creacion y edicion de usuario 
const validacionesFormUsuario = require('../middlewares/validacionesFormUsuario');
//validador de formulario de inicio sesion 
const validacionesFormUsuarioLogin = require('../middlewares/validacionesFormUsuarioLogin');
//validador de email exitente al registrar un nuevo asuario
const validarUsuarioExitenteMiddleware = require('../middlewares/validarUsuarioExitente')

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

// si yo ya estoy logeado no debo por que volver a entrar a formulario de registro y el login 
//con el middleware debemos bloquear eso y mandarlos al profile  con guestMiddleware 

// si no estoy loguedo no puedo entrar al profile o al registro 

//aun debemos crear middleware para verificar el cargo del usuario si es administrador o solo cliente

//y hacer middleware para bloquear rutas de procesos 

//Accion para generar tokens conforme a la informacion enviada
/**
 * @swagger
 * /getTokens:
 *  post:
 *      description: Generator of tokens for access to API products.
 *      parameters:
 *      -  name: id
 *      -  name: name
 *      responses:
 *          200:
 *              description: Return token 
 */ 
router.post("/getTokens", controladorDeUsuarios.getTokens);

//Accion de mostrar todos los usuarios
router.get("/loginUsuario" , guestMiddleware ,controladorDeUsuarios.loginUsuario);

//Accion de mostrar todos los usuarios
router.get("/listaUsuarios",authMiddleware ,controladorDeUsuarios.listaDeUsuarios);

//Accion de solo mostrar un solo usuario por detalle
//router.get('/detalleUsuario/:id', controladorDeUsuarios.vistaDetalleUsuario);

//Accion de entrar al formulario de registrar un nuevo usuario
router.get('/registrarUsuario', guestMiddleware , controladorDeUsuarios.vistaRegistrarUsuario);

//Accion de guardar usuario en base de datos 
router.post('/guardarUsuario',upload.single('imagenUsuario'), validacionesFormUsuario, controladorDeUsuarios.guardarUsuario);

//Acccion de entrara a la vistar de edicion de usuario
router.get('/editarUsuario/:id',  controladorDeUsuarios.vistaEdicionUsuario);

//Accion de actulisar usuario en la base de datos 
router.put('/actulizaUsuario/:id', upload.single('imagenUsuario'), validacionesFormUsuario , controladorDeUsuarios.actulizaUsuario);

//Accion de eliminar usuario
router.delete('/eliminaUsuario/:id', controladorDeUsuarios.eliminaUsuario);

//Accion de iniciar sesion usuario
router.post('/verificaSesion/', validacionesFormUsuarioLogin, controladorDeUsuarios.verificaSesion);

//Accion de entrar a perfil de usuario despues de logearse o al catalogo de productos 
router.get('/perfilDeUsuario/',authMiddleware ,controladorDeUsuarios.vistaPerfilDeUsuario);

//Accion de cerrar session
router.get('/cierreSession/', controladorDeUsuarios.cierreSession);



module.exports = router;