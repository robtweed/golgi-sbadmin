function load(){let e="sbadmin-content-page",t=-1;customElements.define(e,class extends HTMLElement{constructor(){super(),t++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML='<style>.collapse:not(.show){display:none}*,::after,::before{box-sizing:border-box}</style><div class="collapse multi-collapse"></div>',this.name=e+"-"+t}setState(e){e.name&&(this.name=e.name)}show(){this.rootElement.classList.add("show")}hide(){this.rootElement.classList.remove("show")}onBeforeHooks(){this.name=this.context.assemblyName,this.rootComponent.contentPages.set(this.name,this);this.onSelected=function(e){console.log(9999999),console.log(this);var t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;console.log("w = "+t),t<992&&this.rootComponent.rootElement.classList.toggle("sidenav-toggled")}}})}export{load};