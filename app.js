	//modulos nativas necesarias
	const express = require('express'); 
	const path = require('path'); 
	const cors = require('cors')
	//modulos de terceros para  hacer peticiones put y delete
	const methodOverride = require('method-override');

	//modulo para sessiones y coookies 
	const session = require('express-session');
	const cookieParser = require('cookie-parser');

	//swagger
	var swaggerJsdoc = require("swagger-jsdoc");
	var swaggerUi = require("swagger-ui-express");

	//------------Configure swagger docs------------------
	var options = {
		swaggerDefinition: {
		  info: {
			title: "API products",
			version: "0.0.1",
			description: "API list of endpoints for products",
		  },
		},
		apis: [path.join(__dirname, "/routes/*.js")],
	  };
	var swaggerSpecs = swaggerJsdoc(options);
	//------------Configure swagger docs------------------

	// middleware para recordar session 
	const recordarmeMiddleware = require('./middlewares/recordarmeMiddleware');
	//middleware para verificar si esta logueado y cambiar la barra de navegacion 
	const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueadoMiddleware');


	//rutas a vistas principales
	const rutasPrincipales = require('./routes/rutasPrincipales');
	//rutas de operaciones CRUD para productos
	const rutasDeProductosDB = require('./routes/rutasDeProductosDB');
	//rutas de operaciones CRUD para usuarios
	const rutasUsuarios = require('./routes/rutasDeUsuarios');
	

	//------------objeto servidor------------------
	//objeto servidor 
	const app = express();
	//------------objeto servidor------------------
	
	//------------------midwares------------------
 
	  
	//cors
	app.use(cors())

	//carpeta publica de archivos estaticos 
	app.use(express.static('./public'));
	
	// configuracion para usar view engine EJS
	app.set('view engine','ejs');
	app.set('views', path.join(__dirname, 'views'));
	

	//para poder capturar datos de formularios POST
	app.use(express.urlencoded({extended:false}));
	app.use(express.json());

	// configurar los metodos delete y put con method-override 
	app.use(methodOverride('_method'));


	//uso de cookies
	app.use(cookieParser());
	//uso de session 
	app.use(session({
		secret : 'Session secreta',
		resave : false,
		saveUninitialized : false
	}));
	
	//middleware de guardado de cookie
	app.use(recordarmeMiddleware);
	app.use(usuarioLogueadoMiddleware);
	//------------------midwares------------------
	
	
	//------------------rutas------------------
	
	
	//rutas de solo vistas principales
	app.use('/',rutasPrincipales);
	// rutas de productos 
	app.use('/productos', rutasDeProductosDB);
	// rutas de usuarios 
	app.use('/usuarios', rutasUsuarios);
	// ruta de swagger
	app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
	//------------------rutas------------------	


	//------------------entry point------------------	
	//configuracion de puerto
	app.set('port', process.env.PORT || 4000 );
	
	//configuracion de ruta de acceso al servidor 
	app.listen(app.get('port'), ()=>{
		console.log(`El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:${app.get('port')} , para detener preciona Ctrl + C`);
	});
	//------------------entry point------------------	
