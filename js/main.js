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
    
    const titulo = document.querySelector('titulo-pagina'); //seccion que modifica el titulo de las paginas
    if(rutaPaginaSeccionada === "ofertas.html"){
        titulo.setAttribute('texto', 'Ofertas');

        productosOfertas.forEach(producto=>{
            const item = document.createElement('producto-item');   
            item.data = producto;
            contenedorProductos.appendChild(item)
        });
    }else if(rutaPaginaSeccionada === "caballeros.html"){
        titulo.setAttribute('texto', 'Caballeros');

        productosCaballeros.forEach(producto=>{
            const item = document.createElement('producto-item');   
            item.data = producto;
            contenedorProductos.appendChild(item)
        });

    }else if(rutaPaginaSeccionada === "damas.html"){
        titulo.setAttribute('texto', 'Damas');

        productosDamas.forEach(producto=>{
            const item = document.createElement('producto-item');   
            item.data = producto;
            contenedorProductos.appendChild(item)
        });
    }else{
        titulo.setAttribute('texto', 'Temporada Invierno 2025');
        productosHome.forEach(producto=>{
            const item = document.createElement('producto-item');   
            item.data = producto;
            contenedorProductos.appendChild(item)
        });
    }
})


