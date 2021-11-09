
### El siguiente proyecto es una integracion de lo aprendido en el curso de DESARROLLO FULL STACK NODEJS  DE DIGITAL HOUSE, teniendo en cuenta cada uno de los sprints del proyecto integrador, donde como objetivo es crear una e-commerce desde frontend a backend.

Donde llevan a cabo las siguientes actividades:

Front-end: Traducción y maquetación del diseño de la página web
bajo principios responsive, creación de vistas, formularios, validaciones,
conexiones asíncronas mediante fetch, interacción del DOM así como
uso Session y Cookies para almacenado de información.

Back-end: Creación y puesta en marcha del servidor web; integración
de bases de datos relacionales remotas; autenticación, validación de
datos y manejo de sesiones de usuarios; Integración con otras
plataformas mediante apis.


Las tecnologias usadas en esta integracion a sido 
  -Nodejs 
  -Mysql 
  -CSS 
  -HTML 
  -Json 
  -JS 
  -ExpressJs 
  -Sequelize 
  -Ejs 
  -Multer 
  -Express-session 
  -Cookie-parser 
  -Express-validator 
  -Method-override 
  -Bcryptjs
  
  
 Asi como algunos servicios en la nube como Heroku para alojar el app y Clever Cloud para alojar la base de datos.
 
 Este es el enlace al e-commerce
 https://eduardishion-eshop.herokuapp.com/
 

 
 La rama de momento mas completa es la rama: servidorV5-operaciones-dataBase
 
  -Recordar tener instalado primeramente mysql
  -Saber la credenciales de nuestro mysql local para poder hacer la conexión y configuracion en archivo database/config/config.js 
  
 Para crear la base de datos en mysql, exiten varios comandos que se pueden usar para poder iniciarla
 
  -primero debemos instalar todas la dependencias del poryecto en el comando 
      
      npm i 

  -despues de tener todo instalado usar el comando preconfigurado de npm 
    
    npm run testLocal
  
  que crea la base datos donde se almacenaran los datos, hace la migracion de las tablas e inserta datos en las tablas 
  
  
 Despues volvamos a parar el servidor con:
 
    Ctrl-c
 
 E iniciemos el servidor con:
 
    npm start 
    
 El cual inicia el servirdor en el endpoint siguiente:
    
    http://localhost:3000/
    
 Recordar que la no hay imagenes cargadas, pero al hacer pruebas e incertar imagenes de un nuevo producto su se cargara y se mostrara
 
 
  
  
 
 
 Aqui algunas vistas de su funcinamiento:
 <img src="https://github.com/Eduardishion/appEcommercePropiaEduard/blob/servidorV5-operaciones-dataBase/Captura%20de%20pantalla%20(724).png">
 
  <img src="https://github.com/Eduardishion/appEcommercePropiaEduard/blob/servidorV5-operaciones-dataBase/Captura%20de%20pantalla%20(725).png">
  
  <img src=" https://github.com/Eduardishion/appEcommercePropiaEduard/blob/servidorV5-operaciones-dataBase/Captura%20de%20pantalla%20(727).png">
  
   <img src="https://github.com/Eduardishion/appEcommercePropiaEduard/blob/servidorV5-operaciones-dataBase/Captura%20de%20pantalla%20(728).png">
  

 
 
 


