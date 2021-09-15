
//modulo express validator 
const {body} = require('express-validator');
const path = require('path');

//express validator
const validacionesFormUsuario = [

    body('firstName').notEmpty().withMessage('El campo nombre no debe estar vacio')
    ,
    body('lastName').notEmpty().withMessage('El campo apellido  no debe estar vacio')
    ,
    body('email').notEmpty().withMessage('El campo email no debe estar vacio')
    ,
    body('password').notEmpty().withMessage('El campo password  no debe estar vacio')
    ,
    body('category').notEmpty().withMessage('El campo categoria  no debe estar vacio')
 
    ,
    body('imagenUsuario').custom((value , {req}) => {
        
        if(!req.file){
            throw new Error('No debes dejar vacio el campo de imagen...');
            return false;
        }else{
            let extencionesAceptadas = ['.jpg', '.png', '.webp', '.gif'];
            let fileExtension = path.extname(req.file.originalname);

            if(!extencionesAceptadas.includes(fileExtension)){
                throw new Error('La extención del archivo permitidas son .jpg, .png , .webp ');
                return false;
            }else{
                return true;
            }
        }    
 
        
    })
    
];

module.exports = validacionesFormUsuario;