const fs = require('fs').promises;
const path = require('path');
//modelo de productos
// const modeloDeProductos = require('../models/modeloDeProductos');
//destructuracion para usar objeto validator 
const {validationResult} = require('express-validator');
//conexion a la base de datos
const db = require('../database/models');

// const firebase = require('firebase');
// let packtRef = firebase.storage().ref();
// let packtImages = packtRef.child('images');

// const firebaseConfig = {

//   apiKey: "AIzaSyCuMpla1Iz5BnIZ4KSRSwqJiunMSmpgTEk",

//   authDomain: "pruebadb-b7c9c.firebaseapp.com",

//   databaseURL: "https://pruebadb-b7c9c-default-rtdb.firebaseio.com",

//   projectId: "pruebadb-b7c9c",

//   storageBucket: "pruebadb-b7c9c.appspot.com",

//   messagingSenderId: "301562266224",

//   appId: "1:301562266224:web:1feeb5418c546727cbaab5",

//   measurementId: "G-LLR9NC5LST"

// };

// firebase.initializeApp(firebaseConfig);



const controladorDeProductosDB = {
    test: async(req, res) => {

      const listaProductos = await db.product.findAll({
            include:[{
                association: 'image',
            }]
      }).catch((error) => {
        console.log('Error de: '+ error);
      });

      return res.json(listaProductos).status(200);

      // db.product.findAll().then((productos) => {
      //   return res.json(productos);
      // }).catch((error) => {
      //   console.log('Error de: '+error);
      // })
    
    },
    test2: (req, res) => {

      db.product.findAll({
            include:[{
                association: 'image'
            }]
      }).then(productos => {
          return res.json(productos).status(200);
      }).catch((error) => {
        console.log('Error de: '+error);
      })
    
    },
    test3: (req, res) => {

      db.category.findAll().then((categorias) => {
        return res.json(categorias);
      }).catch((error) => {
        console.log('Error de: '+error);
      })


    },
    objetByDB: function (req) {
      //objeto para fechas 
      const fecha = new Date();

      //para obtener la fecha con formato 
      const map = {
           dd: fecha.getDate(),
           mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
           yy: fecha.getFullYear().toString(),
           yyyy: fecha.getFullYear()
      }

 
     
      // console.log('yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]));
       const productoTmp = {
               name: req.body.name,
               category_id: req.body.category,
               price: parseInt(req.body.price),
               discountRate: parseInt(req.body.discountRate),
               discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
               stock: parseInt(req.body.stock),
               description: req.body.description,
               // image: imagenes[0],     //para imagen principal 
               // imagesSec: imagenes,    //para imagenes secundarias
               features: req.body.features,
               //extras fecha de registro, hora de registro y usuario que hio el registro 
               registrationDate: 'yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]),
               // checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
               userWhoRegistered: req.body.userWhoRegistered
       };

       return productoTmp;


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

      const productos = await db.product.findAll();
      
      res.render("Index", {productos});

      // res.render("Index", {productos: products});
    },
    vistaCatalogo: async (req, res) => {
      
      //consulta a la base de datos para obtener productos  V1
      // const listaProductos = await db.product.findAll({
      //       include:[{
      //           association: 'image',
      //       }]
      // }).catch((error) => {
      //   console.log('Error de: '+ error);
      // });

      //consulta a la base de datos para obtener productos  V2
      try {

        const listaProductos = await db.product.findAll({
          include:[{
              association: 'image',
          }]
        })
        //envio de datos a vista index
        res.render("Index", { productos: listaProductos});

      } catch (error) {
        console.log('Hubo un error de conexión con la base datos:'+ error);
        res.render("Index", { productos: []});
      }

    
    },
    vistaRegistrarProducto: async (req, res) => {

      //retorno a base de datss si existen errores 
      const categorias = await db.category.findAll().catch((error) => {
        console.log('Error de: '+ error);
      });

      res.status(200);
      res.render("registrarProducto",  {categoriasDB : categorias} );
    },
    vistaDetalleProducto: async (req, res) => {
 
      //consulta a la base de datos para obtener el producto mediante su id
      const productoEncontrado = await db.product.findByPk(parseInt(req.params.id),{
            include:[{
                association: 'image',
            }]
      }).catch((error) => {
        console.log('Error de: '+ error);
      });

      //verificacion de no estar vacio 
      if(productoEncontrado != null){
        res.render("DetalleProducto", { producto : productoEncontrado });
      }else{
        res.render("not-found");
      }

    },
    vistaCarritoDeCompra: (req, res) => {
      res.render("CarritoCompra");
    },
    guardarProducto: async (req, res) => {

      //----------validacion de datos de entrada---------------------
      let errores = validationResult(req);
      console.log(errores);
      //----------validacion de datos de entrada---------------------


      //para verificar si no exiten errores
      //if(errores.length > 0){  //otra forma de hacerlo 
      if(errores.isEmpty()){
              
              //crear objeto temporal
              const productTmp = controladorDeProductosDB.objetByDB(req);

              // creacion de registro en base de datos
              const producto  = await db.product.create(productTmp).catch((error) => {
                console.log('Error de: '+ error);
              });
              
              // console.log(product.id);
              
              //arreglo de nombres de imagenes 
              const namesimagenes = controladorDeProductosDB.imagesByDb(req);

              // creacion de registro de imagenes de cada producto      
              for (const nameIma of namesimagenes) {
                  console.log(nameIma);
                  await db.image.create({
                    name: nameIma,
                    product_id: producto.id,
                  }).catch((error) => {
                    console.log('Error de: '+ error);
                  });
              }
            
              //consulta a la base de datos para obtener productos 
              const listaProductos = await db.product.findAll({
                    include:[{
                        association: 'image',
                    }]
              }).catch((error) => {
                console.log('Error de: '+ error);
              });

              //retorno a crear otro producto
              // res.status(201);
              res.render('listaProductos',{ productos : listaProductos }).status(201);

      }else{

            console.log(errores);
            
            //retorno a base de datss si existen errores 
            const categorias = await db.category.findAll().catch((error) => {
              console.log('Error de: '+ error);
            });
      
            res.render('registrarProducto', { msgsErrors : errores.mapped(), DataOld  : req.body,  categoriasDB : categorias  } ).status(422) ;// otra forma de hacerlo 

      }

      //----------validacion de datos de entrada---------------------

    },
    listaDeProductos: async (req, res) => {

        //consulta a la base de datos para obtener productos 
        const listaProductos = await db.product.findAll({
              include:[{
                  association: 'image',
              }]
        }).catch((error) => {
          console.log('Error de: '+ error);
        });

        //envio de datos a vista index
        res.render('listaProductos', { productos: listaProductos});
    },
    vistaEdicionProducto: async (req, res)=>{

        //consulta a la base de datos para obtener el producto mediante su id
        const productoEncontrado = await db.product.findByPk(parseInt(req.params.id),{
              include:[{
                  association: 'image',
                  association: 'category'
              }]
        }).catch((error) => {
            console.log('Error de: '+ error);
        });

        // console.log(productoEncontrado);

        const categorias = await db.category.findAll().catch((error) => {
            console.log('Error de: '+ error);
        });


      //verificacion de no estar vacio 
      if(productoEncontrado != null){
        //si exiten errores de validacion se envian 
        res.status(200);
        res.render('editarProducto', { producto: productoEncontrado,  categoriasDB : categorias  });
      }else{
        res.status(404);
        res.render("not-found");
      }

    },
    actulizaProducto: async (req, res)=>{


      let errores = validationResult(req);

      if(errores.isEmpty()){
          
          //crear objeto temporal
          const productTmp = await controladorDeProductosDB.objetByDBPut(req);
          console.log(productTmp);


          // console.log(productM);
          //actualisacion de producto en cada uno de sus campos menos imagenes  
          await db.product.update(productTmp, {
              where: {
                  id : req.params.id
              }
          }).catch( error =>{
              console.log(error);
          });

          //eliminar las imagenes que se tenian antes tanto en carpeta fisica como en base de datos 
          //consulta a la base de datos para obtener el producto mediante su id
          const productoEncontrado = await db.product.findByPk(parseInt(req.params.id),{
              include:[{
                  association: 'image'
                  // association: 'Category'
              }]
          }).catch((error) => {
              console.log('Error de: '+ error);
          });


          //elimiando imagenes de producto en carpeta para guardar las nuevas y no almecenar las primera cargadas al crear el producto 
          for(let i= 0 ; i< productoEncontrado.image.length ;i++){
            console.log(productoEncontrado.image[i].name);
            controladorDeProductosDB.eliminarArchivoImagen(productoEncontrado.image[i].name);
          }


          //eliminanado imagenes en base de datos 
          for(let i= 0 ; i< productoEncontrado.image.length ;i++){
            await db.image.destroy({
              where :{
                  name : productoEncontrado.image[i].name
              }
            }).catch((error) => {
              console.log('Error de: '+ error);
            });
          }

          //ahora insertamos las nuevas imagenes que vienen del formulario de actulisacion 
          //arreglo de nombres de imagenes 
          const namesimagenes = controladorDeProductosDB.imagesByDb(req);

          // creacion de registro de imagenes de cada producto      
          for (const nameIma of namesimagenes) {
              console.log(nameIma);
              await db.image.create({
                name: nameIma,
                product_id: req.params.id,
              }).catch((error) => {
                console.log('Error de: '+ error);
              });
          }
          

          //consulta a la base de datos para obtener productos 
          const listaProductos = await db.product.findAll({
                include:[{
                    association: 'image',
                }]
          }).catch((error) => {
            console.log('Error de: '+ error);
          });

          //redireccion a editar productos
          res.render('listaProductos', {productos : listaProductos} );


      }else{

        const categorias = await db.category.findAll().catch((error) => {
          console.log('Error de: '+ error);
        });
      
        console.log(req.body);

        res.render('editarProducto', { msgsErrors : errores.mapped(), DataOld  : req.body,  categoriasDB : categorias } );// otra forma de hacerlo 
      }
      

    }
    ,eliminaProducto: async (req, res) => {

        //consulta a la base de datos para obtener el producto mediante su id
        const productoEncontrado = await db.product.findByPk(parseInt(req.params.id),{
                include:[{
                    association: 'image'
                    // association: 'Category'
                }]
        }).catch((error) => {
          console.log('Error de: '+ error);
        });


        //elimiando imagenes de producto en carpeta 
        for(let i= 0 ; i< productoEncontrado.image.length ;i++){
          console.log(productoEncontrado.image[i].name);
          controladorDeProductosDB.eliminarArchivoImagen(productoEncontrado.image[i].name);
        }

        
        //eliminanado imagenes en base de datos primeramente para hacer una eliminacion en cascada de las imagenes del producto 
        //y no se tenga problema por la foregin key
        for(let i= 0 ; i< productoEncontrado.image.length ;i++){
          await db.image.destroy({
            where :{
                name : productoEncontrado.image[i].name
            }
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
        }
        

        //aliminacion de producto de la base de datos 
        await db.product.destroy({
          where :{
              id : req.params.id
          }
        }).catch((error) => {
          console.log('Error de: '+ error);
        });


        //consulta a la base de datos para obtener productos 
        const listaProductos = await db.product.findAll({
              include:[{
                  association: 'image',
              }]
        }).catch((error) => {
          console.log('Error de: '+ error);
        });
  
        //redireccion a editar productos
        res.render('listaProductos', {  productos : listaProductos} );          
          
        
    },
    objetByDBPut: async function (req) {
      //objeto para fechas 
      const fecha = new Date();

      //para obtener la fecha con formato 
      const map = {
           dd: fecha.getDate(),
           mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
           yy: fecha.getFullYear().toString(),
           yyyy: fecha.getFullYear()
      }

       const categoriaE = await db.category.findAll({
           where: {
               name: req.body.category.trim()
           }
       }).catch((error) => {
         console.log('Error de: '+ error);
       });

       // console.log(categoriaE);
       // console.log(categoriaE[0].id);
       
      // console.log('yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]));
       const productoTmp = {
               name: req.body.name,
               category_id: categoriaE[0].id,
               price: parseInt(req.body.price),
               discountRate: parseInt(req.body.discountRate),
               discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
               stock: parseInt(req.body.stock),
               description: req.body.description,
               // image: imagenes[0],     //para imagen principal 
               // imagesSec: imagenes,    //para imagenes secundarias
               features: req.body.features,
               //extras fecha de registro, hora de registro y usuario que hio el registro 
               registrationDate: 'yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]),
               // checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
               userWhoRegistered: req.body.userWhoRegistered
       };

       return productoTmp;


   },
   imagesByDb:function (req) {
       //para validar se han cargado imagenes desde el formulario
       const imagenes = [];
       // req.files.imageProducto[0].filename
       if(req.files){
           //imagenes 
           // console.log(req.files);
           
           req.files.forEach( imagen => {
               // console.log(imagen);
               imagenes.push(imagen.filename);
           });

       }else{
           imagenes = [];
       }

       //console.log(imagenes);
       return imagenes;
   },
   eliminarArchivoImagen: function (nombreImagen) {

    let rutaImagen = path.join(__dirname,'../public/images/imagenesDeProductos/'+nombreImagen);

     //console.log(rutaImagen);
     fs.unlink(rutaImagen).then( ()=>{
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
    
  },
}
  
module.exports = controladorDeProductosDB;