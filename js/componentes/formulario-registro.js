class FormularioRegistro extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = `
            <div class="seccion-registro">
            <form class="formulario" id="formulario">
                    
                <div class="formularioGrupo" id="grupoUsuario">
                    <div class="indicacionesFormulario">
                        <label for="nombre" class="formularioLabel">Nombre</label>
                        <div class="formularioGrupoInput">
                            <input type="text" autocomplete="name" class="formularioInput" name="nombre" id="nombre" placeholder="ingresa tu nombre">
                            <i class="iconoError chec fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">nombre debe ser de 4 a 16 digitos y solo debe contener numeros, letras y guion bajo</p>
                </div>

                <div class="formularioGrupo" id="grupoNombre">
                    <div class="indicacionesFormulario">
                        <label for="apellido" class="formularioLabel">Apellido</label>
                        <div class="formularioGrupoInput">
                            <input type="text" autocomplete="name" class="formularioInput" name="apellido" id="apellido" placeholder="ingresa tu apellido">
                            <i class="iconoError fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">apellido debe ser de 4 a 16 digitos y solo debe contener numeros, letras y guion bajo</p>
                </div>

                <div class="formularioGrupo" id="grupoPassword">
                    <div class="indicacionesFormulario">
                        <label for="password" class="formularioLabel">Contraseña</label>
                        <div class="formularioGrupoInput input-password">
                            <input type="password" autocomplete="new-password" class="formularioInput" name="password" id="password" placeholder="clave" >
                            <i class="fa fa-eye icono-toogle-clave" data-input="password"></i>
                            <i class="iconoError fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">La contraseña debe ser de 4 a 12 digitos</p>
                </div>

                <div class="formularioGrupo" id="grupoPassword2">
                    <div class="indicacionesFormulario">
                        <label for="password2" class="formularioLabel">Repetir contraseña</label>
                        <div class="formularioGrupoInput input-password">
                            <input type="password" autocomplete="new-password" class="formularioInput" name="password2" id="password2" placeholder="repetir clave">
                            <i class="fa fa-eye icono-toogle-clave" data-input="password2"></i>
                            <i class="iconoError fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">Ambas contraseñas deben ser iguales</p>
                </div>

                <div class="formularioGrupo" id="grupoCorreo">
                    <div class="indicacionesFormulario">
                        <label for="correo" class="formularioLabel">Correo Electronico</label>
                        <div class="formularioGrupoInput">
                            <input type="email" autocomplete="email" class="formularioInput" name="correo" id="correo" placeholder="correo@correo.com">
                            <i class="iconoError fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">correo electronico incorrecto</p>
                    <p class="usuarioRegistradoError">Este correo ya esta registrado</p>
                </div>

                <div class="formularioGrupo" id="grupoTelefono">
                    <div class="indicacionesFormulario">
                        <label for="telefono" class="fclass="indicacionesFormulario"ormularioLabel">Telefono</label>
                        <div class="formularioGrupoInput">
                            <input type="text" class="formularioInput formularioGrupoCorrecto" name="telefono" id="telefono" placeholder="01234567890">
                            <i class="iconoError fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    <p class="formularioInputError">solo puede contener numeros, sin espacios y maximo 11 digitos </p>
                </div>
                
                <div class="formularioGrupo" id="grupoTerminos">
                    <div class="indicacionesFormulario div-terminos-condidicones">
                        <label for="terminos-condiciones">
                            <input type="checkbox" name="terminos-condiciones" id="terminos-condiciones">
                        </label>
                        <span>Acepto todos los <button type="button" id="descripcion-terminos">Terminos y Condiciones</button></span>
                    </div>
                    <p class="formularioInputError">Debe aceptar los terminos y condiciones</p>
                </div>
                <div class="formularioMensaje" id="formularioMensaje">
                    <p><i class="fa-solid fa-triangle-exclamation"></i><b> Error: </b><span>por favor rellene el formulario correctamente </span></p>
                </div>
                <div class="formularioGrupo formularioGrupoBtnEnviar">
                    <button type="submit" class="formularioBtn"><p>Enviar</p></button>
                    <p class="formularioMensajeExito" id="formularioMensajeExito">Formulario enviado exitosamente!</p>
                </div>

            </form>

        </div>
        `;
        this.querySelector('#formulario').addEventListener('submit', (e)=>{
            e.preventDefault();
            const datosFormulario ={
                nombre: this.querySelector('input[name="nombre"]').value,
                apellido: this.querySelector('input[name="apellido"]').value,
                clave: this.querySelector('input[name="password"]').value,
                clave2: this.querySelector('input[name="password2"]').value,
                correo: this.querySelector('input[name="correo"]').value,
                telefono: this.querySelector('input[name="telefono"]').value,
                terminos: this.querySelector('input[name="terminos-condiciones"]').checked
            };
            this.dispatchEvent(new CustomEvent('validacion-formulario', {
                detail: datosFormulario,
                bubbles: true,
                composed: true
            }));
        });
    }
}
customElements.define('formulario-registro', FormularioRegistro);

