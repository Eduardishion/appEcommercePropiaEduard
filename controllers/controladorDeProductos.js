//modelo de productos
const modeloDeProductos = require('../models/modeloDeProductos');
//destructuracion para usar objeto validator 
const {validationResult} = require('express-validator');

const controladorDeProductos = {
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
      let errores = validationResult(req);

      console.log("------------>"+typeof errores)

      //para verificar si no exiten errores
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
          res.redirect('listaProductos');

      }else{
        //res.status(200);
        //https://www.samanthaming.com/tidbits/76-converting-object-to-array/
        //Object.keys(errores) es para convertir de un los valores de objeto en arreglo
        //res.send('registrarProducto', { msgsErrors : Object.entries(errores) } );
        console.log(errores.array())
        res.render('registrarProducto', { msgsErrors : errores.array() } );
        //res.render('registrarProducto', { msgsErrors : Object.entries(errores) } );
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

      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();

      //busqueda de producto
      let productoEncontrado = modeloDeProductos.buscarProducto(listaProductos, req);

      if(productoEncontrado != null){

        //crear objeto temporal
        let productTmp = modeloDeProductos.estructurarObjetoPUT(req, productoEncontrado.image);

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

    }
    ,eliminaProducto(req, res){

        //apertura de archivo
        let listaProductos = modeloDeProductos.aperturaDeArchivo();

        // buscauada de indice
        let indice = modeloDeProductos.buscarIndice(listaProductos, req);

        if(indice != -1){

          //eliminacion de imagen previamente cargada y no exista despues de ser eliminada
          modeloDeProductos.eliminarArchivoImagen(listaProductos[indice].image);

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