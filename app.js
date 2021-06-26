	//librerias nativas necesarias
	const express = require('express'); 
	const path = require('path'); 
	//rutas de operaciones CRUD de vistas
	//const rutasVistas = require('./routes/rutasVistas');
	//rutas de operaciones CRUD de productos
	const rutasProductos = require('./routes/rutasProductos');
	//rutas de operaciones CRUD de usuarios
	// const rutasUsuarios = require('./routes/rutasUsuarios');
	//componente para poder hacer peticiones put y delete
	const methodOverride = require('method-override');

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
	app.use('/', rutasProductos);
	// rutas de usuarios 
	// app.use('/usuarios', rutasUsuarios);
	//------------------rutas------------------	


	//------------------entry point------------------	
	// app.use((req,res,next) => {
	// 	res.status(404).render('not-found');
	// });
	
	//configuracion de puerto
	app.set('port', process.env.PORT || 3000 );
	
	//configuracion de ruta de acceso al servidor 
	app.listen(app.get('port'), ()=>{
		console.log(`El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:${app.get('port')} , para detener preciona Ctrl + C`);
	});
	//------------------entry point------------------	
