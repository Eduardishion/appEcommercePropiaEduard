const modeloDeUsuarios = require('../models/modeloDeUsuarios'); 

function validarUsuarioExitenteMiddleware(req, res, next) {
    //apertura de archivo
	let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
    
    const usuarioEncontrado = listaUsuarios.find(usuario =>{
         return usuario.email == req.body.email
    });

    if (usuarioEncontrado){
        
    }

    next();
}

module.exports =  validarUsuarioExitenteMiddleware;