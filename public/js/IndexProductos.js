// https://www.w3schools.com/jsref/prop_style_transform.asp
// https://developer.mozilla.org/es/docs/Web/CSS/transform-function/scale()
window.addEventListener('load', function () {
    // console.log("gola mundo desde index ");

    const productos = document.querySelectorAll('.articulo.item');

    for (let i = 0; i < productos .length; i++) {
        
        productos[i].addEventListener('mouseover', function () {
             console.log('has pasado por encima de producto');
             productos[i].style.transform = "scale(1.1)";
             
        });

        productos[i].addEventListener('mouseout', function () {
            console.log('has pasado por encima de producto');
            productos[i].style.transform = "scale(1)";
            
       });
    }


});
