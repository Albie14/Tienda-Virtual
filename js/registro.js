const expresionesPermitidadForm = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};


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
    const iconoError = document.querySelectorAll('.iconoError');
    const textoError = document.querySelectorAll('.formularioInputError');
    const mensajeErrorFormulario = document.querySelector('.formularioMensaje');

    let formularioValido = true;

    if(!expresionesPermitidadForm.nombre.test(nombre.value)){
        mostrarMensajesError(nombre, iconoError[0], textoError[0], mensajeErrorFormulario);
        formularioValido = false
    }

    if(!expresionesPermitidadForm.nombre.test(apellido.value)){
        mostrarMensajesError(apellido, iconoError[1], textoError[1], mensajeErrorFormulario);
        formularioValido = false
    }

    if(!expresionesPermitidadForm.password.test(clave.value)){
        mostrarMensajesError(clave, iconoError[2], textoError[2], mensajeErrorFormulario);
        formularioValido = false
    }

    if(!expresionesPermitidadForm.password.test(claveVerificacion.value) || clave.value != claveVerificacion.value){
        mostrarMensajesError(claveVerificacion, iconoError[3], textoError[3], mensajeErrorFormulario)
        formularioValido = false
    }
    
    if(!expresionesPermitidadForm.correo.test(correo.value)){
        mostrarMensajesError(correo, iconoError[4], textoError[4], mensajeErrorFormulario)
        formularioValido = false
    }
    
    if(!expresionesPermitidadForm.telefono.test(telefono.value)){
        mostrarMensajesError(telefono, iconoError[5], textoError[5], mensajeErrorFormulario)
        formularioValido = false
    }
    if(formularioValido){
        console.log('form valido');
        //cambio de envio formulario, cambio submit(), por fetch()
        // formulario.submit();

        const data = {
            nombre: nombre.value,
            correo: correo.value,
            contraseña: clave.value
        };

        fetch('http://localhost:3000/api//auth/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data=>{
                console.log('usuario registrado', data);
                alert('Usuario registrado exitosamente');
                formulario.reset(); 
            })
            .catch(error=>{
                console.error('Error al registrar usuario:', error);
                alert('Error al registrar usuario')
            })
    }
}

//funcion de verificacion de inputs de formularios

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


formulario.addEventListener('submit', (e)=>{
    console.log('prueba');
    e.preventDefault()
    validacionFormulario(e);
});