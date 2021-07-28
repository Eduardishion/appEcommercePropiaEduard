const modeloDeUsuarios = require('../models/modeloDeUsuarios'); 
//destructuracion para usar objeto validator 
const {validationResult} = require('express-validator');


const usuariosController ={
      loginUsuario:(req, res) => {
        res.status(200);
        res.render("loginUsuario");
      },
      vistaRegistrarUsuario: (req, res) => {
        res.status(200);
        res.render("registrarUsuario");
      },
      vistaDetalleUsuario: (req, res) => {
   
        //apertura de archivo
        let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
        
        //busqueda de usuario
        let usuarioEncontrado = modeloDeUsuarios.buscarUsuario(listaUsuarios, req);
  
        //verificacion de no estar vacio 
        if(usuarioEncontrado != null){
          res.render("DetalleUsuario", { producto : usuarioEncontrado });
        }else{
          res.render("not-found");
        }
  
      },
      guardarUsuario: (req, res) => {
  
        //----------validacion de datos de entrada---------------------

        let errores = validationResult(req);

  
        //para verificar si no exiten errores
        //if(errores.length > 0){  //otra forma de hacerlo 
        if(errores.isEmpty()){
            
            


            //apertura de archivo
            let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();

            let usuarioEncontradoByMail = modeloDeUsuarios.buscarUsuarioByMail(listaUsuarios, req);


            if(!usuarioEncontradoByMail){
                //en caso de que  no exite ese email en la base de datos hacemos los pasos 
                //normales de insertar el usuario en la base de datos 
               
      
                //creacion de objeto temporal 
                let usuarioTmp = modeloDeUsuarios.estructurarObjeto(req);
        
                //objeto a insertar en archivo o base de datos 
                listaUsuarios.push(usuarioTmp);
                
                //escritura de archivo
                modeloDeUsuarios.escrituraDeArchivo(listaUsuarios);
      
                //retorno a lista de usuarios
                res.status(200);
                res.render('listaUsuarios',{ usuarios : listaUsuarios } );
              
            }else{

                //caso de que si exista ese email volvemos al formulario de registro 
              //indicando que no podemos guardar ese usuario ya el email ya a sido usado 
              //y regresamos a la lista de usuarios 
              res.render('registrarUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body } );
               
            }
  
            
  
        }else{

          res.render('registrarUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body } );

        }
  
        //----------validacion de datos de entrada---------------------
  
      },
      listaDeUsuarios: (req, res) => {
        //apertura de archivo
        let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
  
        //envio de datos a vista index
        res.render('listaUsuarios', { usuarios: listaUsuarios});
      },
      vistaEdicionUsuario:(req, res)=>{
        //apertura de archivo
        let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
  
        //busqueda de producto
        let usuarioEncontrado =  modeloDeUsuarios.buscarUsuario(listaUsuarios, req);
  
        //verificacion de no estar vacio 
        if(usuarioEncontrado != null){
          //si exiten errores de validacion se envian 
          res.render('editarUsuario', { usuario: usuarioEncontrado  });
        }else{
          res.render("not-found");
        }
  
      },
      actulizaUsuario:(req, res)=>{

        let errores = validationResult(req);

        if(errores.isEmpty()){
             //apertura de archivo
            let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
      
            //busqueda de producto
            let usuarioEncontrado = modeloDeUsuarios.buscarUsuario(listaUsuarios, req);
      
            if(usuarioEncontrado != null){ //este null creo sera mejor cambiarlo por undefined
      
                  //crear objeto temporal
                  let usuarioTmp = modeloDeUsuarios.estructurarObjeto(req);
          
                  let usuarioModificado={};
                  usuarioModificado = Object.assign(usuarioModificado, usuarioEncontrado, usuarioTmp);
          
                  //buscar indice
                  let indice = modeloDeUsuarios.buscarIndice(listaUsuarios, req);
          
                  listaUsuarios[indice] = usuarioModificado;
          
                  //escritura de archivo
                  modeloDeUsuarios.escrituraDeArchivo(listaUsuarios);
          
                  //apertura de archivo
                  listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
                  
          
                  //redireccion a editar productos
                  res.render('listaUsuarios', {usuarios : listaUsuarios} );
          
              }else{
                  res.status(404);
                  res.render("not-found");
              }

            }else{
                res.render('editarUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body } );
            }
      
          
  
      },
      eliminaUsuario(req, res){
  
          //apertura de archivo
          let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
  
          // buscauada de indice
          let indice = modeloDeUsuarios.buscarIndice(listaUsuarios, req);
  
          if(indice != -1){
  
            //eliminacion de imagen previamente cargada y no exista despues de ser eliminada
            //una imagen 
            modeloDeUsuarios.eliminarArchivoImagen(listaUsuarios[indice].image);
  
            //eliminacion del producto de la lista 
            listaUsuarios.splice(indice, 1);
  
            //escritura de archivo
            modeloDeUsuarios.escrituraDeArchivo(listaUsuarios);
            
            //redireccion a editar productos
            res.render('listaUsuarios', {  usuarios : listaUsuarios} );          
            
          }else{
            res.render("not-found");
          } 
      },
  }


module.exports = usuariosController;