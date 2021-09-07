//modelo de productos
const modeloDeProductos = require('../models/modeloDeProductos');
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

      return res.json(listaProductos);

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
               return res.json(productos);
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
      
      //consulta a la base de datos para obtener productos 
      const listaProductos = await db.product.findAll({
            include:[{
                association: 'image',
            }]
      }).catch((error) => {
      console.log('Error de: '+ error);
      });

      //envio de datos a vista index
      res.render("Index", { productos: listaProductos});

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
              const productTmp = modeloDeProductos.objetByDB(req);

              // creacion de registro en base de datos
              const producto  = await db.product.create(productTmp).catch((error) => {
                console.log('Error de: '+ error);
              });
              
              // console.log(product.id);
              
              //arreglo de nombres de imagenes 
              const namesimagenes = modeloDeProductos.imagesByDb(req);

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
              res.status(200);
              res.render('listaProductos',{ productos : listaProductos });

      }else{

            console.log(errores);
            
            //retorno a base de datss si existen errores 
            const categorias = await db.category.findAll().catch((error) => {
              console.log('Error de: '+ error);
            });
      
            res.render('registrarProducto', { msgsErrors : errores.mapped(), DataOld  : req.body,  categoriasDB : categorias  } );// otra forma de hacerlo 

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
          const productTmp = await modeloDeProductos.objetByDBPut(req);
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
            modeloDeProductos.eliminarArchivoImagen(productoEncontrado.image[i].name);
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
          const namesimagenes = modeloDeProductos.imagesByDb(req);

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
          modeloDeProductos.eliminarArchivoImagen(productoEncontrado.image[i].name);
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
}
  
module.exports = controladorDeProductosDB;