function load(e){let n="sbadmin-sidebar-menu",a=-1;customElements.define(n,class extends HTMLElement{constructor(){super(),a++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML='<style>.sidenav-menu{flex-grow:1}.sidenav-menu .nav{flex-direction:column;flex-wrap:nowrap}*,::after,::before{box-sizing:border-box}</style><div class="sidenav-menu"><div class="nav accordion" golgi:prop="childrenTarget"></div>',this.name=n+"-"+a}setState(e){e.name&&(this.name=e.name)}onBeforeState(){this.childrenTarget.id="sideNav_"+this.name}})}export{load};