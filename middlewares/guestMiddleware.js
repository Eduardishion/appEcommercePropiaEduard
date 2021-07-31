function guestMiddleware(req, res, next) {

    if(req.session.usuarioLogeado){
        //si alguien ya esta logueago mando a su profile  del usuario
        // return res.redirect('/usuarios/perfilDeUsuario');
        return res.render('perfilDeUsuario');
        // return res.render('perfilDeUsuario', {session: req.session.usuarioLogeado} );
        // res.redirect('perfilDeUsuario');
    }
    next();

}

module.exports =  guestMiddleware; 