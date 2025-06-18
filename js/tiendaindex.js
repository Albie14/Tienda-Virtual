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
        alert('faltan datos')//aqui entra frontend codear visualizacion de error
        return;
    }
    try{
        //realiza la peticion al servidor para ingresar usuario, con el correo y la clave
        const response = await fetch('/api/auth/login',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({correo, contrasena: clave})
        })
        //Error generado en el Front al ingresar datos en el formulario que no concuerde con lo almacenado en la base de datos
        if (response.status === 401 || response.status === 400) {
           

            const data = await response.json(); // leer la respuesta del backend para saber el tipo de error
             console.log('Respuesta del backend:', data);
            if(data.error === 'correo_incorrecto'){
                alert('CORREO incorrecto');
        
            }else if(data.error === 'clave_incorrecta'){
                alert('CLAVE incorrecta');

            }else{
                alert('Correo o clave incorrecta');
            }  
            return;
        }

        //Error en form generado en el Back
        if(!response.ok){
            throw new Error(`Error en el servidor ${response.status}`)
        }

        const data = await response.json();
    
        if(data.success){
            sessionStorage.setItem('usuario', JSON.stringify({
                correo: data.correo,
                nombre: data.nombre,
                apellido: data.apellido,
                token: data.token                      
            }));
                window.location.href = "/html/tiendaIndex.html";
        }else{
        // alert("correo o clave incorrecta")
    }}catch(error){
        alert('hubo problemas al conectar el servidor')
    }
})


// mensaje de bienvenida de usuario
const usuarioGuardado= JSON.parse(sessionStorage.getItem('usuario'));
const grupoBotonesAbrir = document.getElementById('grupo-botones-ingresar');
const grupoBotonesCerrar = document.getElementById('grupo-botones-cerrar');
const headerMsj = document.querySelector('header');
const msjBienvenidaUsuario = document.createElement('div');

if(usuarioGuardado){
    msjBienvenidaUsuario.classList.add('msjBienvenidaUsuario');
    msjBienvenidaUsuario.innerHTML =  `<p id="mensajeBienvenida">Bienvenido ${usuarioGuardado.nombre} ${usuarioGuardado.apellido}, estamos listos para atender tu compra  <i class="fa-solid fa-handshake"></i></p>`;
    headerMsj.appendChild(msjBienvenidaUsuario);
    grupoBotonesAbrir.classList.add('oculto');
    grupoBotonesCerrar.classList.remove('oculto');
}

grupoBotonesCerrar.addEventListener('click', ()=>{
    sessionStorage.clear('usuario'); //cerrar la sesion
    sessionStorage.clear("carrito", JSON.stringify(productosCarrito));
    window.location.href = "/html/tiendaIndex.html"; //redireccionar a index

    grupoBotonesCerrar.classList.add('oculto'); //quitar boton de cerrar sesion
    grupoBotonesAbrir.classList.remove('oculto');   //activar boton de abrir sesion
    headerMsj.removeChild(msjBienvenidaUsuario);  //elimininar msj de bienvenida
})