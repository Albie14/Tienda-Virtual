class TituloPagina extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const titulo = document.createElement('h2');
        titulo.textContent = this.getAttribute('texto') || 'Urban'; /*encaso que la pagina no tenga titulo toma por defecto el nombre de la tienda */
        
        shadow.appendChild(titulo);
    }
    static get observedAttributes(){
        return['texto'];
    }
    attributeChangedCallback(nombre, viejo, nuevo){
        if(nombre==='texto' && this.shadowRoot){
            this.shadowRoot.querySelector('h2').textContent = nuevo;
        }
    }
}
customElements.define('titulo-pagina', TituloPagina)