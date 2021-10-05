
window.addEventListener('load', function (e) {

	// body...
    //guis de validacion de formularios 
    //https://didesweb.com/javascript/validarformularios/
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
    //https://programacion.net/articulo/validar_la_extension_de_un_fichero_con_javascript_1799   validadion de imagenes  

            const formulario =  document.querySelector('form#formulario');
            const botonCrear =  document.querySelector('input#botonCrearP');
                            
                        
        
            // // desarrolla tu codigo aca 
            botonCrear.addEventListener('click', function (event) {


                const name = document.querySelector('input#name');
                const category = document.querySelector('select#SelectOp').selectedIndex;
                const price = document.querySelector('input#price');
                const discountRate = document.querySelector('input#discountRate');
                const stock = document.querySelector('input#stock');
                const features = document.querySelector('input#features');
                const description = document.querySelector('textarea#description');
                const imagesProducto = document.querySelector('input#imagesProducto');

                const errorName  = document.querySelector('p#errorName');
                const errorCategory  = document.querySelector('p#errorCategory');
                const errorPrice  = document.querySelector('p#errorPrice');
                const errorDiscountRate  = document.querySelector('p#errorDiscountRate');
                const errorStock = document.querySelector('p#errorStock');   
                const errorFeatures = document.querySelector('p#errorFeatures'); 
                const errorDescription = document.querySelector('p#errorDescription');                                    
                const errorImagesProducto = document.querySelector('p#errorImagesProducto');

                console.log(errorImagesProducto);


                let errores = {};

                            
                //creamos un atributo dentro del objeto para guardar el error 
                if(name.value.length < 1){
                    errores.name = 'El campo nombre no debe estar vacio'
                }else{
                    if(name.value.length < 5){
                        errores.name = 'El campo nombre debe al menos tener 5 caracteres'
                    }
                }
                
                
                if(category == 0){
                    errores.category = 'El campo categoria no debe estar vacio'
                }

                if(price.value.length < 1){
                    errores.price = 'El campo precio no debe estar vacio'
                }

                if(discountRate.value.length < 1){
                    errores.discountRate = 'El campo de descuento no debe estar vacio'
                }

                if(stock.value.length < 1){
                    errores.stock = 'El campo existencias no debe estar vacio'
                }

                if(features.value.length < 1){
                    errores.features = 'El campo de caracteristicas no debe estar vacio'
                }

                if(description.value.length < 1){
                    errores.description = 'El campo de descripcion no debe estar vacio'
                }else{
                    if(description.value.length < 20){
                        errores.description = 'El campo nombre debe al menos tener 20 caracteres'
                    }
                }
                    
                

                // console.log("---"+ imagesProducto.files.length);

                if(imagesProducto.files.length == 0){

                    errores.imagesProducto = 'No debes dejar vacio el campo de imagenes...'
                  
                }else if( imagesProducto.files.length < 3 ){
      
                    errores.imagesProducto = 'Recuerda debes almenos cargar 3 imagenes...'
               
                }else if(imagesProducto.files.length > 5){
                    
                    errores.imagesProducto = 'Solo puedes cargar maximo 5 imagenes...'
                }else{

                    let bandera = false;
                    let extencionesAceptadas = ['.jpg', '.png', '.webp','.gif'];

                    for (let i = 0; i < imagesProducto.files.length; i++) {

                        // console.log(imagesProducto.files[i].name);

                        let extencion = imagesProducto.files[i].name.split('.');
                        // console.log('.'+extencion[1]);
                        let ext = '.'+extencion[1];
                        // console.log(typeof ext);

                        if(!extencionesAceptadas.includes(ext)){
                            // console.log("en if");
                            bandera = false;
                        }else{
                            bandera = true;
                        }
                    };

                     console.log(bandera);

                    if(bandera == false){
                        // console.log("tiene otro tipo de archivos ");
                        errores.imagesProducto = 'Alguno de los archivos cargados no cumple con las extenciones permitidas que son: .jpg, .png , .webp , .gif '
                
                    }


                }
                
                //investigar como ocultar mensajes al empesar a escribir 
                //https://www.it-swarm-es.com/es/javascript/como-hacer-efecto-fadeout-con-javascript-puro/1052673355/
                // name.addEventListener('change', function () {
                //     if (this.value.length > 1) {  			
                //         $('.error').fadeOut();

                //         function fade(){
                //             (s.opacity-=.1)<0 ? s.display="none":setTimeout(fade,40)
                //         }
 
                //     }
                // });

                console.log(errores);

                if(Object.keys(errores).length >= 1){
                    // (errores.name) si exite el atributo en el objeto errores mandamos el error si no se mandamos vacio 
                    errorName.innerText = (errores.name) ? errores.name : '';
                    errorCategory.innerText = (errores.category) ? errores.category : '';
                    errorPrice.innerText = (errores.price) ? errores.price : '';
                    errorDiscountRate.innerText = (errores.discountRate) ? errores.discountRate : '';
                    errorStock.innerText = (errores.stock) ? errores.stock : '';
                    errorFeatures.innerText = (errores.features) ?  errores.features : '';
                    errorDescription.innerText = (errores.description) ?  errores.description : '';
                    errorImagesProducto.innerText = (errores.imagesProducto) ? errores.imagesProducto : '';
                    event.preventDefault();

                }
                // else{
                //     formulario.submit();
                // }


            });

     
                                
});



// function fileValidation(){
//     var fileInput = document.getElementById('file');
//     var filePath = fileInput.value;
//     var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
//     if(!allowedExtensions.exec(filePath)){
//         alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
//         fileInput.value = '';
//         return false;
//     }else{
//         //Image preview
//         if (fileInput.files && fileInput.files[0]) {
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
//             };
//             reader.readAsDataURL(fileInput.files[0]);
//         }
//     }
// }