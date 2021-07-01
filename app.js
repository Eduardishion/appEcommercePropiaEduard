	//modulos nativas necesarias
	const express = require('express'); 
	const path = require('path'); 
	//modulos de terceros para  hacer peticiones put y delete
	const methodOverride = require('method-override');

	//rutas de operaciones CRUD para productos
	const rutasDeProductos = require('./routes/rutasDeProductos');
	//rutas a vistas principales
	const rutasPrincipales = require('./routes/rutasPrincipales');
	

	//------------objeto servidor------------------
	//objeto servidor 
	const app = express();
	//------------objeto servidor------------------
	
	//------------------midwares------------------

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

	//------------------midwares------------------
	
	
	//------------------rutas------------------
	// rutas de productos 
	app.use('/productos', rutasDeProductos);
	
	//rutas de solo vistas
	app.use('/',rutasPrincipales);
	// rutas de usuarios 
	// app.use('/usuarios', rutasUsuarios);
	
	//------------------rutas------------------	


	//------------------entry point------------------	
	//configuracion de puerto
	app.set('port', process.env.PORT || 3000 );
	
	//configuracion de ruta de acceso al servidor 
	app.listen(app.get('port'), ()=>{
		console.log(`El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:${app.get('port')} , para detener preciona Ctrl + C`);
	});
	//------------------entry point------------------	
