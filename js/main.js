//carga dinamica de productos de desde componentes

import { infoProductos } from "./componentes/info-prod.js";
import './componentes/tarjeta-prod.js';
console.log(infoProductos);

const contenedorProductos = document.querySelector('.product-content');
const productosHome = infoProductos.home;
console.log(productosHome);

productosHome.forEach(producto=>{
    const item = document.createElement('producto-item');   
    item.data = producto;
    contenedorProductos.appendChild(item)
});
