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
    // const productos = document.querySelectorAll('.articulo.item');

    // for (let i = 0; i < productos .length; i++) {
        
    //     productos[i].addEventListener('mouseover', function () {
    //         //  console.log('has pasado por encima de producto');
    //          productos[i].style.transform = "scale(1.1)";
             
    //     });

    //     productos[i].addEventListener('mouseout', function () {
    //         // console.log('has pasado por encima de producto');
    //         productos[i].style.transform = "scale(1)";
            
    //    });
    // }

    /**
     * manera optimisada sin agregar event listener a cada elemento con un solo al elemento lista 
     * //para optimiar
     * https://www.youtube.com/watch?v=GUTt0qKUDyU
     * https://abalozz.es/optimiza-el-manejo-de-eventos-del-dom-en-javascript/
     * https://www.tech-wiki.online/es/add-click-event-to-dom-list.html
     * https://www.codegrepper.com/code-examples/javascript/event.target.classlist
     */

    // // const productos = document.getElementById("articulos");
     const productos = document.querySelector('#articulos');

    
    // console.log(productos);

    productos.addEventListener('mouseover', function(e){

        console.log(e.target.classList.contains('article'));
        // if (e.target !== this)) {
        //     console.log('si exite ');
        // }

        // if (e.target !== this) {
        //     // Código que se ejecuta al hacer click.
        //     e.target.style.transform = "scale(1.1)";
        // }
        // if (e.target.tagName === 'ARTICLE') {
        if (e.target.classList.contains('.articulo.item')) {
            // Código que se ejecuta al hacer click.
            e.target.style.transform = "scale(1.1)";
        }

    });

    productos.addEventListener('mouseout', function(e){
        // if (e.target !== this) {
        //     // Código que se ejecuta al hacer click.
        //     e.target.style.transform = "scale(1)";
        // }
        if (e.target.classList.contains('.articulo.item')) {
            // Código que se ejecuta al hacer click.
            e.target.style.transform = "scale(1)";
        }
    });




    /*----------------------animacion de productos al pasar mouse------------------------*/


});
