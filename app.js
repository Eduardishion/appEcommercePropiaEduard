//librerias nativas necesarias
const express = require('express'); 
const path = require('path');

//objeto servidor 
const app = express();

//determinar la carpeta de archivos staticos
const publicPath = path.resolve(__dirname,'./public');
app.use(express.static(publicPath));


//enrutamiento de endpoints y midellwares
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/index.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/index.html'));
});
app.get('/DetalleProducto.html', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/DetalleProducto.html'));
});
app.get('/CarritoCompra.html', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/CarritoCompra.html'));
});

//configuracion de ruta de acceso al servidor 
//onst PORT = process.env.port  || 3030;
app.listen(3000,()=>{
    console.log("El servidor se ha inicialiado..., puedes acceder a al mediante http://localhost:3000/, para detener preciona Ctrl + C");
});
