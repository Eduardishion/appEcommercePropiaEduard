const fs = require('fs');
//para aliminar archivos
const fs2 = require('fs').promises;
const path = require('path');

let modeloDeProductos = {
    
    aperturaDeArchivo: function () {
        //apertura de archivo
        let cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'productos.json'),'utf-8');
        //conversion de objeto a cadena json
        let listaProductos = JSON.parse(cadenaJsonA);

        return listaProductos;
    },
    escrituraDeArchivo: function (listaProducts) {
        //conversion de objeto a cadena json
        let cadenaJsonE = JSON.stringify(listaProducts,null, 2);
        //escritura de archivo
        fs.writeFileSync(path.resolve(__dirname,'productos.json'),cadenaJsonE); 
        
    },
    estructurarObjetoPOST: function (req) {
        
       let fecha = new Date();

       //para obtener la fecha con formato 
       const map = {
            dd: fecha.getDate(),
            mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
       }

        // muestreo de datod principales 
        // console.log(req.body.id);
        // console.log(req.body.name);
        // console.log(req.body.category);
        // console.log(req.body.price);
        // console.log(req.body.discountRate);
        // console.log(req.body.stock);
        // console.log(req.body.features);
        // console.log(req.body.description);
        // console.log(req.body.image);
        // console.log(req.body.userWhoRegistered);
        
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
            //     // console.log(req.files[0].filename);
            //     // console.log(req.files);

            //     nombreImagen = req.files[0].filename;
            //     console.log("si se cargo imagen ");
            // }else{
                
            //     nombreImagen = null;
            //     console.log("no se cargo imagen ");
            // }


            //validacion de imagen si exite nombra la imagen, si no coloca el campo en null
            // nombreImagen = req.file ? req.files[0].filename : null;

            
            // console.log(req.files[0].filename); // para usar con any
            // console.log(req.file.filename); //para usar con single
            // console.log(req.file.image);

            //como cargar imagen y actuliarla
            //https://www.it-swarm-es.com/es/node.js/cargue-la-imagen-y-luego-actualice-con-multer-y-express.js/805521310/
            //para validar que exite una imagen desde el formulario
            
            /*---------------- para un solo archivo ------------ */
            let nombreImagen = '';
            //if(req.file !== underfined){
            //si exite el archivo 
            if(req.file){
                console.log("--------->"+req.file.filename); //para usar con single
                nombreImagen = req.file.filename;
            }else{
            //si no exite el archivo 
                nombreImagen = null;
                // console.log("no se cargo la imagen adecuadamente... se pondra una por default");
            }    
            /*---------------- para un solo archivo ------------ */

            /*---------------- para un multiples archivos ------------ */

            // let nombreImagen = null; 
            // let nombresImagenesSecundarias = [];
            // if(req.files){
            // //si existen archivos 
            // //https://codingshiksha.com/javascript/how-to-upload-multiple-files-in-multiple-form-fields-in-node-js-and-express-using-multer-library-full-example-for-beginners/
                

            //     //imagen principal 
            //     nombreImagen = req.files.imageProducto[0].filename;
            //     //imagenes secundarias
            //     req.files.imageSecundariasProducto.forEach(nombreImagen => {
            //         nombresImagenesSecundarias.push(nombreImagen.filename);
            //     });

            //     console.log("files uploaded");
                
            // }else{
            // //si no existen archivos 
            //     nombreImagen = null;
            //     nombresImagenesSecundarias= [];

            //     console.log("no files uploaded");
            // }    
            
            /*---------------- para un multiples archivos ------------ */


          
          // ---------validacion de imagen---------------

        
        //creacion de objeto temporal que almacena los datos entrantes de la vista crear producto
        let productoTmp = {
            id: parseInt(req.body.id),
            name: req.body.name,
            category: req.body.category,
            price: parseInt(req.body.price),
            discountRate: parseInt(req.body.discountRate),
            discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
            stock: parseInt(req.body.stock),
            description: req.body.description,
            //image: req.files[0].filename,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con  any(); 
            //image: req.file.filename,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con single();
            image: nombreImagen,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con single();
            // imagesSec: nombresImagenesSecundarias,
            features: req.body.features,
            //extras
            registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
            checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
            userWhoRegistered: req.body.userWhoRegistered,
        }; 


        return productoTmp;
    },
    estructurarObjetoPUT: function (req, nombreDeimagenNoModificada, vectorImagenesNoModificada) {
        
        let fecha = new Date();
 
        //para obtener la fecha con formato 
        const map = {
             dd: fecha.getDate(),
             mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
             yy: fecha.getFullYear().toString().slice(-2),
             yyyy: fecha.getFullYear()
        }
 
         // muestreo de datod principales 
         // console.log(req.body.id);
         // console.log(req.body.name);
         // console.log(req.body.category);
         // console.log(req.body.price);
         // console.log(req.body.discountRate);
         // console.log(req.body.stock);
         // console.log(req.body.features);
         // console.log(req.body.description);
         // console.log(req.body.image);
         // console.log(req.body.userWhoRegistered);
         
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
 
             
             // console.log(req.files[0].filename); // para usar con any
             // console.log(req.file.filename); //para usar con single
             // console.log(req.file.image);
 
             //como cargar imagen y actuliarla
             //https://www.it-swarm-es.com/es/node.js/cargue-la-imagen-y-luego-actualice-con-multer-y-express.js/805521310/
             //https://www.it-swarm-es.com/es/node.js/cargue-la-imagen-y-luego-actualice-con-multer-y-express.js/805521310/
             //para validar que exite una imagen desde el formulario
             let nombreImagen = '';
             //if(req.file !== underfined){
             //si exite el archivo 
             if(req.file){
                //pero si viene el archivo se debe actulsar
                nombreImagen = req.file.filename;

                //si es el caso que que si se valla a cargar otra imagen 
                //hay que eliminar anterior 

                //eliminacion de imagen previamente cargada por otro y no exista despus de ser actualisada con nueva imagen
                this.eliminarArchivoImagen(nombreDeimagenNoModificada);
             }else{
               //si no exite el archivo, se usa la misma que ya se tenia cargada 
                nombreImagen = nombreDeimagenNoModificada;
                // console.log("no se cargo la imagen adecuadamente... se pondra una por default");
             }    
             

            //multi imagen 
        //     let nombreImagen = null; 
        //     let nombresImagenesSecundarias = [];
        //     if(req.files){
        //     //si existen archivos 
        //     //https://codingshiksha.com/javascript/how-to-upload-multiple-files-in-multiple-form-fields-in-node-js-and-express-using-multer-library-full-example-for-beginners/
                
        //         //imagen principal 
        //         nombreImagen = req.files.imageProducto[0].filename;

        //         //eliminacion de imagen previamente cargada por otro y no exista despus de ser actualisada con nueva imagen
        //         this.eliminarArchivoImagen(nombreDeimagenNoModificada);


        //         //imagenes secundarias entrantes de formulario 

        //         req.files.imageSecundariasProducto.forEach(nombreImagen => {
        //             nombresImagenesSecundarias.push(nombreImagen.filename);
        //         });
                
        //         //aliminacion de imagenes secundarias creadas por primera ves
        //         vectorImagenesNoModificada.forEach(nombreImagenSec => {
        //             this.eliminarArchivoImagen(nombreImagenSec);
        //         });

        //         console.log("files uploaded");
        //     }else{
        //     //si no existen archivos 
        //         nombreImagen = null;
        //         nombresImagenesSecundarias= [];

        //         console.log("no files uploaded");
        //     }  
           
        //    // ---------validacion de imagen---------------
 
         
         //creacion de objeto temporal que almacena los datos entrantes de la vista crear producto
         let productoTmp = {
             id: parseInt(req.body.id),
             name: req.body.name,
             category: req.body.category,
             price: parseInt(req.body.price),
             discountRate: parseInt(req.body.discountRate),
             discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
             stock: parseInt(req.body.stock),
             description: req.body.description,
             //image: req.files[0].filename,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con  any(); 
             //image: req.file.filename,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con single();
             image: nombreImagen,//obtencion de nombre con que se guardo la imagen desde multer, se puede usar tambien req.file.filename con single();
            //  imagesSec: nombresImagenesSecundarias,
             features: req.body.features,
             //extras
             registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
             checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
             userWhoRegistered: req.body.userWhoRegistered,
         }; 
 
 
         return productoTmp;
    },
    buscarProducto: function (listaProductos, req) {
        let productoEncontrado = listaProductos.find( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return productoEncontrado;
    },
    buscarIndice: function (listaProductos, req) {
        let indice = listaProductos.findIndex( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return indice;
     },
    eliminarArchivoImagen: function (nombreImagen) {

        let rutaImagen = path.join(__dirname,'../public/images/imagenesDeProductos/'+nombreImagen);

         //console.log(rutaImagen);
         fs2.unlink(rutaImagen).then( ()=>{
            console.log('Se elimino archivo de imagen... al actuliar datos');
         }).catch( err =>{
            console.error('No se pudo eliminar el archivo no exite',err);
         });
        
        
        
        // //validacion para saber si existe el archivo o no 
        // if(fs.existsSync(rutaImagen)){
        //     //si existe lo elimina
        //     console.log("Eliminanado...");

           
        // }else{
        //     console.log("El archivo NO EXISTE!");
        // }
        
    }
 
      
};

module.exports = modeloDeProductos;