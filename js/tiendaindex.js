const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const botonTotal = document.getElementById('totalCarrito');

cargarEventListener();

function cargarEventListener(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}


function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: parseInt(elemento.querySelector('a').getAttribute('data-id')),
    }
    insertarCarrito(infoElemento);
}   


function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100>
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href='#' class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    
    lista.appendChild(row);
}       


function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoId;
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}

//Movimiento de las imagenes del header
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');

function modificarClase1(){
    img1.classList.toggle('noVisible');
}
function modificarClase2(){
    img2.classList.toggle('noVisible');

}

const iniciarImagen = setInterval(modificarClase1, 5000);
const iniciarImagen2 = setInterval(modificarClase2, 5000);








