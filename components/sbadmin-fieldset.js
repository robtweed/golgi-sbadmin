function load(){let e="sbadmin-fieldset",t=-1;customElements.define(e,class extends HTMLElement{constructor(){super(),t++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML=`<style>fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
    pointer-events: auto;
}
*, ::before, ::after {
    box-sizing: border-box;
}</style><fieldset></fieldset>`,this.name=e+"-"+t}setState(e){e.name&&(this.name=e.name)}})}export{load};