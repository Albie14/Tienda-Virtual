//carga dinamica de productos de desde componentes
import { infoProductos } from "./componentes/info-prod.js";
import './componentes/tarjeta-prod.js';
import './componentes/titulo-pagina.js';
import './componentes/contenedor-oferta.js';
import './componentes/contenedor-iconos.js';
import './componentes/contenedor-blog.js';
import './componentes/contenedor-footer.js';
import './componentes/contenedor-header.js';
import './componentes/contenedor-seccion-ingreso.js';

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

//inteaccion carrito de compra, carga, eliminacion de productos
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


//ingresar usuario
const btnIngresar = document.getElementById('btn-ingresar');
const body = document.body;
const contenedorIngresarUsuario = document.querySelector('.seccion-ingreso');
const contenedorFormularioIngresarUsuario = document.querySelector('.datos-ingresar');

btnIngresar.addEventListener('click', ()=>{
    contenedorIngresarUsuario.classList.add('seccion-ingreso-visible')
    body.style.overflow = 'hidden';
    
    //para evitar que estos eventos obstuyan la ejecucion, se incluyen los eventos aqui para que funcione siempre que se abre la seccion
    document.addEventListener('keydown', teclaEscape);
})
    //funciones para cerrar seccion Ingreso
function cerrarContenedor(){
    contenedorIngresarUsuario.classList.remove('seccion-ingreso-visible');
    body.style.overflow = '';
    document.removeEventListener('keydown', teclaEscape);
}
    //Detectarc click en boton cerrar
const btnCerrarSeccionIngreso = document.querySelector('.iconoCerrarSeccionIngreso');
btnCerrarSeccionIngreso.addEventListener('click', ()=>{
    cerrarContenedor()
})

    //Detectar pulsar tecla escape para que cierre la seccion que constiene el formulario
function teclaEscape(event){
    if(event.key === 'Escape'){
        cerrarContenedor()
    }
}

//funcion para ingresar usurario
const formularioIngresar = document.querySelector('.datos-ingresar');

formularioIngresar.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    const correoInput = document.getElementById('correo-ingresar');
    const claveInput = document.getElementById('clave-ingresar');

    const correo = correoInput.value.trim();
    const clave = claveInput.value.trim()

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
        const data = await response.json(); // leer la respuesta del backend para saber el tipo de error
        
        if(!response.ok){
            if (response.status === 401 || response.status === 400) {
                
                if(data.error === 'correo_incorrecto'){
                const iconError = document.getElementById('icon-err-correo');
                const msjError = document.getElementById('msj-err-correo');
    
                correoInput.classList.add('dato-errado-ingresar');
                iconError.style.opacity = 1;
                msjError.style.opacity = 1;
                
                setTimeout(()=>{
                    correoInput.classList.remove('dato-errado-ingresar');
                    iconError.style.opacity = 0;
                    msjError.style.opacity = 0;
                    correoInput.value = '';
                }, 2000);
        
                }else if(data.error === 'clave_incorrecta'){
                const iconError = document.getElementById('icon-err-clave');
                const msjError = document.getElementById('msj-err-clave');
    
                claveInput.classList.add('dato-errado-ingresar');
                iconError.style.opacity = 1;
                msjError.style.opacity = 1;
                
                setTimeout(()=>{
                    claveInput.classList.remove('dato-errado-ingresar');
                    iconError.style.opacity = 0;
                    msjError.style.opacity = 0;
                    claveInput.value = '';
                }, 2000);

            }
            }
            return;
        }
    
        if(data.success){
            sessionStorage.setItem('usuario', JSON.stringify({
                correo: data.correo,
                nombre: data.nombre,
                apellido: data.apellido,
                token: data.token                      
            }));
                window.location.href = "/html/tiendaIndex.html";
        }
    }catch(error){
        alert('hubo problemas al conectar el servidor')
    }
})

// funcion para recuperar y/o cambiar clave se acceso
const expresionesPermitidadForm = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const containerModificacionClave = document.querySelector('.container-cambio-clave');
const seccionClaveRecuperacion = document.querySelector('.grupo-clave-por-defecto');
const formularioDatosRecuperarClave = document.getElementById('form-datos-recuperar-clave');
const formularioValidarClave = document.getElementById('form-verificacion-clave-defecto');
const formularioRegistroNuevaClave = document.getElementById('form-nueva-clave');

const btnModificarClaveAcceso = document.querySelector('.bnt-modificar-clave');
// se muestra solo la parte para validar correo y enviar la clave de autenticacion
btnModificarClaveAcceso.addEventListener('click', ()=>{
    formularioIngresar.classList.remove('cambio-clave-visible');
    containerModificacionClave.classList.add('cambio-clave-visible');
    seccionClaveRecuperacion.classList.add('cambio-clave-visible');
    formularioDatosRecuperarClave.style.opacity = 1;
})

formularioDatosRecuperarClave.addEventListener('submit', (e)=>{
    e.preventDefault()
    const inputCorreoRecuperacion = document.getElementById('correo-recuperacion');      
    
    //visuales de error asociados a los id de los inputs
    const iconErrorId = inputCorreoRecuperacion.dataset.iconoId;
    const mensajeErrorId = inputCorreoRecuperacion.dataset.msjId;
    const iconError = document.getElementById(iconErrorId);
    const msjError = document.getElementById(mensajeErrorId);
    const correo = inputCorreoRecuperacion.value.trim();
    
    if(correo === ''|| !expresionesPermitidadForm.correo.test(correo)){
        iconError.style.opacity = 1;
        msjError.style.opacity = 1;
        setTimeout(()=>{
            iconError.style.opacity = 0;
            msjError.style.opacity = 0;

        }, 2000);
        return
    }
    fetch('http://localhost:3001/api/auth/verificacion-email', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({correo})
        })
        .then(response => {
            console.log(response);
            if(!response.ok){
                throw new Error('no se pudo verificar correo');
            }
            return response.json()
        })
        .then(data =>{
            console.log(data)
        })
        .catch(err=>{
            console.error('Error en verificacion: ', err.menssage)
        })
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

