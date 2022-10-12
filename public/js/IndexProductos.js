// https://www.w3schools.com/jsref/prop_style_transform.asp


// https://developer.mozilla.org/es/docs/Web/CSS/transform-function/scale()
window.addEventListener('load', function () {
    // console.log("gola mundo desde index ");

    // console.log("en index");
    //lista de prosuctos selecionados que se almacenan en local storage emulando carrito de compra 
    
    // let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    // if(listaProductosSeleccinados == null){
    //     listaProductosSeleccinados = [];
    // }else{
    //     listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);
    // }

    // if(listaProductosSeleccinados.length > 0){
    //     for (let i = 0; i < listaProductosSeleccinados.length; i++) {
    //         console.log(listaProductosSeleccinados[i]);
    //     }
    // }

    // const contadorProductos = document.querySelector('#contadorProductos');
    // // console.log(contadorProductos.innerText);
    
    // contadorProductos.innerText = listaProductosSeleccinados.length;

    /*----------------------animacion de productos al pasar mouse------------------------*/
    //https://www.tech-wiki.online/es/add-click-event-to-dom-list.html
    const productos = document.querySelectorAll('.articulo.item');

    //para poner animacion al pasar el mouse
    // for (let i = 0; i < productos.length; i++) {
        
    //     productos[i].addEventListener('mouseover', function () {
    //         //  console.log('has pasado por encima de producto');
    //          productos[i].style.transform = "scale(1.1)";

             
    //     });

    //     productos[i].addEventListener('mouseout', function () {
    //         // console.log('has pasado por encima de producto');
    //         productos[i].style.transform = "scale(1)";
            
    //    });


       /*-----------------------------captura de clic, para agregar a carrito de compra-----------------------------------*/ 
       // console.log(productos[i].childNodes.item(2));
       
       /*
       productos[i].childNodes[2].childNodes[1].childNodes[1].addEventListener('click',()=>{

            console.log("se dio clic");

            // const idProducto = document.querySelector('strong#idProducto');
            // const nombreProducto = document.querySelector('h2#nombreProducto');
            // const precioProducto = document.querySelector('h4#precioProducto');
            // const descuentoProducto = document.querySelector('h5#descuentoProducto');
            // const numProductcantidad = document.querySelector('input#numProduct');
            // const imagenProducto = document.querySelector('img#imaPrin');

            // // console.log(imagenProducto.src); 


            // const productoSeleccionado = {
            //     id: parseInt(idProducto.innerText),
            //     nombre: nombreProducto.innerText,
            //     precio : parseFloat(precioProducto.innerText),
            //     descuento : parseFloat(descuentoProducto.innerText),
            //     cantidad : parseFloat(numProductcantidad.value),
            //     imagen: imagenProducto.src
            // };
            
            // // console.log(typeof listaProductosSeleccinados);
            // //validacion si ya exite el producto ya no cargarlo al carrito 

            // let productoEncontrado = listaProductosSeleccinados.find( (producto) => {
            //     return producto.id == parseInt(idProducto.innerText);
            // });

            // console.log("----------->>>>"+productoEncontrado);

            // if(productoEncontrado == undefined){
            //     // console.log("no existe");
            //     listaProductosSeleccinados.push(productoSeleccionado);

            //     localStorage.setItem('listaProductosSeleccinados', JSON.stringify(listaProductosSeleccinados));

            //     location.reload();
            // }else{
            //     alert("Este producto ya esta agregado a tu lista de productos");
            // }
       });
       */
       

    // }


    let listaProductosSeleccinados = [];

    if(localStorage.getItem('listaProductosSeleccinados') != null){

        // console.log('si exite variable');
        listaProductosSeleccinados = JSON.parse(localStorage.getItem('listaProductosSeleccinados'));
        //console.log(listaProductosSeleccinados);
    }


    const buttonsAddCart = document.querySelectorAll('a.botonPrimario');
    // console.log(buttonsAddCart);

    for (let i = 0; i < buttonsAddCart.length; i++) {
        // console.log(buttonsAddCart[i]);
        buttonsAddCart[i].addEventListener('click', ()=>{
            console.log("se dio clic");
           
            const idProducto = document.querySelector('p#idProducto'+i);//falta 
            const nombreProducto = document.querySelector('p#nombreProducto'+i);//falta
            const precioProducto = document.querySelector('p#precioProducto'+i);
            const descuentoProducto = document.querySelector('p#descuentoProducto'+i);
            const numProductcantidad = document.querySelector('p#cantidadProducto'+i);//por default sera 1
            const imagenProducto = document.querySelector('p#imaPrin'+i);

            console.log(numProductcantidad.innerText); 


            const productoSeleccionado = {
                id: parseInt(idProducto.innerText),
                nombre: nombreProducto.innerText,
                precio : parseFloat(precioProducto.innerText),
                descuento : parseFloat(descuentoProducto.innerText),
                cantidad : parseFloat(numProductcantidad.innerText),
                imagen: imagenProducto.innerText
            };

            
            // console.log(productoSeleccionado);
            // console.log(typeof listaProductosSeleccinados);
            // validacion si ya exite el producto ya no cargarlo al carrito 

            let productoEncontrado = listaProductosSeleccinados.find( (producto) => {
                return producto.id == parseInt(idProducto.innerText);
            });

            // console.log("----------->>>>"+productoEncontrado);

            if(productoEncontrado == undefined){
                // console.log("no existe");
                listaProductosSeleccinados.push(productoSeleccionado);

                localStorage.setItem('listaProductosSeleccinados', JSON.stringify(listaProductosSeleccinados));

                location.reload();
            }else{
                alert("Este producto ya esta agregado a tu lista de productos");
            }
        });

    }




    /**
     * manera optimisada sin agregar event listener a cada elemento con un solo al elemento lista 
     * //para optimiar
     * https://www.youtube.com/watch?v=GUTt0qKUDyU
     * https://abalozz.es/optimiza-el-manejo-de-eventos-del-dom-en-javascript/
     * https://www.tech-wiki.online/es/add-click-event-to-dom-list.html
     * https://www.codegrepper.com/code-examples/javascript/event.target.classlist
     */

    // // const productos = document.getElementById("articulos");
    //  const productos = document.querySelector('#articulos');

    
    // console.log(productos);

    // productos.addEventListener('mouseover', function(e){

    //     console.log(e.target.classList.contains('article'));
    //     // if (e.target !== this)) {
    //     //     console.log('si exite ');
    //     // }

    //     // if (e.target !== this) {
    //     //     // Código que se ejecuta al hacer click.
    //     //     e.target.style.transform = "scale(1.1)";
    //     // }
    //     // if (e.target.tagName === 'ARTICLE') {
    //     if (e.target.classList.contains('.articulo.item')) {
    //         // Código que se ejecuta al hacer click.
    //         e.target.style.transform = "scale(1.1)";
    //     }

    // });

    // productos.addEventListener('mouseout', function(e){
    //     // if (e.target !== this) {
    //     //     // Código que se ejecuta al hacer click.
    //     //     e.target.style.transform = "scale(1)";
    //     // }
    //     if (e.target.classList.contains('.articulo.item')) {
    //         // Código que se ejecuta al hacer click.
    //         e.target.style.transform = "scale(1)";
    //     }
    // });




    /*----------------------animacion de productos al pasar mouse------------------------*/


});
