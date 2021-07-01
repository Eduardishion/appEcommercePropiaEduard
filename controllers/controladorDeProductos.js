//modelo de productos
const modeloDeProductos = require('../models/modeloDeProductos');

const controladorDeProductos = {
    vistaRegistrarProducto: (req, res) => {
      res.render("registrarProducto");
    },
    vistaDetalleProducto: (req, res) => {

      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();
      
      //busqueda de producto
      let productoEncontrado = buscarProducto(listaProductos, req);

      //verificacion de no estar vacio 
      if(productoEncontrado != null){
        res.render("DetalleProducto", { producto : productoEncontrado });
      }else{
        res.send("producto no encontrado...");
      }

    },
    viewShoppingCart: (req, res) => {
      res.render("shoppingCart");
    },
    guardarProducto: (req, res) => {

      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();

      //creacion de objeto temporal 
      let productoTmp = modeloDeProductos.estructurarObjeto(req);

      //objeto a insertar en archivo o base de datos 
      listaProductos.push(productoTmp);
      
      //escritura de archivo
      modeloDeProductos.escrituraDeArchivo(listaProductos);

      //retorno a crear otro producto
      res.redirect('registrarProducto');
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
        res.render('editarProducto', { producto: productoEncontrado });
      }else{
        res.send("producto no encontrado...");
      }

    },
    actulizaProducto:(req, res)=>{

      //apertura de archivo
      let listaProductos = modeloDeProductos.aperturaDeArchivo();

      //busqueda de producto
      let productoEncontrado = modeloDeProductos.buscarProducto(listaProductos, req);

      if(productoEncontrado != null){

        //crear objeto temporal
        let productTmp = modeloDeProductos.estructurarObjeto(req);

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
        res.send("producto no encontrado...");
      }

    }
    ,eliminaProducto(req, res){

        //apertura de archivo
        let listaProductos = modeloDeProductos.aperturaDeArchivo();

        // buscauada de indice
        let indice = modeloDeProductos.buscarIndice(listaProductos, req);

        if(indice != -1){

          //eliminacion del producto de la lista 
          listaProductos.splice(indice, 1);

          //escritura de archivo
          modeloDeProductos.escrituraDeArchivo(listaProductos);
          
          //redireccion a editar productos
          res.render('listaProductos', {  productos : listaProductos} );

        }else{
          res.send("producto no encontrado...");
        } 
    },
}
  
module.exports = controladorDeProductos;