class ContenedorBlog extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <section class="blog container">

                <div class="blog-1">
                    <img src="../imagenes/b1.jpg" alt="">         
                    <h3>Blog 1</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod libero eius, labore repellat assumenda necessitatibusedita accusantium error nemo, fugiat dolorem cumque ullam, similique voluptates.</p>
                </div>

                <div class="blog-1">
                    <img src="../imagenes/b2.jpg" alt="">
                    <h3>Blog 2</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod libero eius, labore repellat assumenda necessitatibusedita accusantium error nemo, fugiat dolorem cumque ullam, similique voluptates.</p>
                </div>

                <div class="blog-1">
                    <img src="../imagenes/b3.jpg" alt="">
                    <h3>Blog 3</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quod libero eius, labore repellat assumenda necessitatibusedita accusantium error nemo, fugiat dolorem cumque ullam, similique voluptates.</p>
                </div>
            </section>`;
    }
}
customElements.define('contenedor-blog', ContenedorBlog);



