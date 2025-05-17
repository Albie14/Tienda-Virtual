//carga informacion desde info-prod.js

const contenedorProductos = document.querySelector('.product-content');
const productosOfertas = infoProductos.ofertas;
console.log(productosOfertas)
productosOfertas.forEach(producto=>{

    const divProducto = document.createElement('div');
        divProducto.className = 'product';
    
        divProducto.innerHTML = `
                <img src=${producto.img} alt="${producto.nombre}">
                <div class="product-txt">
                    <h3>${producto.nombre}</h3>
                    <p>Estilo Unico</p>
                    <p class="precio"  data-precio="${producto.precio}">$${producto.precio}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="600">Agregar a carrito</a>
                </div>
        `;

        contenedorProductos.appendChild(divProducto);


})






