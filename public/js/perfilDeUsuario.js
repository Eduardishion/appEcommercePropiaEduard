window.addEventListener('load', function () {

	const listaProductos = document.querySelector('ul#listaProductosSeleccionados'); 
    // console.log(listaProductos);


    let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    if(listaProductosSeleccinados == null){
        listaProductosSeleccinados = [];
    }else{
        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);



	    for (var i = 0; i < listaProductosSeleccinados.length; i++) {
	    	
	    	   let li = document.createElement("li");
			   //console.log(listaProductosSeleccinados[i].nombre);
			   li.innerText = listaProductosSeleccinados[i].nombre;
			   listaProductos.appendChild(li);

	    }

    }


   



 
	

    
});