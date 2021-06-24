	//librerias nativas necesarias
	const express = require('express'); 
	//rutas de operaciones CRUD de productos
	const rutasVistas = require('./routes/rutasVistas');
	//componente para poder hacer peticiones put y delete
	const methodOverride = require('method-override');


	//------------objeto servidor------------------
	//objeto servidor 
	const app = express();
		//------------objeto servidor------------------
	
	//------------------midwares------------------

	//carpeta publica de archivos estaticos 
	app.use(express.static('./public'));
	
	// cofiguracion para usar  view engine EJS
	app.set('view engine','ejs');

	//para poder capturar datos de formularios POST
	app.use(express.urlencoded({extended:false}));
	app.use(express.json());

	// configurar los metodos delete y put con method-override 
	app.use(methodOverride('_method'));

	//------------------midwares------------------
	

	//------------------rutas------------------
	// rutas de productos 
	app.use('/', rutasVistas);
	//------------------rutas------------------	


	//------------------entry point------------------	
	//configuracion de puerto
	app.set('port', process.env.PORT || 3000 );
	
	//configuracion de ruta de acceso al servidor 
	app.listen(app.get('port'),()=>{
	console.log(`El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:${app.get('port')} , para detener preciona Ctrl + C`);
	});
	//------------------entry point------------------	
