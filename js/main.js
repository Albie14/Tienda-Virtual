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
    const contenedorProductos = document.querySelector('.product-content'); //contenedor padre donde se cargara todos los cambios de acuerdo a cada pagina visitada
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
const usuarioGuardado= JSON.parse(sessionStorage.getItem('usuario'));

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
    if(!usuarioGuardado){
        alert ('debe ingresar usuario y clave')
        return
    }
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
const formularioIngresarUsuario = document.querySelector('#datos-ingresar');

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
    containerModificacionClave.classList.remove('cambio-clave-visible');
    seccionClaveRecuperacion.classList.remove('cambio-clave-visible');
    formularioIngresarUsuario.classList.add('cambio-clave-visible')

    const correoInput = document.getElementById('correo-ingresar');
    correoInput.value = '';
    const claveInput = document.getElementById('clave-ingresar');
    claveInput.value = '';

    document.removeEventListener('keydown', teclaEscape);
    restablecerIconosOjos();

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
formularioIngresarUsuario.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const correoInput = document.getElementById('correo-ingresar');
    const claveInput = document.getElementById('clave-ingresar');

    const correo = correoInput.value.trim();
    const clave = claveInput.value.trim()

    if(correo === '' || clave === ''){
        errorEnInput('correo-ingresar');
        errorEnInput('clave-ingresar')
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
                    errorEnInput('correo-ingresar')
        
                }else if(data.error === 'clave_incorrecta'){
                    errorEnInput('clave-ingresar');
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
                restablecerIconosOjos()
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

const btnModificarClaveAcceso = document.querySelector('.bnt-modificar-clave');
// se muestra solo la parte para validar correo y enviar la clave de autenticacion
btnModificarClaveAcceso.addEventListener('click', ()=>{
    formularioIngresarUsuario.classList.remove('cambio-clave-visible');
    containerModificacionClave.classList.add('cambio-clave-visible');
    seccionClaveRecuperacion.classList.add('cambio-clave-visible');
    formularioDatosRecuperarClave.style.opacity = 1;
})

//Variable que almacenara el correo que se valida en el back (esta en base de datos), para posteriormente cambiar la clave
let correoVerificado = null;
formularioDatosRecuperarClave.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputCorreoRecuperacion = document.getElementById('correo-recuperacion');   
    const correo = inputCorreoRecuperacion.value.trim();
    if(correo === ''|| !expresionesPermitidadForm.correo.test(correo)){
        errorEnInput('correo-recuperacion');
        return
    }
    fetch('http://localhost:3001/api/auth/verificacion-email', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({correo})
        })

        .then(async response =>{
            if(!response.ok){
                const errorData = await response.json();
                if(response.status === 404){
                    errorEnInput('correo-recuperacion')
                    return
                }else{
                    console.log('error en el servidor: ', errorData.mensaje)
                }
                return;
            }
            const data = await response.json();
            console.log('clave temporal: ', data.claveTemporalUnica);
            const formValidarClaveDefecto = document.getElementById('form-verificacion-clave-defecto');
            formValidarClaveDefecto.style.opacity = 1;

            formValidarClaveDefecto.addEventListener('submit', (e)=>{
                e.preventDefault();

                const claveTemporal = parseInt(data.claveTemporalUnica);
                const inputValidarClaveDefecto = document.getElementById('clave-defecto');   
                const valueInput = parseInt(inputValidarClaveDefecto.value.trim())

                if(valueInput === claveTemporal){
                    const seccionNuevaClave = document.querySelector('.grupo-nueva-clave');
                    seccionNuevaClave.classList.add('cambio-clave-visible');
                    seccionClaveRecuperacion.classList.remove('cambio-clave-visible');
                }else{
                    errorEnInput('clave-defecto');                  
                }
            });
            //se almacena aqui el correo que cambiara su clave de acceso
            correoVerificado = correo;
        })
        .catch(err=>{
            console.error('Error en verificacion: ', err.message)
        })
})

//Actualizar clave
const formularioRegistroNuevaClave = document.getElementById('form-nueva-clave');
formularioRegistroNuevaClave.addEventListener('submit', (e)=>{
    e.preventDefault();

    const inputNuevaClave = document.getElementById('nueva-clave');
    const inputConfirmacionNuevaClave = document.getElementById('confirmacion-nueva-clave');
    const nuevaClave = inputNuevaClave.value;
    const confirmacionNuevaClave = inputConfirmacionNuevaClave.value;
        
    if(nuevaClave == '' || !expresionesPermitidadForm.password.test(nuevaClave)){
        errorEnInput('nueva-clave');
        return
    }
    if(confirmacionNuevaClave == '' || confirmacionNuevaClave != nuevaClave || !expresionesPermitidadForm.password.test(confirmacionNuevaClave)){
        errorEnInput('confirmacion-nueva-clave');
        return
    }
    fetch('http://localhost:3001/api/auth/actualizar-clave', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({correo: correoVerificado, nuevaContrasena: nuevaClave})
        })
        .then(res=>{
            if(!res.ok) throw new Error ('Error al actualizar clave');
            return res.json()
        })
        .then(data=>{

            inputNuevaClave.value = '';
            inputConfirmacionNuevaClave.value = '';
            restablecerIconosOjos()
            limpiarFormNuevaClave();

        })

        .catch(err =>{
            console.error('Error al actualizar clave:', err.message);
        })
})

