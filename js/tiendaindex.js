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


//verificacion registro formulario

const expresionesPermitidadForm = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const formulario = document.getElementById('formulario');
const btnEnviarFormulario = document.querySelector('.formularioBtn');


function validacionFormulario(e){
    e.preventDefault();

    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let clave = document.getElementById('password');
    let claveVerificacion = document.getElementById('password2');
    let correo = document.getElementById('correo');
    let telefono = document.getElementById('telefono');
    const checkTerminos  = document.getElementById('checkTerminos');
    const iconoError = document.querySelectorAll('.iconoError');
    const textoError = document.querySelectorAll('.formularioInputError');
    const mensajeErrorFormulario = document.querySelector('.formularioMensaje');

    if(!expresionesPermitidadForm.nombre.test(nombre.value)){
        mostrarMensajesError(nombre, iconoError[0], textoError[0], mensajeErrorFormulario)

        // nombre.classList.add('errorEnDatoFormulario');
        // iconoError[0].style.opacity = 1;
        // textoError[0].style.opacity = 1;
        // mensajeErrorFormulario.style.opacity = 1;
        //     setTimeout(()=>{
        //         nombre.classList.remove('errorEnDatoFormulario');
        //         iconoError[0].style.opacity = 0;
        //         textoError[0].style.opacity = 0;
        //         mensajeErrorFormulario.style.opacity = 0;
        //         nombre.value = '';
        //     }, 2000)
    }

    // if(!expresionesPermitidadForm.nombre.test(apellido.value)){
    //     apellido.classList.add('errorEnDatoFormulario');
    //     iconoError[1].style.opacity = 1;
    //     textoError[1].style.opacity = 1;
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             apellido.classList.remove('errorEnDatoFormulario');
    //             iconoError[1].style.opacity = 0;
    //             textoError[1].style.opacity = 0;
    //             mensajeErrorFormulario.style.opacity = 0;
    //             apellido.value = '';
    //         }, 2000)
    // }

    // if(!expresionesPermitidadForm.password.test(clave.value)){
    //     clave.classList.add('errorEnDatoFormulario');
    //     iconoError[2].style.opacity = 1;
    //     textoError[2].style.opacity = 1;
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             clave.classList.remove('errorEnDatoFormulario');
    //             iconoError[2].style.opacity = 0;
    //             textoError[2].style.opacity = 0;
    //             mensajeErrorFormulario.style.opacity = 0;
    //             clave.value = '';
    //         }, 2000)
    // }

    // if(!expresionesPermitidadForm.password.test(claveVerificacion.value) || clave.value != claveVerificacion.value){
    //     claveVerificacion.classList.add('errorEnDatoFormulario');
    //     iconoError[3].style.opacity = 1;
    //     textoError[3].style.opacity = 1;
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             claveVerificacion.classList.remove('errorEnDatoFormulario');
    //             iconoError[3].style.opacity = 0;
    //             textoError[3].style.opacity = 0;
    //             mensajeErrorFormulario.style.opacity = 0;
    //             claveVerificacion.value = '';
    //         }, 2000)
    // }
    
    // if(!expresionesPermitidadForm.correo.test(correo.value)){
    //     correo.classList.add('errorEnDatoFormulario');
    //     iconoError[4].style.opacity = 1;
    //     textoError[4].style.opacity = 1;
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             correo.classList.remove('errorEnDatoFormulario');
    //             iconoError[4].style.opacity = 0;
    //             textoError[4].style.opacity = 0;
    //             mensajeErrorFormulario.style.opacity = 0;
    //             correo.value = '';
    //         }, 2000)
    // }
    
    // if(!expresionesPermitidadForm.telefono.test(telefono.value)){
    //     telefono.classList.add('errorEnDatoFormulario');
    //     iconoError[5].style.opacity = 1;
    //     textoError[5].style.opacity = 1;
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             telefono.classList.remove('errorEnDatoFormulario');
    //             iconoError[5].style.opacity = 0;
    //             textoError[5].style.opacity = 0;
    //             mensajeErrorFormulario.style.opacity = 0;
    //             telefono.value = '';
    //         },2000)
    // }

    // if(checkTerminos.checked){
    //     mensajeErrorFormulario.style.opacity = 1;
    //         setTimeout(()=>{
    //             mensajeErrorFormulario.style.opacity = 0;
    //         }, 2000)

    //     return false
    // }

}

function mostrarMensajesError(input, icono, texto, mensaje){
    input.classList.add('errorEnDatoFormulario');
    icono.style.opacity = 1;
    texto.style.opacity = 1;
    mensaje.style.opacity = 1;
        setTimeout(()=>{
            input.classList.remove('errorEnDatoFormulario');
            icono.style.opacity = 0;
            texto.style.opacity = 0;
            mensaje.style.opacity = 0;
        }, 2000)
    


}   


btnEnviarFormulario.addEventListener('click', (e)=>{
    validacionFormulario(e);
});

