	//librerias nativas necesarias
	const express = require('express'); 
	const path = require('path');
	
	//objeto servidor 
	const app = express();
	
	//determinar la carpeta de archivos staticos
	const publicPath = path.resolve(__dirname,'./public');
	app.use(express.static(publicPath));
	// 
	
	
	//enrutamiento de endpoints y midellwares
	app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname,'./views/index.html'));
	});
	app.get('/index', (req, res) => {
	res.sendFile(path.resolve(__dirname,'./views/index.html'));
	});
	app.get('/DetalleProducto', (req, res) => {
	res.sendFile(path.resolve(__dirname,'./views/DetalleProducto.html'));
	});
	app.get('/CarritoCompra', (req, res) => {
	res.sendFile(path.resolve(__dirname,'./views/CarritoCompra.html'));
	});

//configuracion de puerto
	app.set('port', process.env.PORT || 3000 );
	
	//configuracion de ruta de acceso al servidor 
	app.listen(app.get('port'),()=>{
	console.log(`El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:${app.get('port')} , para detener preciona Ctrl + C`);
	});
	
