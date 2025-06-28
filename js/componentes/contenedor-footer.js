class ContenedorFooter extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <section class="footer">
                <div class="link">
                    <h3>Contactanos:</h3>
                    <ul>
                        <li><a href="#" class="redes-sociales"><i class="fa-brands fa-square-facebook icon-rrss"></i></a><p>Facebook</p></li>
                        <li><a href="#" class="redes-sociales"><i class="fa-brands fa-square-x-twitter icon-rrss"></i></a><p>X-Twitter</p></li>
                        <li><a href="#" class="redes-sociales"><i class="fa-brands fa-square-instagram icon-rrss"></i></a><p>Instagram</p></li>
                        <li><a href="#" class="redes-sociales"><i class="fa-brands fa-square-youtube icon-rrss"></i></a><p>Youtube</p></li>
                        <li><a href="#" class="redes-sociales"><i class="fa-brands fa-square-whatsapp icon-rrss"></i></a><p>Whatsapp</p></li>
                    </ul>
                </div> 

                <div class="copyright">
                    <h4><span>Urban</span> todos lo derechos reservador 2025 &copy</h4>
                </div> 
            </section>`;
    }
}
customElements.define('contenedor-footer', ContenedorFooter);


    