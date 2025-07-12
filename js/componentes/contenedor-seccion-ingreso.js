class ContenedorSeccionIngreso extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <div class="seccion-ingreso">
                <i class="iconoCerrarSeccionIngreso fa-solid fa-circle-xmark"></i>

                <form action="submit" class="datos-ingresar cambio-clave-visible" id="datos-ingresar">
                    <div class="grupo-datos-ingresar">
                        <label for="correo-ingresar">Correo/Usuario</label>
                        <div class="input-correo-ingresar">
                            <input type="email" autocomplete="username" name="correo-ingresar" id="correo-ingresar" class="input-ingresar" placeholder="Correo">
                            <i id="icon-err-correo-ingresar" class="iconoErrorIngresar fa-solid fa-circle-xmark"></i>
                        </div>
                        <p id="msj-err-correo-ingresar">Usuario no encontrado</p>
                    </div>
                    <div class="grupo-datos-ingresar">
                        <label for="clave-ingresar">Clave Secreta</label>
                        <div class="input-clave-ingresar">
                            <input type="password" autocomplete="current-password" name="clave-ingresar" id="clave-ingresar" class="input-ingresar" placeholder="Clave">
                            <i class="fa fa-eye icono-toogle-clave secc-usuario" data-input="clave-ingresar"></i>
                            <i id="icon-err-clave-ingresar" class="iconoErrorIngresar fa-solid fa-circle-xmark"></i>
                        </div>
                        <p id="msj-err-clave-ingresar">Clave Errada. Recuerde, que al ingresar mas tres (3) veces la clave errada, su usuario sera bloqueado</p>
                    </div>
                    <div class="grupo-datos-ingresar">
                        <button type="button" class="bnt-modificar-clave">Recuperar y/o Cambiar Clave</button>
                    </div>
                    <div class="grupo-datos-ingresar">
                        <button type="submit" class="btn-ingresar-usuario"><p>Ingresar</p></button>
                    </div>
                </form>
                
                <div class="datos-ingresar container-cambio-clave">
                    <h4 class="titulo-recuperar">Recuperar y/o Cambiar Clave</h4>
                    <div class="grupo-clave-por-defecto">
                        <form action="submit"  id="form-datos-recuperar-clave">
                            <div class="grupo-datos-recuperar">
                                <label for="correo-recuperacion" class="formularioLabel">Correo Electronico</label>
                                <div class="grupo-input-recuperacion">
                                    <input type="email" autocomplete="email" class="input-ingresar input-correo-defecto" name="correo-recuperacion" id="correo-recuperacion" data-msj-id="error-msj-correo-recuperacion" data-icono-id="error-icon-correo-recuperacion" placeholder="correo@correo.com">
                                    <i id="icon-err-correo-recuperacion" class="iconoError fa-solid fa-circle-xmark"></i>
                                </div>
                                <p class="formularioInputError" id="msj-err-correo-recuperacion">correo electronico no encontrado</p>
                            </div>
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo" id="btn-clave-defecto"><p>Enviar</p></button>
                            </div>
                        </form>
                        <form action="submit"  id="form-verificacion-clave-defecto">
                            <div class="grupo-datos-recuperar">
                                <label for="clave-defecto">Ingresa la clave que llego al correo</label>
                                <div class="grupo-input-recuperacion">
                                    <input type="number" autocomplete="off" class="input-ingresar input-correo-defecto" name="clave-defecto" id="clave-defecto" class="input-ingresar" placeholder="clave dinamica" data-msj-id="error-msj-clave-defecto" data-icono-id="error-icon-clave-defecto">
                                    <i id="icon-err-clave-defecto" class="iconoError fa-solid fa-circle-xmark"></i>
                                </div>
                                <p class="formularioInputError" id="msj-err-clave-defecto">clave incorrecta</p>
                            </div>
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo" id="btn-verificar-clave-defecto"><p>Verificar</p></button>
                            </div>
                        </form>
                    </div>
                    <div class="grupo-nueva-clave">
                        <form action="submit"  id="form-nueva-clave">
                            <div class="grupo-datos-recuperar div-nueva-clave">
                                <label for="nueva-clave">Nueva contraseña</label>
                                <div class="input-clave-ingresar">
                                    <input type="password" autocomplete="current-password" name="nueva-clave" id="nueva-clave" class="input-ingresar" placeholder="Clave">
                                    <i class="fa fa-eye icono-toogle-clave secc-usuario" data-input="nueva-clave"></i>
                                    <i id="icon-err-nueva-clave" class="iconoError fa-solid fa-circle-xmark"></i>
                                </div>
                                <p class="formularioInputError" id="msj-err-nueva-clave">La contraseña debe ser de 4 a 12 digitos</p>
                            </div>
                                <div class="grupo-datos-recuperar div-nueva-clave">
                                    <label for="confirmacion-nueva-clave">Repetir contraseña</label>
                                    <div class="input-clave-ingresar">
                                        <input type="password" autocomplete="current-password" name="confirmacion-nueva-clave" id="confirmacion-nueva-clave" class="input-ingresar" placeholder="Repetir Clave">
                                        <i class="fa fa-eye icono-toogle-clave secc-usuario" data-input="confirmacion-nueva-clave"></i>
                                        <i id="icon-err-confirmacion-nueva-clave" class="iconoError fa-solid fa-circle-xmark"></i>
                                    </div>
                                    <p class="formularioInputError" id="msj-err-confirmacion-nueva-clave">Ambas contraseñas deben ser iguales</p>
                                </div>    
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo" id="btn-confirmacion-nueva-clave"><p>Enviar</p></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`;
    }
}
customElements.define('contenedor-seccion-ingreso', ContenedorSeccionIngreso);