const fs = require('fs');
const path = require('path');

// apertura de datos de archivo JSON
const  dataFile = fs.readFileSync(path.resolve(__dirname,'apiProductos15.json'));
const productosDB = JSON.parse(dataFile);


const productosController = {
  mostrarListaDeProductos: (req, res) => {
    res.render("Index", { productos: productosDB });
  },
  mostrarDetalleDeProducto: (req, res) => {
    let id = parseInt(req.params.id);

    let indice = productosDB.findIndex((producto) => {
      return producto.id == id;
    });

    if (indice != -1) {
    	productoTmp = productosDB[indice];
    	res.render("DetalleProducto", { producto: productoTmp });
    }else{
		res.send('producto no encontrado...');
	  }
  },
  vistaCrearProducto: (req, res) => {
    res.render("Registro");
  },
  // guardarProducto:(req, res) =>{
  // 	res.send('guardarProducto...');
  // },
  // entrarAvistaEdicionProducto:(req, res) =>{
  // 	res.send('guardarProducto...');
  // },
  // editarProducto:(req, res) =>{
  // 	res.send('editarProducto...');
  // },
  // eliminarProducto:(req, res) =>{
  // 	res.send('eliminarProducto...');
  // },
};


module.exports = productosController;