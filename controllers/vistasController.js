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
    vistaInicioSesion: (req, res) => {
        res.render('InicioSesion');
    },
    vistaRegistro: (req, res) => {
        res.render('Registro');
    },
}

module.exports = productosController;