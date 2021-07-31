function authMiddleware(req, res, next) {

    if(!req.session.usuarioLogeado){
        //si alguien no esta logueado
        return res.redirect('/usuarios/loginUsuario');
    }
    next();
}

module.exports =  authMiddleware;