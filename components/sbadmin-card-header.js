function load(){let e="sbadmin-card-header",t=-1;customElements.define(e,class extends HTMLElement{constructor(){super(),t++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML='<style>.card-header{font-weight:500;padding:1rem 1.35rem;margin-bottom:0;background-color:rgba(33,40,50,.03);border-bottom:1px solid rgba(33,40,50,.125)}.card-header:first-child{border-radius:.35rem .35rem 0 0}h5{font-size:1.1rem;margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2;color:#363d47}*,::after,::before{box-sizing:border-box}</style><h5 class="card-header"></h5>',this.name=e+"-"+t}setState(e){e.name&&(this.name=e.name),e.text&&(this.rootElement.textContent=e.text)}setText(e){this.rootElement.textContent=e}})}export{load};