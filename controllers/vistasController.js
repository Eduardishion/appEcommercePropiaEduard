const productosController ={
    vistaIndex: (req, res) => {
        res.render('Index');
    },
    vistaDetalleProducto: (req , res) => {
        res.render('DetalleProducto');
    },
    vistaCarritoCompra: (req, res) => {
        res.render('CarritoCompra');
    },
}

module.exports = productosController;