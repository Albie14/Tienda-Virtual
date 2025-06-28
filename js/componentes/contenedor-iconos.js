class ContenedorIconos extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
        <section class="icons container">
            <div class="icon-1">
                <div class="icon-img">
                    <img src="/imagenes/i1.svg" alt="">
                </div>
                <div class="icon-txt">
                    <h3>Practicas</h3><br>
                    <p>diseñados con materiales estrictamente seleccionados</p>
                </div>
            </div>  

            <div class="icon-1">
                <div class="icon-img">
                    <img src="../imagenes/i2.svg" alt="">
                </div>
                <div class="icon-txt">
                    <h3>Resistentes</h3><br>
                    <p>tolerantes a altas temperaturas</p>
                </div>
            </div>

            <div class="icon-1">
                <div class="icon-img">
                    <img src="../imagenes/i3.svg" alt="">
                </div>
                <div class="icon-txt">
                    <h3>faciles de guardas</h3><br>
                    <p>la tela es microfibra</p>
                </div>
            </div>
        </section>`;
    }
}
customElements.define('contenedor-iconos', ContenedorIconos);