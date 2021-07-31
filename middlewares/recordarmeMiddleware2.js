const modeloDeUsuarios = require('../models/modeloDeUsuarios'); 

function recordarmeMiddleware(req, res, next) {
   

    //para verificar que hay un cookie llamada recordarme y no se encuentra no definida 
    //el nombre debe ser igual a como se nombro en el controlador 
    // y que el usuario logeado no se enduentra como no difinido
    if(req.cookies.recordarme != undefined && req.session.usuarioLogeado ==  undefined ){

        //apertura de archivo
		let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();

		//burcar usuario
		// let usuarioEncontrado = modeloDeUsuarios.buscarUsuario(listaUsuarios, req);

		//verificacion y comparacion de datos de que exita persona buscada
		let usuarioALogeado;

		for (let i = 0; i < listaUsuarios.length; i++) {
			if(listaUsuarios[i].id == req.cookies.recordarme){
				console.log("------"+listaUsuarios[i].id);
				
				usuarioALogeado = listaUsuarios[i];
				break;
	
			}
		}

    	//console.log(usuarioALogeado);

        req.session.usuarioLogeado = usuarioALogeado;

		// como abrir la sesion en vista 
		// https://stackoverflow.com/questions/45832908/can-i-access-cookie-from-ejs-page-in-server-side-not-the-browser-side
		// res.locals.user = req.session.usuarioLogeado;
        //console.log(">>>>>>"+req.session.usuarioLogeado.email);

    }
	next();

}

module.exports =  recordarmeMiddleware;