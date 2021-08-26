 debemos instalar nodejs como entonro de desarrolo y npm para instalr paquetes y comprobar que exite en nuestra maquina 

 git si es necesario para control de verciones

 tener un editor de texto para desarrollar nuestra app




 creamos un proyecto con express inicialisar 


 instalamos cada una de las librerias necesarias 
    mencinar cada una de las que se usaran 


 En el desarrollo completo usamos express.js, node.js,  y muchas librerias mas 
 multer, expressValidator, escribir para que sirve cada una 


 describir que contiene el app.js

 describir como hacer vistas 
      uso de tecnicas de html y css

 describir como crear rutas


 describir como crear controladores 


 describir como podemos implementar un crud de datos con archivos json 


 describir como ahcer un crud de datos con base de datos 


 y podemos ir implementado un desplique ya se a depuras 
    
    vistas de paginas estaticas solo con css, js, html o ejs por ejemplo en servidores como :
        gitgub pages 
        gitlab pages 
        nettify

    vistar, modelo y controlador en servidores como:
      heroku
      clover cloud
      digital ocean

      otros mas avansados
      AWS
      Asure
      google cloud



herramientas avansadas que aprender 
    APIs como crearlas y consumirlas 
    ES6 nuevams funcionalidades : map, arrow functions , let y const, asincronismo 
    flexbox
    graphQL
    react
    firebase 
    multer
    expressvalidator 
    redux
    despligue con docker 
    jenkis
    jest
    webpack
    gulp
    







 para la instalacion de mysql local 
    hacer tutorial 
 para instalar usar mysql en produccion y en un servidor remoto, este caso usamos clover cloud 
    hacer tutorial 

 para crear la base de datos se usa:

         sequelize db:create

recordar crear nombre de modelos debe ser en minusculas  y nombrados en singular 
  
  osea 
    modelo: producto     ---- bien hecho 

  no 
    modelo: procuctos    ---- mal hecho 

recordar no dejar espacios en la declaracion de atributos deben ir seguidos con la coma sin espacios como los siguientes ejemplos:


No olvidar colocar los campos que se usaran como foreignKey
en las tablas respectivas y donde van exactamente 
,recordar que la foreign key va en la tabla de muchos 'N' y no en de la uno '1'
o mas bien en la tabla donde usaremos el id de la tabla referecniada 


model product

    sequelize model:generate --name product --attributes name:string,price:decimal,discountRate:integer,discount:decimal,stock:integer,description:text,features:text,registrationDate:date,userWhoRegistered:string,category_id:integer


model category
    
    sequelize model:generate --name category --attributes category:string


model image

    sequelize model:generate --name image --attributes image:string,product_id:integer


model rol

    sequelize model:generate --name rol --attributes rol:string

model user

     sequelize model:generate --name user --attributes firstName:string,lastName:string,email:string,password:string,registrationDate:date,rol_id:integer


Al crearse auntomaticamente nos los modelos  nos agilisa la escritura, pero aun podemos colocar 
mas restricciones o contrais como, esto se hace en las migraciones y respectivamente, en los modelos deben de coinsidir tambien todo lo que agreguemos 

osea deben de estar igual tanto en tipo de datos y restricciones y demas que agreguemos  

  no null :  allow
  unico   :  UNIQUE


despues debemos hacer las asociaciones manualmente entre tablas 
usando, si es necesario: 
	  
	  .belongsTo
    .hasMany
    .belongsToMany

Estas fueron las asociaciones realisadas para cada modelo 


    product.js

       product.belongsTo(models.category,{
        foreignKey: 'category_id',
        as:'category'
      });

      product.hasMany(models.image,{
        foreignKey: 'product_id',
        as:'image'
      });

    user.js
      
      user.belongsTo(models.rol,{
          foreignKey: 'rol_id',
          as:'rol'
      });

    image.js

      image.belongsTo(models.product,{
        foreignKey: 'product_id',
        as:'product'
      });

    category.js

      category.hasMany(models.product,{
        foreignKey: 'category_id',
        as:'product'
      });

    rol.js

      rol.hasMany(models.user,{
          foreignKey: 'rol_id',
          as:'user'
      });


