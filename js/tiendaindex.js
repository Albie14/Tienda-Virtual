const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const botonTotal = document.getElementById('totalCarrito');

cargarEventListener();

let productosCarrito = [];

function cargarEventListener() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('$', '')),
        id: parseInt(elemento.querySelector('a').getAttribute('data-id')),
    }
    actulizarCarrito(infoElemento);
}

function actulizarCarrito(elemento) {
    // Agregar producto al array del carrito
    productosCarrito.push(elemento);

    // Actulizar el carrito
    insertarElemento();

    // Actualizar el total
    actualizarTotal();
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elementoId = parseInt(e.target.getAttribute('data-id'));
        // Eliminar del array por id
        productosCarrito = productosCarrito.filter(producto => producto.id !== elementoId);

        // actulizar el carrito
        insertarElemento();

        // Actualizar el total
        actualizarTotal();
    }
}

function vaciarCarrito() {
    productosCarrito = [];
    insertarElemento();
    actualizarTotal();
    return false;
}

function insertarElemento() {
    // Limpiar el tbody
    lista.innerHTML = '';
    // Volver a agregar los productos
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                $${producto.precio.toFixed(2)}
            </td>
            <td>
                <a href='#' class="borrar" data-id="${producto.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });
}
    //monto carrito desde inicio en cero
botonTotal.innerHTML = `<span>$ 0.00</span>` 

function actualizarTotal() {
    const totalCompra = productosCarrito.reduce((total, producto) => total + producto.precio, 0);
    botonTotal.innerHTML = `<span>$ ${totalCompra.toFixed(2)}</span>`;
}
