window.addEventListener('DOMContentLoaded', ()=>{

    const expresionesPermitidadForm = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    };

    const formulario = document.querySelector('#formulario-registro');

    async function validacionFormulario(e){
        e.preventDefault();
        
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let clave = document.getElementById('password');
        let claveVerificacion = document.getElementById('password2');
        let correo = document.getElementById('correo');
        let telefono = document.getElementById('telefono');
        const terminos = document.getElementById('terminos-condiciones');

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

        if(clave.value != claveVerificacion.value || !expresionesPermitidadForm.password.test(claveVerificacion.value)){
            mostrarMensajesError(claveVerificacion, iconoError[3], textoError[3], mensajeErrorFormulario)
            formularioValido = false
        }
        

        let correoValido = expresionesPermitidadForm.correo.test(correo.value);//se cambia la forma de validacion de correo, para que se haga tanto por expresiones permitinidas y el correo duplicado
        if(!correoValido){
            mostrarMensajesError(correo, iconoError[4], textoError[4], mensajeErrorFormulario)
            formularioValido = false;
        }else{
            const verificacionCorreo = await correoConRegistro(correo.value);

            if(verificacionCorreo){
                const msjErrorCorreoRegistrado = document.querySelector('.usuarioRegistradoError');
                msjErrorCorreoRegistrado.style.opacity = 1;
                    setTimeout(()=>{
                        msjErrorCorreoRegistrado.style.opacity = 0;
                    }, 2000)
                formularioValido = false;   
            }   
        }
        
        if(!expresionesPermitidadForm.telefono.test(telefono.value)){
            mostrarMensajesError(telefono, iconoError[5], textoError[5], mensajeErrorFormulario)
            formularioValido = false
        }
        if(!terminos.checked){
            const msjError = document.getElementById('msjErrorTerminos');
            msjError.style.opacity = 1;
            mensajeErrorFormulario.style.opacity= 1;

                setTimeout(()=>{
                    msjError.style.opacity = 0;
                    mensajeErrorFormulario.style.opacity= 0;
                }, 2000)
            formularioValido = false;
        }else{
            formularioValido = true;
        }

        if(formularioValido){
            // data que se envia al servidor para almacenar
            const data = {
                nombre: nombre.value,
                apellido: apellido.value,
                correo: correo.value,
                telefono: telefono.value,
                contrasena: clave.value,
                terminos: true
            };
            try{
                const response = await fetch('http://localhost:3001/api/auth/register', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                let result;
                try{
                    result = await response.json();
                }catch(parseError){
                    console.error("❌ No se pudo interpretar la respuesta del servidor:", parseError);
                    alert("Error en la respuesta del servidor.");
                    return;
                }

                if(!response.ok){
                    //manejo especifo error 409
                    if(response.status ===409){
                        console.warn("⚠️ Correo ya registrado.");
                        alert(result.error || "El correo ya está registrado.");
                    }else{
                        console.error("❌ Error inesperado:", result.error);
                        alert(result.error || "Ocurrió un error inesperado.");
                    }
                    return;
                }
                //todo esta bien
                alert("✅ Usuario registrado: " + result.message);
                formulario.reset();
                setTimeout(() => {
                    window.location.href = "/html/tiendaIndex.html";
                }, 2000);
            }catch(networkError) {
                console.error("❌ Error de red o conexión:", networkError);
                alert("No se pudo conectar con el servidor.");
            }
        }
    }

// funcion de verificacion de inputs de formularios
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

// verificacion de correo registrado
    async function correoConRegistro(correo) {
        try{
            const response =  await fetch(`http://localhost:3001/api/auth/check-email?correo=${encodeURIComponent(correo)}`);
            const result = await response.json()

            return result.exists ;

        }catch(error){
            console.log("Error verificando correo", error);
            return false;
        }
    }

    formulario.addEventListener('submit', (e)=>{
        e.preventDefault()
        validacionFormulario(e);
    });

    //mostrar y ocultar clave
    const botonesOjoClave = document.querySelectorAll('.icono-toogle-clave-registro');
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

    const btnAbrirSeccionEliminarCuenta = document.getElementById('btnEliminarCuenta');
    const seccionRegistroCuenta = document.querySelector('.seccion-registro')
    const componenteSeccionEliminarCuenta = document.querySelector('formulario-eliminar-cuenta');

    //cambiar los formularios disponibles, se oculta registrar y se muestran los necesarios para eliminar cuenta
    btnAbrirSeccionEliminarCuenta.addEventListener('click', ()=>{
        seccionRegistroCuenta.classList.add('oculto');
        componenteSeccionEliminarCuenta.classList.remove('oculto')
    })
    // formulario para validar correo, que este se encuentre en la base de datos y eliminar la cuenta
    
    const formularioVerificarCorreoEliminarCuenta = document.getElementById('formulario-eliminar-cuenta');
    let claveParaConfirmacionEliminarCuenta = 0;
    let correASerEliminado = '';

    formularioVerificarCorreoEliminarCuenta.addEventListener('submit', async (e)=>{
        e.preventDefault();

        const detalleEliminarcuenta = document.querySelector('.texto-eliminar-cuenta')
        const correoEliminarCuenta = document.querySelector('#correo-eliminar-cuenta');

        const iconosErrorEliminarCuenta = document.querySelectorAll('.iconoErrorEliminarCuenta');
        const textosErrorEliminarCuenta = document.querySelectorAll('.textErrorEliminarCuenta')
    
        let formularioValido = true;

        if(detalleEliminarcuenta.value == ''){
            errorDatoEliminarCuenta(detalleEliminarcuenta, iconosErrorEliminarCuenta[0], textosErrorEliminarCuenta[0])
            formularioValido = false;
        }
        if(correoEliminarCuenta.value == '' || !expresionesPermitidadForm.correo.test(correoEliminarCuenta.value)){
            errorDatoEliminarCuenta(correoEliminarCuenta, iconosErrorEliminarCuenta[1], textosErrorEliminarCuenta[1])
            formularioValido = false
        }else {
            const verificacionCorreo = await correoConRegistro(correoEliminarCuenta.value);
            if(!verificacionCorreo){
            errorDatoEliminarCuenta(correoEliminarCuenta, iconosErrorEliminarCuenta[1], textosErrorEliminarCuenta[1])
            formularioValido = false
        }}

        if(formularioValido){
            const correo = correoEliminarCuenta.value.trim()

            try{
                const response = await fetch('http://localhost:3001/api/auth/verificacion-email', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({correo})
                })
                if(!response.ok){
                    const errorData = await response.json();
                    console.log('Error en el servidor: ', errorData);
                    return;
                }
                const data = await response.json();
                claveParaConfirmacionEliminarCuenta = data.claveTemporalUnica;
                console.log('clave temporal para eliminar cuenta: ', data.claveTemporalUnica);

                datosAExteriorizar(claveParaConfirmacionEliminarCuenta, correo);
                const msjClaveEnviada = document.getElementById('msjClaveEnviadaACorreo');
                msjClaveEnviada.style.opacity = 1;
                    setTimeout(()=>{
                        msjClaveEnviada.style.opacity = 0;
                    }, 5000)
            }catch(error){
                console.log('Error en red o servidor: ', error)
            }
        }
    })

    function datosAExteriorizar(clave, correo){
        claveParaConfirmacionEliminarCuenta = clave;
        correASerEliminado = correo;
    }

    const formularioVerifiacionClaveEliminarCuenta = document.getElementById('confirmacion-clave-eliminar-cuenta');
    formularioVerifiacionClaveEliminarCuenta.addEventListener('submit', async (e)=>{
        e.preventDefault()

        const iconosErrorEliminarCuenta = document.querySelectorAll('.iconoErrorEliminarCuenta');
        const textosErrorEliminarCuenta = document.querySelectorAll('.textErrorEliminarCuenta')

        let formularioValido = true;

        const inputConfirmacionClaveEliminarCuenta = document.getElementById('clave-eliminar-cuenta');

        if(inputConfirmacionClaveEliminarCuenta.value.trim() == '' || inputConfirmacionClaveEliminarCuenta.value == 0){
            errorDatoEliminarCuenta(inputConfirmacionClaveEliminarCuenta, iconosErrorEliminarCuenta[2], textosErrorEliminarCuenta[2])
            formularioValido = false
            return
        }
        if(parseInt(inputConfirmacionClaveEliminarCuenta.value) != claveParaConfirmacionEliminarCuenta ){
            errorDatoEliminarCuenta(inputConfirmacionClaveEliminarCuenta, iconosErrorEliminarCuenta[2], textosErrorEliminarCuenta[2])
            formularioValido = false
            return
        }
        if(formularioValido){
            console.log('correo a eliminar: ', correASerEliminado)
            const correo = correASerEliminado;
            try{
                const response = await fetch ('http://localhost:3001/api/auth/delete-user', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({correo})
                })
                if(!response.ok){
                    const error = await response.json();
                    console.log('error en servidor: ', error);
                    return
                }else{
                    const msjCuentaEliminada = document.getElementById('msjCuentaEliminada');
                    msjCuentaEliminada.style.opacity = 1;
                        setTimeout(()=>{
                            msjCuentaEliminada.style.opacity = 0;
                            formularioVerifiacionClaveEliminarCuenta.reset();
                            formularioVerificarCorreoEliminarCuenta.reset();
                            window.location.href = "/html/tiendaIndex.html";
                        }, 3000); 
                }
            }catch{
                console.error('Error de red o fetch:', err);
                alert('No se pudo conectar con el servidor.');
            }
        }
    })

    function errorDatoEliminarCuenta (input, icono, texto){
        input.classList.add('errorEnDatoFormulario');
        icono.style.opacity = 1;
        texto.style.opacity = 1;
            setTimeout(()=>{
                input.classList.remove('errorEnDatoFormulario');
                icono.style.opacity = 0;
                texto.style.opacity = 0;
            }, 2000)
    }

    
})
