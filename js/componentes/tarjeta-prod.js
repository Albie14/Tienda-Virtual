    class ProductosItem extends HTMLElement{
        set data(producto){
            this.innerHTML =`
                <div class="product">
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <div class="product-txt">
                        <h3>${producto.nombre}</h3>
                        <p>se adapta a ti</p>
                        <p class="precio"  data-precio=${producto.precio}>$${producto.precio}</p>
                        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar a carrito</a>
                    </div>
                </div>
            `;
        }
    }
    customElements.define('producto-item', ProductosItem);

