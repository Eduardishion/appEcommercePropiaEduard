window.addEventListener('load', function () {
    console.log("hola desde script para detalle..");


    let enlaces = document.querySelectorAll('a.enlaceIma');
    

    // referencia
    // https://www.codegrepper.com/code-examples/javascript/javascript+how+to+get+image+src
    // https://www.codegrepper.com/code-examples/javascript/get+image+from+javascript
    // https://www.w3schools.com/jsref/dom_obj_all.asp
    // https://www.w3schools.com/jsref/dom_obj_all.asp


    // console.log(enlaces.length);
    for (let i = 0; i < enlaces.length; i++) {
        // console.log(enlaces[i]);   
        enlaces[i].addEventListener('mouseover', function () {
    	// body...
	    	// console.log('has pasado por el enlace');
	    	// console.log(enlaces[i].children);

	    	//console.log(enlaces[i].childNodes[1].currentSrc);
	    	
	    	//imaPrin.src="../template/save.png";

	    	//console.log('#imaSec'+1);	
	    	let imaPrin = document.querySelector('#imaPrin');
	    	imaPrin.src = enlaces[i].childNodes[1].currentSrc;
	    	// console.log(imaPrin);
	    	
	    });

    }

 

});