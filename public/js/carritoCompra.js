window.addEventListener('load', function () {

    let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    if(listaProductosSeleccinados == null){
        listaProductosSeleccinados = [];
    }else{
        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);
    }


    let contenedorProductos = document.querySelector('div#tablaProductos');
    console.log(contenedorProductos)

    for (let i = 0; i < listaProductosSeleccinados.length; i++) {
        //creacion de etiqutas 

        //div principal
        const divProductos = document.createElement("div");
        divProductos.setAttribute("id", "productos");
        divProductos.setAttribute("class", "centrado");


            const divImagen = document.createElement("div");
            divImagen.setAttribute("id", "imagen");

                const imagen = document.createElement("img");
                imagen.setAttribute("src", listaProductosSeleccinados[i].imagen);
                imagen.setAttribute("alt", "miniatura");
                imagen.setAttribute("class", "miniatura");
                divImagen.appendChild(imagen);

                const nombre = document.createElement("p");
                nombre.textContent = listaProductosSeleccinados[i].nombre;
                divImagen.appendChild(nombre);
            
            
            const divPrecio = document.createElement("div");
            divPrecio.setAttribute("id", "precio");
            divPrecio.setAttribute("class", "centrado");
           

                const precio = document.createElement("p");
                precio.textContent = '$ '+ listaProductosSeleccinados[i].precio;
                divPrecio.appendChild(precio);

            const divCantidad = document.createElement("div");
            divCantidad.setAttribute("id", "cantidad");
            divCantidad.setAttribute("class", "centrado");

                const menos = document.createElement("div");
                menos.setAttribute("class", "textoTabla");
                    menos.textContent = '-'
                    divCantidad.appendChild(menos);

                const num = document.createElement("div");
                num.setAttribute("class", "textoTabla");
                    num.textContent = '1'
                    divCantidad.appendChild(num);

                const mas = document.createElement("div");
                mas.setAttribute("class", "textoTabla");
                    mas.textContent = '+'
                    divCantidad.appendChild(mas);

            const divTotal = document.createElement("div");
            divTotal.setAttribute("id", "total");
                      
                const total = document.createElement("p");
                total.textContent = '$ '+ listaProductosSeleccinados[i].precio * 1;
                divTotal.appendChild(total);
            
            
            const divIcono = document.createElement("div");
            divIcono.setAttribute("id", "icono");
            divIcono.setAttribute("class", "centrado");
    
                const imagenIcono = document.createElement("img");
                imagenIcono.setAttribute("src", "/images/ImagenesCarritoCompra/cancel_black_24dp.svg");
                imagenIcono.setAttribute("alt", "icono");
                divIcono.appendChild(imagenIcono);
        

        divProductos.appendChild(divImagen);
        divProductos.appendChild(divPrecio);
        divProductos.appendChild(divCantidad);
        divProductos.appendChild(divTotal);
        divProductos.appendChild(divIcono);
        
        
        //agregacion de etiquetas al contenedor 
        contenedorProductos.appendChild(divProductos);
        // contenedorProductos.appendChild(imagen );
    }
})