const fs = require('fs');
//para aliminar archivos
const fs2 = require('fs').promises;
const path = require('path');
//para encriptacion de contrasña 
const bcryptjs = require('bcryptjs');


let modeloDeUsuarios = {
    aperturaDeArchivo: function () {
        //apertura de archivo
        let cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'../data/usuarios.json'),'utf-8');
        //conversion de objeto a cadena json
        let listaUsuarios = JSON.parse(cadenaJsonA);

        return listaUsuarios;
    },
    escrituraDeArchivo: function (listaUsuarios) {
        //conversion de objeto a cadena json
        let cadenaJsonE = JSON.stringify(listaUsuarios,null, 2);
        //escritura de archivo
        fs.writeFileSync(path.resolve(__dirname,'../data/usuarios.json'),cadenaJsonE); 
        
    },
    estructurarObjeto: function (req) {

        let fecha = new Date();
 
        //para obtener la fecha con formato 
        const map = {
             dd: fecha.getDate(),
             mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
             yy: fecha.getFullYear().toString().slice(-2),
             yyyy: fecha.getFullYear()
        }

        /*---------------- para un solo archivo ------------ */
        let nombreImagen = '';
            
        if(req.file){
            nombreImagen = req.file.filename;
        }else{
        
            nombreImagen = null;
        }    
        /*---------------- para un solo archivo ------------ */

        /*---------------- enriptacion de password ------------ */
        passEncriptada = bcryptjs.hash(req.body.password,12);
        /*---------------- enriptacion de password ------------ */


        let userTmp = {
            id: parseInt(Math.random() * (100000 - 1) + 1),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passEncriptada,//hashsear contraseña
            category: req.body.category,
            image: nombreImagen,
            registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
            checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
        };

        return userTmp;
    },
    buscarUsuario: function (listaUsuarios, req) {
        let usuarioEncontrado = listaUsuarios.find( (usuario) => {
            return usuario.id == parseInt(req.params.id);
        });

        return usuarioEncontrado;
    },
    //aun hcer metodo para burcar por email bien por que no funciona 
    buscarUsuarioByMail: function (listaUsuarios, req) {
        let usuarioEncontrado = listaUsuarios.find( (usuario) => {
            return usuario.email == req.params.email;
        });

        return usuarioEncontrado;
    },
    buscarIndice: function (listaUsuarios, req) {
        let indice = listaUsuarios.findIndex( (usuario) => {
            return usuario.id == parseInt(req.params.id);
        });

        return indice;
    },
    eliminarArchivoImagen: function (nombreImagen) {

        let rutaImagen = path.join(__dirname,'../public/images/imagenesUsuarios/'+nombreImagen);

         //console.log(rutaImagen);
         fs2.unlink(rutaImagen).then( ()=>{
            console.log('Se elimino archivo de imagen... al actuliar datos');
         }).catch( err =>{
            console.error('No se pudo eliminar el archivo no exite',err);
         });
        
    }
    
};

module.exports = modeloDeUsuarios;