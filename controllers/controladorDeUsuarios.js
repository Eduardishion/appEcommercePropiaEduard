const modeloDeUsuarios = require('../models/modeloDeUsuarios'); 
//destructuracion para usar objeto validator 
const {validationResult} = require('express-validator');
//modulo para encriptacion y desencriptacion de contraseñas
const bcryptjs = require('bcryptjs');
//conexion a la base de datos
const db = require('../database/models');

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

            //para verificar si existe el usuario por medio de email 
            let usuarioEncontradoByMail = modeloDeUsuarios.buscarUsuarioByMail(listaUsuarios, req);

            
            if (usuarioEncontradoByMail === undefined){

                console.log('Ese email no exite en la base de datos, se puede registar como un nuevo usuario');
                //en caso de que  no exite ese email en la base de datos hacemos los pasos 
                //normales de insertar el usuario en la base de datos 
               
      
                //creacion de objeto temporal 
                let usuarioTmp = modeloDeUsuarios.estructurarObjeto(req);
        
                //objeto a insertar en archivo o base de datos 
                listaUsuarios.push(usuarioTmp);
                
                //escritura de archivo
                modeloDeUsuarios.escrituraDeArchivo(listaUsuarios);


                res.render('loginUsuario');

                //busqueda de usuario
                // let usuarioEncontrado = modeloDeUsuarios.buscarUsuario(listaUsuarios, req);
          
                // //verificacion de no estar vacio 
                // if(usuarioEncontrado != null){
                //   res.render("loginUsuario");
                // }else{
                //   res.render("not-found");
                // }
                //retorno a lista de usuarios
                //res.status(200);
                //tiene que redirigir al perfil de usuario 
                //res.render('listaUsuarios',{ usuarios : listaUsuarios } );

            }else{

              // console.log('Ese email si exite no puedes registrate con el mismo email ingresa otro por favor');
              const mensaje =  'Ese email si exite no puedes registrate con el mismo email ingresa otro por favor';
              //caso de que si exista ese email volvemos al formulario de registro 
              //indicando que no podemos guardar ese usuario ya que el email ya a sido usado 
              //y regresamos a la lista de usuarios 
              res.render('registrarUsuario', { msgsErrors : mensaje, DataOld : req.body } );

              // res.render('registrarUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body } );

            }

        }else{

          res.render('registrarUsuario', { msgsErrors : errores.mapped(), DataOld : req.body } );

        }
  
        //----------validacion de datos de entrada---------------------
  
      },
      listaDeUsuarios: (req, res) => {
        //apertura de archivo
        let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
        
        //para ver la cookies
        //console.log(req.cookies.recordarme);

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
      verificaSesion: async (req, res) =>{

          //----------validacion de datos de entrada---------------------

        let errores = validationResult(req);

  
        //para verificar si no exiten errores
        //if(errores.length > 0){  //otra forma de hacerlo 
        if(errores.isEmpty()){
            
            //apertura de archivo
            let listaUsuarios = modeloDeUsuarios.aperturaDeArchivo();
          
            //para verificar si existe el usuario por medio de email 
            let usuarioEncontradoByMail = modeloDeUsuarios.buscarUsuarioByMail(listaUsuarios, req);


            if (usuarioEncontradoByMail !== undefined){

              console.log('Ese email si exite en la base de datos, le damos acceso ');
              //en caso de que si  exite ese email en la base de datos verificamos su contraseña coinside
      
              //verificacion y comparacion de datos de que exita persona buscada
              let usuarioALogeado = null;

            
              // comparacion de hash encriptado y verificar qu coinside  
              if(bcryptjs.compareSync(req.body.password, usuarioEncontradoByMail.password)){
           
                // console.log(usuarioEncontradoByMail.email);
                // console.log(usuarioEncontradoByMail.password);
                usuarioALogeado = usuarioEncontradoByMail;
                // console.log(usuarioALogeado);

                //antes de redireccionar quitar la password por seguridad al entrar al profile 
                delete usuarioALogeado.password;


                //varable de session que permite usarla de manera global en todas las vistas y en toda la aplicacion
                req.session.usuarioLogeado = usuarioALogeado;


                //en caso de que se halla deseado guardar session y ser recordado al cerrar el navegador 
                //desde la vista hay que verificarlo 

                //para verificar que el checkbox de la vista esta tildado o no
                if(req.body.recordarme != undefined){
                  //recordar no podemos almacenar mucha informacion asi que, lo recomendable es guardarla informacion 
                  // mas importante para identificar de unuevo al usuario 
                  //en este caso usaremos email 
                  //pero para ser mas exacto serai recomendable usar el ID del usuario 


                  //CREAR COOKIE CON DATOS
                  //otro parametro es que debemos mandar un objeto literal que seran como configuraciones para la cookie 
                  // en este ejemplo cuando tiempo que queremos que dure la cookie
                  // en este ejemplo 6 segundos 
                  //(1000 * 60) * 1 conversion para convertir en minutos 1 significa 1 minuto, al poner 60 seria una hora 
                  res.cookie('recordarme', usuarioALogeado.id, {maxAge : (1000 * 60) * 60});
                }

                // mandamos a la vista que deseamos ingresar despues de ser logeado 
                // enviar sesion a vista 
                // https://www.it-swarm-es.com/es/node.js/como-obtener-el-valor-de-la-sesion-en-ejs/824451350/

                // let userSesion = req.session.usuarioLogeado;
                // res.render('index', { user : userSesion });

                // res.render('catalogo',{session: req.session});

                
                // console.log(req.session);
                // res.render('perfilDeUsuario', {session: req.session.usuarioLogeado} );
                // res.redirect('perfilDeUsuario');
                
                const productos = await db.product.findAll({
                    include:[{
                        association: 'image',
                    }]
                }).catch((error) => {
                  console.log('Hubo un error al intentar conectar a a base de datos: '+ error);
                });
                
                //mandar y recetear variables locales a la vista 
                //para identidicar que el usuario esta correcta mente logeado 
                res.locals.estaLoguado = true;
                res.locals.usuarioLogeado = usuarioALogeado;

                res.render("Index", {productos});
                
              }else{
                res.render('loginUsuario', { msgsErrors : errores.mapped(), errorValidacion: 'La información esta incorrecta. Por favor intenta de nuevo.' } );
              }

            }else{

              console.log('Ese email no exite en la base de datos, no le damos acceso ');

              //caso de que si exista ese email volvemos al formulario de registro 
              //indicando que no podemos guardar ese usuario ya que el email ya a sido usado 
              //y regresamos a la lista de usuarios 
              res.render('loginUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body, errorValidacion: 'No se encuentra este email en nuestra base de datos' } );
                
        
            }
    
        }else{

          res.render('loginUsuario', { msgsErrors : errores.mapped(), DataOld  : req.body } );

        }
  
        //----------validacion de datos de entrada---------------------

      },
      vistaPerfilDeUsuario(req, res){
        // pare ver session 
        // console.log(req.session);

        res.status(200);
        res.render("perfilDeUsuario");
      },
      cierreSession(req, res){
        // cierre de session 
        //se destruye sesion 
        req.session.destroy();

        res.clearCookie("recordarme");

        //debemos destruir tambien cookie 
        res.redirect('/');
      }
      
  }


module.exports = usuariosController;