En la migracion hay que agregar la asociacion respectiva si no, no se seran validas ni se 
crearan en la base de datos tales asociaciones 
y asignar el campo de foreginkey se elimine en cascada, en cada modelo asociado 

    en los campos foreginkey colocar:

    se agrega a campos que tengan foreging key 


        {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE', //para que se borre en cascada, para no tener datos no relacionados 
          onUpdate: 'CASCADE',
          references: {
            model: 'categories',//este nombre es el nombre respectivo y como se nombrara mysql 
            key: 'id'
          }
        }

    el model y key se pueden verificar en el archivo migraciones
    en esta parte en especifico, despues de donde dice, createTable, esta el nombre de la tabla paa mysql
    y enseguida el campo 'id' 

    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      




volver a migrar 
 los modelos a la base de datos en mysql 

 si no creamos antes la base de datos solo por verificar que si este creda 
     sequelize db:create

si ya est creada usamos el siguiente omando para crear las tablas en mysql 

     sequelize db:migrate


despues podemos hacer seeders 



crear seeders 

    sequelize seed:generate --name product
    sequelize seed:generate --name user
    sequelize seed:generate --name image
    sequelize seed:generate --name category
    sequelize seed:generate --name rol

este comando crea archivos para poder poblar la tablas en mysql 

estructura de un sedder


recordar que tablas que no tengan foregin key deben ser primero pobladas 



cuando ya se hallan llenado de datos esos archivos queda ejecutar los seeders, para llenar las tablas 
    sequelize db:seed:all


para especificar un solo archivo 


categories   no tiene lave foranea por eso debe primero ser problada antes que productos 
  sequelize db:seed --seed 20210825195125-category.js

productos 

  sequelize db:seed --seed 20210825195121-product.js

imagenes 

  sequelize db:seed --seed 20210825195124-image.js



otros comandos 
sequelize db:seed:all`: correrá todos seeders.
sequelize db:seed:undo`: revertirá el último seeder que se ejecutó.
sequelize db:seed:undo:all`: revertirá todos los seeders ejecutados.
sequelize db:seed:undo:all`: revertirá todos los seeders ejecutados.
sequelize migration:generate`: generará un archivo *custom* de migración


To run a specific seed indicate --seed <seed_file_nams.js>:

sequelize db:seed --seed my_seeder_file.js


un buen tutorial de un profesor de digital house y el uso de sequelise
https://github.com/japsolo/curso-sequelize-migrations-seeders

//mejor referencia en video  este esplica muchas cosas importantes 
https://www.youtube.com/watch?v=6qDPwsXCc2E&t=1765s

buena referencia en lectura
https://medium.com/@Ayra_Lux/a-guide-to-orm-sequelize-c276c7b6dd18
https://medium.com/nowports-tech/sequelize-en-tiempos-de-sql-f4026a808f06

//muy buena referencia en video 
https://medium.com/@Ayra_Lux/a-guide-to-orm-sequelize-c276c7b6dd18
https://www.youtube.com/watch?v=DUM1-uT51b8&list=PLn9Y084aviLmTy5TO6sw6Ky6NjEO5uCme&index=9





un buen tutorial de un profesor de digital house y el uso de sequelise
https://github.com/japsolo/curso-sequelize-migrations-seeders


migraciones automaticas 
https://www.it-swarm-es.com/es/database/sequelize.js-como-usar-las-migraciones-y-la-sincronizacion/1044233816/

uso de Umzug para migraciones automaticas en servidor remoto 
https://github.com/sequelize/umzug



ver paquetes instalados
https://otroespacioblog.wordpress.com/2018/11/06/como-listar-modulos-globales-instalados-con-npm-g/


otro ejemplo de usar sequelise
https://rosolutions.com.mx/blog/index.php/2018/08/06/como-usar-un-orm-en-node-js/

buena referencia en lectura
https://medium.com/@Ayra_Lux/a-guide-to-orm-sequelize-c276c7b6dd18
https://medium.com/nowports-tech/sequelize-en-tiempos-de-sql-f4026a808f06

//muy buena referencia en video 
https://medium.com/@Ayra_Lux/a-guide-to-orm-sequelize-c276c7b6dd18
https://www.youtube.com/watch?v=DUM1-uT51b8&list=PLn9Y084aviLmTy5TO6sw6Ky6NjEO5uCme&index=9








