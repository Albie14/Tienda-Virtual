//carga dinamica de productos de desde componentes

import { infoProductos } from "./componentes/info-prod.js";
import './componentes/tarjeta-prod.js';
import './componentes/titulo-pagina.js';

//carga informacion desde info-prod.js para cada seccion, ofertas
window.addEventListener('DOMContentLoaded', function(){
    let rutaPaginaSeccionada  = window.location.pathname.split("/").pop(); //ruta del archivo html a redirigir
    const contenedorProductos = document.querySelector('.product-content'); //contenedor padre donde se cargara todos los cambios de acuerdo a cada pagona visitada
    // arreglos con informacion de productos por pagina
    const productosHome = infoProductos.home;
    const productosOfertas = infoProductos.ofertas;
    const productosDamas = infoProductos.Damas;
    const productosCaballeros = infoProductos.Caballeros;
    
    if(rutaPaginaSeccionada === "ofertas.html"){
        const tituloPaginaSeccion = document.querySelector("h2");
        tituloPaginaSeccion.innerText= `Ofertas Especiales`;

        productosOfertas.forEach(producto=>{
        const item = document.createElement('producto-item');   
        item.data = producto;
        contenedorProductos.appendChild(item)
});
    }else if(rutaPaginaSeccionada === "caballeros.html"){
        const tituloPaginaSeccion = document.querySelector("h2");
        tituloPaginaSeccion.innerText= `Caballeros`;

        const productosCaballeros = infoProductos.Caballeros;
        productosCaballeros.forEach(producto=>{
            const divProducto = document.createElement('div');
            divProducto.className = 'product';
        
            divProducto.innerHTML = `
                    <img src=${producto.img} alt="${producto.nombre}">
                    <div class="product-txt">
                        <h3>${producto.nombre}</h3>
                        <p>para todos los dias</p>
                        <p class="precio"  data-precio="${producto.precio}">$${producto.precio}</p>
                        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar a carrito</a>
                    </div>
            `;
            contenedorProductos.appendChild(divProducto);
        });
    }else if(rutaPaginaSeccionada === "damas.html"){
        const tituloPaginaSeccion = document.querySelector("h2");
        tituloPaginaSeccion.innerText= `Damas`;

        const productosCaballeros = infoProductos.Damas;
        productosCaballeros.forEach(producto=>{
            const divProducto = document.createElement('div');
            divProducto.className = 'product';
        
            divProducto.innerHTML = `
                    <img src=${producto.img} alt="${producto.nombre}">
                    <div class="product-txt">
                        <h3>${producto.nombre}</h3>
                        <p>para todos los dias</p>
                        <p class="precio"  data-precio="${producto.precio}">$${producto.precio}</p>
                        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar a carrito</a>
                    </div>
            `;
            contenedorProductos.appendChild(divProducto);
        });
    }else{
        // this.document.querySelector('titulo-pagina').setAttribute('texto', 'Temporada Invierno 2025');
        const titulo = document.querySelector('titulo-pagina');
        
        titulo.setAttribute('texto', 'Temporada Invierno 2025');
        productosHome.forEach(producto=>{
            const item = document.createElement('producto-item');   
            item.data = producto;
            contenedorProductos.appendChild(item)
        });
    }
})


