// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = require("../config.js");

const modeloDeUsuarios = require('../models/modeloDeUsuarios'); 

//passportJWT
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {

  // apertura de archivo donde se encuentran los usuarios
  let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();


  var strategy = new Strategy(params, function(payload, done) {
    // console.log("---------")
    // console.log(payload)
    // console.log("---------")
    const usuarioEncontrado = modeloDeUsuarios.buscarUsuariowithJwt(listaUsuarios, payload);

    if (!usuarioEncontrado) {
        //si usuario no es encontradp
        return done(new Error("Usuario no encontrado"), null);
    } else if(payload.expire<=Date.now()) {
        //si ya exprido el token
        return done(new Error("TokenExpired"), null);
    } else {
        //si usuario es encontrado 
        return done(null, {
            id: usuarioEncontrado.id
        });
    }
    
            // var user = User.findById(payload.id, function(err, user) {
            //                             if (err) {
            //                                 return done(new Error("UserNotFound"), null);
            //                             } else if(payload.expire<=Date.now()) {
            //                                 return done(new Error("TokenExpired"), null);
            //                             } else{
            //                                 return done(null, user);
            //                             }
            //                         });
    });

  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };

};