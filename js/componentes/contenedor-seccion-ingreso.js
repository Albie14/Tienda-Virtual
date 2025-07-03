class ContenedorSeccionIngreso extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <div class="seccion-ingreso">
                <form action="submit" class="datos-ingresar cambio-clave-visible" id="datos-ingresar">
                    <div class="grupo-datos-ingresar">
                        <label for="correo-ingresar">Correo/Usuario</label>
                        <div class="input-correo-ingresar">
                            <input type="email" autocomplete="username" name="correo-ingresar" id="correo-ingresar" class="input-ingresar" placeholder="Correo">
                            <i id="icon-err-correo" class="iconoErrorIngresar fa-solid fa-circle-xmark"></i>
                        </div>
                        <p id="msj-err-correo">Usuario no encontrado</p>
                    </div>
                    <div class="grupo-datos-ingresar">
                        <label for="clave-ingresar">Clave Secreta</label>
                        <div class="input-clave-ingresar">
                            <input type="password" autocomplete="current-password" name="clave-ingresar" id="clave-ingresar" class="input-ingresar" placeholder="Clave">
                            <i id="icon-err-clave" class="iconoErrorIngresar fa-solid fa-circle-xmark"></i>
                        </div>
                        <p id="msj-err-clave">Clave Errada. Recuerde, que al ingresar mas tres (3) veces la clave errada, su usuario sera bloqueado</p>
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
                        <form action="submit"  id="datos-recuperar-clave">
                            <div class="grupo-datos-recuperar">
                                <label for="correo-recuperacion" class="formularioLabel">Correo Electronico</label>
                                <div class="grupo-input-recuperacion">
                                    <input type="email" autocomplete="email" class="input-ingresar input-correo-defecto" name="correo-recuperacion" id="correo-recuperacion" placeholder="correo@correo.com">
                                    <i class="iconoError fa-solid fa-circle-xmark"></i>
                                </div>
                                <p class="formularioInputError">correo electronico no encontrado</p>
                            </div>
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo"><p>Enviar</p></button>
                            </div>
                        </form>
                        <form action="submit"  id="verificacion-clave-defecto">
                            <div class="grupo-datos-recuperar">
                                <label for="clave-ingresar">Ingresa la clave que llego al correo</label>
                                <div class="grupo-input-recuperacion">
                                    <input type="password" autocomplete="current-password" class="input-ingresar input-correo-defecto" name="clave-ingresar" id="clave-ingresar" class="input-ingresar" placeholder="Clave">
                                    <i class="iconoError fa-solid fa-circle-xmark"></i>
                                </div>
                                <p class="formularioInputError">clave incorrecta</p>
                            </div>
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo"><p>Verificar</p></button>
                            </div>
                        </form>
                    </div>
                    <div class="grupo-nueva-clave cambio-clave-visible">
                        <form action="submit"  id="nueva-clave">
                                <div class="grupo-datos-recuperar div-nueva-clave">
                                    <label for="clave-ingresar">Nueva contraseña</label>
                                    <div class="input-clave-ingresar">
                                        <input type="password" autocomplete="current-password" name="clave-ingresar" id="clave-ingresar" class="input-ingresar" placeholder="Clave">
                                    </div>
                                </div>
                                <div class="grupo-datos-recuperar div-nueva-clave">
                                    <label for="clave-ingresar">Repetir contraseña</label>
                                    <div class="input-clave-ingresar">
                                        <input type="password" autocomplete="current-password" name="clave-ingresar" id="clave-ingresar" class="input-ingresar" placeholder="Repetir Clave">
                                    </div>
                                </div>    
                            <div class="btn-correo-defecto">
                                <button type="submit" class="formularioBtn btn-clave-a-correo"><p>Enviar</p></button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>`;
    }
}
customElements.define('contenedor-seccion-ingreso', ContenedorSeccionIngreso);