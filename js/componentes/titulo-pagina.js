class TituloPagina extends HTMLElement{
    constructor(){
        super();
        const textoTitulo = this.getAttribute('texto') || 'Urban'; /*si la pagina tiene error o no tiene titulo tomara "Urban" como titulo*/
        this.innerHTML = `<h2>${textoTitulo}</h2>`;
    }

    static get observedAttributes(){
        return['texto'];
    }

    attributeChangedCallback(nombre, viejo, nuevo){
        if(nombre==='texto' && this.querySelector('h2')){
            const h2 = this.querySelector('h2');
            if(h2) h2.textContent = nuevo;
        }
    }
}
customElements.define('titulo-pagina', TituloPagina)