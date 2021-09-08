window.addEventListener('load', function () {
    // console.log("hola desde script para detalle..");

   /*---------------------------para galeria de imagenes ----------------------------------- */

    let enlaces = document.querySelectorAll('a.enlaceIma');
    

    // referencia
    // https://www.codegrepper.com/code-examples/javascript/javascript+how+to+get+image+src
    // https://www.codegrepper.com/code-examples/javascript/get+image+from+javascript
    // https://www.w3schools.com/jsref/dom_obj_all.asp
    // https://www.w3schools.com/jsref/dom_obj_all.asp


    // console.log(enlaces.length);

    const imagenes = [];
    let contador = 0 ;

    for (let i = 0; i < enlaces.length; i++) {
        // console.log(enlaces[i]);   
        imagenes .push(enlaces[i].childNodes[1].currentSrc);

        enlaces[i].addEventListener('mouseover', function () {
    	// body...
	    	// console.log('has pasado por el enlace');
	    	// console.log(enlaces[i].children);

	    	//console.log(enlaces[i].childNodes[1].currentSrc);
	    	
	    	//imaPrin.src="../template/save.png";

	    	//console.log('#imaSec'+1);	
	    	let imaPrin = document.querySelector('#imaPrin');
	    	imaPrin.src = enlaces[i].childNodes[1].currentSrc;
            contador = i;
	    	// console.log(imaPrin);

            // console.log("a#enlace"+(i+1));
            let enlace = document.querySelector("a#enlace"+(i+1));
            // console.log(enlace);
            enlace.style.border = "thick solid #EF0000";

	    	
	    });

        enlaces[i].addEventListener('mouseout', function () {
            let enlace = document.querySelector("a#enlace"+(i+1));
            // console.log(enlace);
            enlace.style.border = "solid 1px black";
        });

    }



    // console.log(imagenes);

    //movimiento hacia atras de imagen 
    let max = imagenes.length;

    let fechaI = document.querySelector('a#left');
    fechaI.addEventListener('click', function () {
        // console.log("se dio clic en flecha I");
        let imaPrin = document.querySelector('#imaPrin');
        contador--;
        if(contador < 0){
            contador = max-1;
        }
        imaPrin.src = imagenes[contador];

    

    });

    //movimiento hacia delante de imagenes 
    let min = 0;

    let fechaD = document.querySelector('a#rigth');
    
    fechaD.addEventListener('click', function () {
        // console.log("se dio clic en flecha D");
        let imaPrin = document.querySelector('#imaPrin');
        contador++;
        if(contador > imagenes.length-1){
            contador = min;
        }
        imaPrin.src = imagenes[contador];
    });
    
    /*---------------------------para galeria de imagenes ----------------------------------- */
    


    /*---------------------------cantidad de productos----------------------------------- */
    let numProduct = document.querySelector('input#numProduct');
    // console.log(numProduct);
    let mas   = document.querySelector('a#mas');
    let menos = document.querySelector('a#menos');

    // if(numProduct.value == ''){
    //     numProduct.value = 0;
    // }

    mas.addEventListener('click', function () {
        // console.log("se si clic a mas ");
        // let cantidad =  numProduct.value;
        // console.log(cantidad);
        let operacion = parseInt(numProduct.value) + 1;
        numProduct.value = operacion;
    });

    menos.addEventListener('click', function () {
        // console.log("se si clic a menos");
        let operacion = parseInt(numProduct.value) - 1;
        numProduct.value = operacion;

        if(parseInt(numProduct.value) < 0){
            numProduct.value = 0;
        }
    });
    /*---------------------------cantidad de productos----------------------------------- */





                                                 
});