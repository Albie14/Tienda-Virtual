class FormularioEliminarCuenta extends HTMLElement{
    constructor(){
        super(); /*ponle clase iconoError a los iconos (line 13, 21 y 37 ) y formularioInputError a los parrafos (linea 14, 24 y 40)de errors */
        this.innerHTML = `
            <div class="seccion-eliminar-cuenta">
                <h4 class="titulo-eliminar-cuenta">Eliminar Cuenta</h4>
                <div class="datos-formularios-eliminar-cuenta">
                    <form id="formulario-eliminar-cuenta">
                        <div class="formularioGrupo">
                            <div class="formularioGrupoInput">
                                <label for="razon-eliminar-cuenta">Describe por que quieres eliminar tu cuenta</label>
                                <textarea class="texto-eliminar-cuenta" placeholder="Razones para eliminar cuenta" id="razon-eliminar-cuenta"></textarea>
                                <i class="iconoErrorEliminarCuenta fa-solid fa-circle-xmark"></i>
                            </div>
                            <p class="textErrorEliminarCuenta">Campo obigatorio</p>
                        </div>
                        <div class="formularioGrupo">
                            <div class="formularioGrupoInput">
                                <label for="correo-eliminar-cuenta" class="formularioLabel">Correo Electronico</label>
                                <input type="email" autocomplete="email" class="formularioInput" name="correo-eliminar-cuenta" id="correo-eliminar-cuenta" placeholder="correo@correo.com">
                                <i class="iconoErrorEliminarCuenta fa-solid fa-circle-xmark"></i>
                            </div>
                            <p class="textErrorEliminarCuenta">correo electronico no encontrado</p>
                        </div>
                        <div class="formularioGrupo">
                            <button type="submit" class="formularioBtn" id="btnCodigoEliminarCuenta">Enviar codigo</button>
                            <p class="msjExitoEliminarCuenta" id="msjClaveEnviadaACorreo">Su clave de confirmacion se envio al correo electronico</p>
                        </div>
                    </form>
                    <form id="confirmacion-clave-eliminar-cuenta">
                        <div class="formularioGrupo">
                            <div class="formularioGrupoInput">
                                <label for="clave-eliminar-cuenta" class="formularioLabel">Ingresa la clave para eliminar cuenta</label>
                                <input type="number" autocomplete="one-time-code" class="formularioInput" name="clave-eliminar-cuenta" id="clave-eliminar-cuenta" placeholder="12345">
                                <i class="iconoErrorEliminarCuenta fa-solid fa-circle-xmark"></i>
                            </div>
                            <p class="textErrorEliminarCuenta">correo electronico no encontrado</p>
                        </div>
                        <div class="formularioGrupo">
                            <button type="submit" class="formularioBtn" id="btnConfirmarEliminarCuenta">Eliminar Cuenta</button>
                            <p class="msjExitoEliminarCuenta" id="msjCuentaEliminada">Su cuenta ha sido eliminada, para poder ingresar debe registrarse nuevamente</p>
                        </div>
                    </form>
                </div>
            </div>`;
    }
}
customElements.define('formulario-eliminar-cuenta', FormularioEliminarCuenta);
iconoError