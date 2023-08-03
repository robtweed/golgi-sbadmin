export function load(ctx) {
  let componentName = 'sbadmin-sidebar-menu-item';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_menu_item extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.nav-link.active {
  font-weight: 600;
  color: #0061f2;
}
.nav-link {
  color: #212832;
  display: flex;
  align-items: center;
  line-height: normal;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: relative;
  padding: 0.5rem 1rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
}
a {
  text-decoration: none;
  font-size: .9rem;
}
.nav-link.active .nav-link-icon {
    color: #0061f2;
}

.nav-link .nav-link-icon {
  color: #a7aeb8;
  margin-right: 0.5rem;
  font-size: .9rem;
  padding-right: 0.5rem;
  display: inline-flex;
}

*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<a class="nav-link" golgi:prop="aTag" href="#" golgi:on_click="switchPage">
  <div golgi:prop="iconDiv" class="nav-link-icon">
    <i golgi:prop="iconElement"></i>
  </div>
  <span golgi:prop="textTarget"></span>
</a>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }


    onBeforeState() {
      this.hasIcon = true;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.contentPage) {
        this.contentPage = state.contentPage;
        this.rootComponent.addToPage2MenuMap(state.contentPage, this);
      }
      if (state.text) {
        this.textTarget.textContent = state.text;
      }
      if (state.iconName) {
        this.iconElement.setAttribute('data-feather', state.iconName);
        this.iconName = state.iconName;
      }
      if (!state.iconName) {
        this.aTag.removeChild(this.iconDiv);
        this.hasIcon = false;
      }
      if (state.href) {
        this.aTag.href = state.href;
      }
      if (state.active === true) {
        this.switchPage();
      }
    }

    setActive() {
      this.aTag.classList.add('active');
    }

    setInactive() {
      this.aTag.classList.remove('active');
    }

    switchPage() {
      let root = this.rootComponent;
      let activeMenuComponent = root.getMenuItemActive();
      if (activeMenuComponent) {
        activeMenuComponent.setInactive();
      }
      this.setActive();
      root.setMenuItemActive(this);
      root.switchToPage(this.contentPage);
      if (root.menuHidden) {
        root.rootElement.classList.toggle('sidenav-toggled');
      }
    }

    onAfterHooks() {
      if (typeof feather !== 'undefined' && this.hasIcon) {
        this.context.toSVG(this.iconElement);
      }
    }

  
  });
};