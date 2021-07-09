
//modulo express validator 
const {body} = require('express-validator');
const path = require('path');

//express validator
const validacionesFormProducto = [

    //mas a detalle la validacion de una imagen 
    //https://express-validator.github.io/docs/
    //https://github.com/validatorjs/validator.js#validators
    //https://stackoverflow.com/questions/39703624/express-how-to-validate-file-input-with-express-validator
    //.bail() se usa para hacer mas de una validacion para el mismo campo 
    body('id').notEmpty().withMessage('El campo id no debe estar vacio').bail()
              .isInt({min : 1}).withMessage('Debe ser un numero entero positivo')  
    ,
    body('name').notEmpty().withMessage('El campo nombre no debe estar vacio')
    ,
    body('category').notEmpty().withMessage('El campo categoria  no debe estar vacio')
    ,
    body('price').notEmpty().withMessage('El campo precio  no debe estar vacio').bail()
                 .isFloat({min : 0.01}).withMessage('Debe ser un numero decimal o entero')
    ,
    body('discountRate').notEmpty().withMessage('El campo % de descuento no debe estar vacio').bail()
                        .isInt({min : 0}).withMessage('Debe ser un numero entero positivo ó 0')  
    ,
    body('stock').notEmpty().withMessage('El campo existencias no debe estar vacio').bail()
                            .isInt({min : 1}).withMessage('Debe ser un numero entero positivo') 
    ,
    body('features').notEmpty().withMessage('El campo caracteristicas no debe estar vacio')
    
    ,
    body('description').notEmpty().withMessage('El campo descripción no debe estar vacio')
    
    ,
    body('image').custom((value , {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
    
        if(!file){
            throw new Error('Debes cargar una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extenciones de archivo permitidas son: ${acceptedExtensions.join(',')}`);
            }
        }


        return true;
    })
    
    // .notEmpty().withMessage('El campo de imagen  no debe estar vacio'),
    
];

module.exports = validacionesFormProducto;