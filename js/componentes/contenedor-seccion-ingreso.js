class ContenedorSeccionIngreso extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <div class="seccion-ingreso">
                <form action="submit" class="datos-ingresar">
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
                        <a href="recuperarUsuario.html" class="recuperarUsuario">Recuperar Usuario y/o Clave</a>
                    </div>
                    <div class="grupo-datos-ingresar">
                        <button type="submit" class="btn-ingresar-usuario"><p>Ingresar</p></button>
                    </div>
                </form>
            </div>`;
    }
}
customElements.define('contenedor-seccion-ingreso', ContenedorSeccionIngreso);