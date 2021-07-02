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
      let productoEncontrado = modeloDeProductos.buscarProducto(listaProductos, req);

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


      // ---------validacion de imagen---------------

      //validacion de llegada de archivo imagen o no 
        //req.file para ver las propiedades

        // let imageFile = req.file;
        // if(imageFile !== underfined){

        // }else{
        //     console.log("no se cargo la imagen adecuadamente...");
        //      por i no llegus la imagen podemos volver a renderiar el formulario
        // }    

        //cuando no se cargue la imagen podemos enviar un por default para que se
        //cargue aun asi cuando no se cargo la imagen 

        //let nombreImagen = req.file !== underfined ? req.files[0].filename : null ;

        // let nombreImagen = '';
        
        // if(req.files){ // si existe 
        //     console.log(req.files[0].filename);
        //     console.log(req.files);
        //     console.log("si se cargo imagen ");
        //     nombreImagen = req.files[0].filename;
        // }else{
        //     console.log("no se cargo imagen ");
        //     nombreImagen = null;
        // }


        //validacion de imagen si exite nombra la imagen, si no coloca el campo en null
        // nombreImagen = req.file ? req.files[0].filename : null;

       // ---------validacion de imagen---------------


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
        
        //eliminacion de imagen previamente cargada y no exista despus de ser actualisada con nueva imagen
        modeloDeProductos.eliminarArchivoImagen(productoEncontrado.image);

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

          //eliminacion de imagen previamente cargada y no exista despues de ser eliminada
          modeloDeProductos.eliminarArchivoImagen(listaProductos[indice].image);

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