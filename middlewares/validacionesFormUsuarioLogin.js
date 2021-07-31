
//modulo express validator 
const {body} = require('express-validator');
const path = require('path');

//express validator
const validacionesFormUsuarioLogin = [

    body('email').notEmpty().withMessage('El campo email no debe estar vacio')
    ,
    body('password').notEmpty().withMessage('El campo password  no debe estar vacio')
    
    
];

module.exports = validacionesFormUsuarioLogin;