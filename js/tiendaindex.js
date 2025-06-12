const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const botonTotal = document.getElementById('totalCarrito');

let productosCarrito = [];

function cargarCarritoStorage(){
    productosCarrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    insertarElemento();
    actualizarTotal();
}
cargarCarritoStorage();

cargarEventListener();

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
    actualizarCarrito(infoElemento);
}

function actualizarCarrito(elemento) {
    // Agregar producto al array del carrito
    productosCarrito.push(elemento);
    // Actualizar el carrito
    insertarElemento();
    // Actualizar el total
    actualizarTotal();
    //guarda los cambios en sessionStorage
    guardarCarrito()

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
        //guarda el estado actualizado del carrito
        guardarCarrito()

    }
}

function vaciarCarrito() {
    productosCarrito = [];
    insertarElemento();
    actualizarTotal();
    sessionStorage.removeItem("carrito");
    guardarCarrito();
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

function actualizarTotal() {
    const totalCompra = productosCarrito.reduce((total, producto) => total + producto.precio, 0);
    botonTotal.innerHTML = `<span>$ ${totalCompra.toFixed(2)}</span>`;
}

function guardarCarrito (){
    sessionStorage.setItem("carrito", JSON.stringify(productosCarrito));
};


//carga informacion desde info-prod.js para cada seccion, ofertas

window.addEventListener('DOMContentLoaded', function(){
    let rutaPaginaSeccionada  = window.location.pathname.split("/").pop(); //ruta del archivo html a redirigir
    const contenedorProductos = document.querySelector('.product-content'); //contenedor padre donde se cargara todos los cambios de acuerdo a cada pagona visitada

    if(rutaPaginaSeccionada === "ofertas.html"){
        const tituloPaginaSeccion = document.querySelector("h2");
        tituloPaginaSeccion.innerText= `Ofertas Especiales`;

        const productosOfertas = infoProductos.ofertas;
        productosOfertas.forEach(producto=>{
            const divProducto = document.createElement('div');
            divProducto.className = 'product';
        
            divProducto.innerHTML = `
                    <img src=${producto.img} alt="${producto.nombre}">
                    <div class="product-txt">
                        <h3>${producto.nombre}</h3>
                        <p>Estilo Unico</p>
                        <p class="precio"  data-precio="${producto.precio}">$${producto.precio}</p>
                        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar a carrito</a>
                    </div>
            `;
            contenedorProductos.appendChild(divProducto);
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
    }
})


//ingresar usuario
const btnIngresar = document.getElementById('btn-ingresar');
const body = document.body;
const contenedorIngresarUsuario = document.querySelector('.seccion-ingreso');
const contenedorFormularioIngresarUsuario = document.querySelector('.datos-ingresar');

btnIngresar.addEventListener('click', ()=>{
    contenedorIngresarUsuario.classList.add('seccion-ingreso-visible')
    body.style.overflow = 'hidden';
})
    //funciona para cerrar seccion
function cerrarContenedor(){
    contenedorIngresarUsuario.classList.remove('seccion-ingreso-visible');
    body.style.overflow = '';
    //para evitar que estos eventos obstuyan la ejecucion
    window.removeEventListener('click', clickFuera);
    window.removeEventListener('click', teclaEscape);
}

    //Detectar click fuera de seccion
function clickFuera(event){
    if(!contenedorFormularioIngresarUsuario.contains(event.target)&& event.target !==btnIngresar){
        cerrarContenedor();
    }
}
document.addEventListener('click', clickFuera)

    //Detectar pulsar tecla escape
function teclaEscape(event){
    if(event.key === 'Escape'){
        cerrarContenedor()
    }
}

//Aadir evento al click a la tecla
window.addEventListener('click', clickFuera);
window.addEventListener('keydown', teclaEscape);

//funcion para ingresar usurario
const formularioIngresar = document.querySelector('.datos-ingresar');

formularioIngresar.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    const correo = document.getElementById('correo-ingresar').value.trim();
    const clave = document.getElementById('clave-ingresar').value.trim();
    if(correo === '' || clave === ''){
        alert('faltan datos')//aqui entra frontend codear vosualizacion de erros
        return;
    }
    console.log(correo, clave)
    try{
        //realiza la peticion al servidor
        const response = await fetch('/api/auth/login',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({correo, contrasena: clave})
        })
        console.log(response);
        if(!response.ok){
            throw new Error(`Error en el servidor ${response.status}`)
        }

        const data = await response.json();
        console.log('Respuesta del servidor: ', data);

        if(data.success){
            console.log('Inicio de sesión exitoso');
            alert("Inicio de sesion");
        
            window.location.href = "/html/tiendaIndex.html";
        
    //     // mostrarMensajeBienvenidaUsuario(); //Aqui se inserta un mensaje es los html indicando que el usuario esta con sus datos
        }else{
        alert("correo o clave incorrecta")
    }}catch(error){
        console.log('Error en la peticion: ', error);
        alert('hubo problemas al conectar el servidor')
    }
})


formularioIngresar.addEventListener('submit', ()=>{

})
// mensaje de bienvenida de usuario

// function mostrarMensajeBienvenidaUsuario(){
//     const headerMsj = document.querySelector('header');
//     const msjBienvenidaUsuario = document.createElement('div');
//     msjBienvenidaUsuario.classList.add('msjBienvenidaUsuario');
//     msjBienvenidaUsuario.innerHTML =  `<p id="mensajeBienvenida">Bienvenido XXXXXXXXXXXXDDDXX, estamos listos para atender tu compra  <i class="fa-solid fa-handshake"></i></p>`;

//     headerMsj.appendChild(msjBienvenidaUsuario);
// }
