function load(){let e="sbadmin-sidebar-menu-item",t=-1;customElements.define(e,class extends HTMLElement{constructor(){super(),t++,this.attachShadow({mode:"open"});this.shadowRoot.innerHTML='<style>.nav-link.active{font-weight:600;color:#0061f2}.nav-link{color:#212832;display:flex;align-items:center;line-height:normal;padding-top:.75rem;padding-bottom:.75rem;position:relative;padding:.5rem 1rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}a{text-decoration:none;font-size:.9rem}.nav-link.active .nav-link-icon{color:#0061f2}.nav-link .nav-link-icon{color:#a7aeb8;margin-right:.5rem;font-size:.9rem;padding-right:.5rem;display:inline-flex}*,::after,::before{box-sizing:border-box}</style><a class="nav-link" golgi:prop="aTag" href="#" golgi:on_click="switchPage"><div golgi:prop="iconDiv" class="nav-link-icon"><i golgi:prop="iconElement"></i></div><span golgi:prop="textTarget"></span></a>',this.name=e+"-"+t}onBeforeState(){this.hasIcon=!0}setState(e){e.name&&(this.name=e.name),e.contentPage&&(this.contentPage=e.contentPage,this.rootComponent.addToPage2MenuMap(e.contentPage,this)),e.text&&(this.textTarget.textContent=e.text),e.iconName&&(this.iconElement.setAttribute("data-feather",e.iconName),this.iconName=e.iconName),e.iconName||(this.aTag.removeChild(this.iconDiv),this.hasIcon=!1),e.href&&(this.aTag.href=e.href)}setActive(){this.aTag.classList.add("active")}setInactive(){this.aTag.classList.remove("active")}switchPage(){var e=this.rootComponent,t=e.getMenuItemActive();console.log("activeMenuComponent:"),console.log(t),t&&t.setInactive(),this.setActive(),e.setMenuItemActive(this),e.switchToPage(this.contentPage),e.menuHidden&&e.rootElement.classList.toggle("sidenav-toggled")}onAfterHooks(){"undefined"!=typeof feather&&this.hasIcon&&this.context.toSVG(this.iconElement)}})}export{load};