function load(n){let t="sbadmin-container",i=-1;customElements.define(t,class extends HTMLElement{constructor(){super(),i++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML='<style>.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{--bs-gutter-x:1.5rem;width:100%;padding-right:var(--bs-gutter-x,.75rem);padding-left:var(--bs-gutter-x,.75rem);margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}@media (min-width:1500px){.container,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{max-width:1440px}}</style><div class="container">',this.name=t+"-"+i}setState(n){n.name&&(this.name=n.name),n.size&&(this.classList.remove("container"),this.classList.add("container-"+n.size))}})}export{load};