function limpiarFormNuevaClave(){
    containerModificacionClave.classList.remove('cambio-clave-visible');
    seccionClaveRecuperacion.classList.remove('cambio-clave-visible');
    formularioIngresarUsuario.classList.add('cambio-clave-visible')
    formularioIngresarUsuario.innerHTML = `
        <h2 id="clave-actualizada">Clave Actualizada !!!!</h2>
    `
        setTimeout(()=>{
            window.location.reload();
        }, 2000)
}

//senales visuales que muestran errores en input icono y msj error
function errorEnInput(idInput){
    const input = document.getElementById(idInput)
    const iconoError = document.getElementById(`icon-err-${idInput}`);
    const mensajeError = document.getElementById(`msj-err-${idInput}`);
    if(input){
        setTimeout(() =>{
            input.value = '';
        }, 3000);
    }
    if(iconoError){
        iconoError.style.opacity = 1;
            setTimeout(()=>{
                iconoError.style.opacity = 0;
            }, 3000);
    }
    if(mensajeError){
        mensajeError.style.opacity = 1;
            setTimeout(()=>{
                mensajeError.style.opacity = 0
            }, 3000)
    }
}
//mostrar y ocultar clave
const botonesOjoClave = document.querySelectorAll('.icono-toogle-clave');
botonesOjoClave.forEach(ojo=>{
    ojo.addEventListener('click', ()=>{
        const inputID = ojo.dataset.input; /*toma el ID de cada input enlazados con "data-input=" provenient del id de input*/
        const input = document.getElementById(inputID) /*asigna el id al input seleccionado a traves del data input*/
        const typeInput = input.getAttribute('type') /*reconoce el type (password o text) del input seleccionado*/
        
        input.setAttribute('type', typeInput === 'password' ? 'text' : 'password');
        ojo.classList.toggle('fa-eye');
        ojo.classList.toggle('fa-eye-slash');
        ojo.classList.toggle('mostrar-clave');
    });
})

function restablecerIconosOjos (type){
    const input = type
    botonesOjoClave.forEach(ojo=>{
        document.querySelectorAll('[data-input]').forEach(icono => {
        const input = document.getElementById(icono.dataset.input);
            if (input) input.type = 'password';
        }); 
        ojo.classList.remove('fa-eye-slash');
        ojo.classList.add('fa-eye')
        ojo.classList.remove('mostrar-clave');
        })
}

// mensaje de bienvenida de usuario
const grupoBotonesAbrir = document.getElementById('grupo-botones-ingresar');
const grupoBotonesCerrar = document.getElementById('grupo-botones-cerrar');
const headerMsj = document.querySelector('header');
const msjBienvenidaUsuario = document.createElement('div');

const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

btnCerrarSesion.addEventListener('click', (e)=>{
    if(e.target != e.currentTarget){ /* se hace pa evitar que la propagacion de eventos, que este mismo evento se active con otros elementos que tambien puede recibirlos por mal definicion */
        e.stopPropagation()
        return
    }
    sessionStorage.removeItem('usuario'); //cerrar la sesion, quita el usuario
    sessionStorage.clear("carrito", JSON.stringify(productosCarrito));
    window.location.href = "/html/tiendaIndex.html"; //redireccionar a index
    grupoBotonesCerrar.classList.add('oculto'); //quitar boton de cerrar sesion
    grupoBotonesAbrir.classList.remove('oculto');   //activar boton de abrir sesion
    headerMsj.removeChild(msjBienvenidaUsuario);  //elimininar msj de bienvenida
})
if(usuarioGuardado){
    msjBienvenidaUsuario.classList.add('msjBienvenidaUsuario');
    msjBienvenidaUsuario.innerHTML =  `<p id="mensajeBienvenida">Bienvenido ${usuarioGuardado.nombre} ${usuarioGuardado.apellido}, estamos listos para atender tu compra  <i class="fa-solid fa-handshake"></i></p>`;
    headerMsj.appendChild(msjBienvenidaUsuario);
    grupoBotonesAbrir.classList.add('oculto');
    grupoBotonesCerrar.classList.remove('oculto');

}

