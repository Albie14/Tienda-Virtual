class FormularioRecuperarClave extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <div class="seccion-recuperar-clave">
                <form action="submit" class="form-recuperar-clave" id="form-recuperar-clave">
                    <h4 class="titulo-recuperar">Recuperar clave</h4>
                    <div class="formularioGrupo">
                        <div class="indicacionesFormulario">
                            <label for="correo-recuperacion" class="formularioLabel">Correo Electronico</label>
                            <div class="formularioGrupoInput">
                                <input type="email" autocomplete="email" class="formularioInput" name="correo-recuperacion" id="correo-recuperacion" placeholder="correo@correo.com">
                                <i class="iconoError fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                        <p class="formularioInputError">correo electronico no encontrado</p>
                    </div>
                    <div class="formularioGrupo formularioGrupoBtnEnviar">
                        <button type="submit" class="formularioBtn"><p>Enviar</p></button>
                        <p class="formularioMensajeExito" id="formularioMensajeExito">Su nueva clave se envio al correo electronico</p>
                    </div>
                </form>
            </div>`
    }
}
customElements.define('formulario-recuperar-clave', FormularioRecuperarClave);