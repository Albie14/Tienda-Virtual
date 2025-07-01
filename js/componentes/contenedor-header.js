class ContenedorHeader extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <header class="header">
                <div class="menu container">
                    <a href="#" class="logo"><img src="../imagenes/logo.jpg" alt="logo"></a>
                    <i class="fa-solid fa-bars menu-icono" id="menu-hamburguesa"></i>
                    <nav class="navbar">
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Servicios</a></li>
                            <li><a href="#">Productos</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </nav>

                    <div class="contedor-home">
                        <i class="fa-solid fa-house-user"></i>
                        <ul class="personal">
                            <li class="submenu">
                                <img src="../imagenes/car.svg" id="img-carrito" alt="carrito">
                                <div id="carrito">
                                    <table id="lista-carrito">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <div class="subtotalCarrito">
                                        <a href="#" id="vaciar-carrito" class="btn-2">Vaciar Carrito</a>
                                        <div id="totalCarrito" class="btn-2"></div>
                                    </div>
                                </div>
                            </li>
                            <li class="contenedor-usuario">
                                <i class="fa-solid fa-user-plus"></i>
                                <div class="usuario" id="grupo-botones-ingresar">
                                    <a href="/html/registro.html" class="botones-usuario">Regitro <i class="fa-solid fa-list-check"></i></a>
                                    <button id="btn-ingresar" class="botones-usuario">Ingresar</button>
                                </div>
                                <div class="usuario oculto"  id="grupo-botones-cerrar">
                                    <button id="btn-cerrar-sesion" class="botones-usuario">Cerrar sesion</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="header-content container">
                    <div class="header-carrusel">
                        <div class="header-img">
                            <img src="../imagenes/left.png" alt="" id="img1">
                        </div>  
                        <div class="header-img">
                            <img src="../imagenes/right.png" alt="" id="img2">
                        </div>     
                    </div>
                <div class="header-txt">
                    <h1>Ofertas especiales</h1>
                    <p>siempre los mejores precios</p>
                    <a href="/html/ofertas.html" class="btn-1">todas las Ofertas aqui</a>
                </div>
            </div>
        </header>`;
    }
}

customElements.define('contenedor-header', ContenedorHeader);