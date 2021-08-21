//modelo de productos
const modeloDeProductos = require('../models/modeloDeProductos');
//destructuracion para usar objeto validator 
const {validationResult} = require('express-validator');
//conexion a la base de datos
const db = require('../database/models');


const controladorDeProductos = {
    test: (req, res) => {
        db.Movie.findAll().then((peliculas) => {
          // console.log(peliculas);
          return res.json(peliculas);
        });
      
    },
    viewApi: async (req, res) => {
      // db.Products.findAll().then( Products => {
      //     //endpoint del api para cosultar todos los datos 
      //     // return res.json(movies);
      //     // return res.status(200).json({
      //     //     total : Products.length,
      //     //     data: Products,
      //     //     status: 200
      //     // });
          
      //     res.render("Index", {productos: Products});
      // })

      const products = await db.Products.findAll();
      res.render("Index", {products});

      // res.render("Index", {productos: products});
    },
    vistaCatalogo: (req, res) => {
      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();
      // console.log(listaProductos);
      //envio de datos a vista index
      res.render("Index", { productos: listaProductos});

    },
    vistaRegistrarProducto: (req, res) => {
      res.status(200);
      res.render("registrarProducto");
    },
    vistaDetalleProducto: (req, res) => {
 
      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();
      
      //busqueda de producto
      let productoEncontrado = modeloDeProductos.buscarProducto(listaProductos, req);

      //verificacion de no estar vacio 
      if(productoEncontrado != null){
        res.render("DetalleProducto", { producto : productoEncontrado });
      }else{
        res.render("not-found");
      }

    },
    viewShoppingCart: (req, res) => {
      res.render("CarritoCompra");
    },
    guardarProducto: (req, res) => {

      //----------validacion de datos de entrada---------------------
      console.log(req.body);
      console.log(req.file);
      let errores = validationResult(req);
      console.log(errores);
      //console.log(errores.array());


      //para verificar si no exiten errores
      //if(errores.length > 0){  //otra forma de hacerlo 
      if(errores.isEmpty()){
          
          //apertura de archivo
          let listaProductos = modeloDeProductos.aperturaDeArchivo();

          //creacion de objeto temporal 
          let productoTmp = modeloDeProductos.estructurarObjetoPOST(req);

          //objeto a insertar en archivo o base de datos 
          listaProductos.push(productoTmp);
          
          //escritura de archivo
          modeloDeProductos.escrituraDeArchivo(listaProductos);

          //retorno a crear otro producto
          res.status(200);
          res.render('listaProductos',{ productos : listaProductos });

      }else{

    

        //res.status(200);
        //https://www.samanthaming.com/tidbits/76-converting-object-to-array/
        //Object.keys(errores) es para convertir de un los valores de objeto en arreglo
        //res.send('registrarProducto', { msgsErrors : Object.entries(errores) } );
        
        //res.render('registrarProducto', { msgsErrors : errores.array() } , { old : req.body } );
        //res.render('registrarProducto', { msgsErrors : Object.entries(errores) } );

        // res.render('registrarProducto', { msgsErrors : errores.array(), DataOld : req.body } );
        //mapped() convierte el array en un objeto literal 
        res.render('registrarProducto', { msgsErrors : errores.mapped(), DataOld  : req.body } );// otra forma de hacerlo 

        //res.render('registrarProducto', { msgsErrors : errores.array(), DataOld  : req.body } );// otra forma de hacerlo 
      }

      //----------validacion de datos de entrada---------------------

    },
    listaDeProductos: (req, res) => {
      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();

      //envio de datos a vista index
      res.render('listaProductos', { productos: listaProductos});
    },
    vistaEdicionProducto:(req, res)=>{
      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();

      //busqueda de producto
      let productoEncontrado =  modeloDeProductos.buscarProducto(listaProductos, req);

      //verificacion de no estar vacio 
      if(productoEncontrado != null){
        //si exiten errores de validacion se envian 
        res.render('editarProducto', { producto: productoEncontrado  });
      }else{
        res.render("not-found");
      }

    },
    actulizaProducto:(req, res)=>{


      let errores = validationResult(req);

      if(errores.isEmpty()){
          //apertura de archivo
          let listaProductos = modeloDeProductos.aperturaDeArchivo();

          //busqueda de producto
          let productoEncontrado = modeloDeProductos.buscarProducto(listaProductos, req);

          if(productoEncontrado != null){

            //crear objeto temporal
            //let productTmp = modeloDeProductos.estructurarObjetoPUT(req, productoEncontrado.image);
            let productTmp = modeloDeProductos.estructurarObjetoPUT(req, productoEncontrado.image, productoEncontrado.imagesSec);

            let productoModificado={};
            productoModificado = Object.assign(productoModificado, productoEncontrado, productTmp);

            //buscar indice
            let indice = modeloDeProductos.buscarIndice(listaProductos, req);

            listaProductos[indice] = productoModificado;

            //escritura de archivo
            modeloDeProductos.escrituraDeArchivo(listaProductos);

            //apertura de archivo
            listaProductos = modeloDeProductos.aperturaDeArchivo();
            

            //redireccion a editar productos
            res.render('listaProductos', {productos : listaProductos} );

          }else{
            res.render("not-found");
          }

      }else{
        res.render('editarProducto', { msgsErrors : errores.mapped(), DataOld  : req.body } );// otra forma de hacerlo 
      }
      

    }
    ,eliminaProducto(req, res){

        //apertura de archivo
        let listaProductos = modeloDeProductos.aperturaDeArchivo();

        // buscauada de indice
        let indice = modeloDeProductos.buscarIndice(listaProductos, req);

        if(indice != -1){

          //eliminacion de imagen previamente cargada y no exista despues de ser eliminada
          //una imagen 
          modeloDeProductos.eliminarArchivoImagen(listaProductos[indice].image);

          //multi imagen 
          for(let i= 0 ; i< listaProductos[indice].imagesSec.length ;i++){
            modeloDeProductos.eliminarArchivoImagen(listaProductos[indice].imagesSec[i]);
          }

          //eliminacion del producto de la lista 
          listaProductos.splice(indice, 1);

          //escritura de archivo
          modeloDeProductos.escrituraDeArchivo(listaProductos);
          
          //redireccion a editar productos
          res.render('listaProductos', {  productos : listaProductos} );          
          
        }else{
          res.render("not-found");
        } 
    },
}
  
module.exports = controladorDeProductos;