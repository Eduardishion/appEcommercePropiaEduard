window.addEventListener('load', function () {

	console.log("desde script global");

	let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    if(listaProductosSeleccinados == null){
        listaProductosSeleccinados = [];
    }else{
        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);

        // console.log(listaProductosSeleccinados);
    }

    const contadorProductos = document.querySelector('#contadorProductos');
    // console.log(contadorProductos.innerText);
    
    contadorProductos.innerText = listaProductosSeleccinados.length;
});
