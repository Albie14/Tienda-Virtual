class ContenedorOferta extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <section class="ofert container">
                <div class="ofert-1">   
                    <div class="ofert-img">
                        <img src="../imagenes/f1.png" alt="">
                    </div>
                    <div class="ofert-txt">
                        <h3>Seccion Caballeros</h3>
                        <a href="/html/caballeros.html" class="btn-2">click aqui</a>
                    </div>
                </div>
                <div class="ofert-1">   
                    <div class="ofert-img">
                        <img src="../imagenes/f2.png" alt="">
                    </div>
                    <div class="ofert-txt">
                        <h3>Calzado</h3>
                        <a href="#" class="btn-2">click aqui</a>
                    </div>
                </div>
                <div class="ofert-1">   
                    <div class="ofert-img">
                        <img src="../imagenes/f3.png" alt="">
                    </div>
                    <div class="ofert-txt">
                        <h3>Seccion Damas</h3>
                        <a href="/html/damas.html" class="btn-2">click aqui</a>
                    </div>
                </div> 
            </section>`;
    }
}
customElements.define('contenedor-oferta', ContenedorOferta);