export function load(ctx) {
  let componentName = 'sbadmin-sidebar-nested-menu';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_nested_menu extends HTMLElement {
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

.nav-link.collapsed .sidenav-collapse-arrow {
  transform: rotate(-90deg);
}

.nav-link .sidenav-collapse-arrow {
    display: inline-block;
    margin-left: auto;
    transition: transform .15s ease;
    color: #a7aeb8;
}
.sidenav-menu-nested {
    flex-direction: column;
    margin-left: 1.4375rem;
    border-left-style: solid;
    border-left-width: thin;
    padding-left: 0.5625rem;
    border-left-color: #d4dae3;
}
.nav {
    flex-direction: column;
    flex-wrap: nowrap;
    display: flex;
    margin-bottom: 0;
    list-style: none;
}

.collapse:not(.show) {
  display: none;
}

.feather {
    height: 1rem;
    width: 1rem;
    vertical-align: top;
}

*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<a class="nav-link collapsed" href="javascript:void(0);" golgi:prop="aTag" data-bs-toggle="collapse" aria-expanded="false" golgi:on_click="click">
  <div class="nav-link-icon">
    <i golgi:prop="iTag"></i>
  </div>
  <span golgi:prop="spanTag"></span>
  <div class="sidenav-collapse-arrow">
    <i data-feather="chevron-down" golgi:prop="chevronTag"></i>
  </div>
</a>
<div class="collapse" golgi:prop="collapseDiv">
  <nav class="sidenav-menu-nested nav accordion" golgi:prop="childrenTarget">
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.iconName) {
        this.iTag.setAttribute('data-feather', state.iconName);
        this.iconName = state.iconName;
      }
      if (state.text) {
        this.spanTag.textContent = state.text;
      }
    }

    set text(value) {
      this.spanTag.textContent = value;
    }

    set icon(value) {
      this.iTag.setAttribute('data-feather', value);
      this.iconName = value;
    }

    onBeforeState() {
      // add the various cross-linked id references
      let id = "collapse_" + this.name;
      this.collapseDiv.id = id;
      this.aTag.setAttribute('data-bs-target', '#' + id);
      this.aTag.setAttribute('aria-controls', id);
      this.childrenTarget.id = "subMenu_" + this.name;
      let parentId = this.getParentComponent('sbadmin-sidebar-menu').childrenTarget.id;
      this.collapseDiv.setAttribute('data-bs-parent', '#' + parentId);
    }

    onAfterHooks() {
      if (typeof feather !== 'undefined') {
        this.context.toSVG(this.iTag);
        this.context.toSVG(this.chevronTag);
      }
    }

    toggle() {
      this.switchToActive();
      this.emit('menuItemSelected', this);
    }

    expand() {
      this.aTag.classList.remove('collapsed');
      this.aTag.setAttribute('aria-expanded', true);
      this.collapseDiv.classList.add('show');
    }

    collapse() {
      this.aTag.classList.add('collapsed');
      this.aTag.setAttribute('aria-expanded', false);
      this.collapseDiv.classList.remove('show');
    }

    set isActive(active) {
      if (active) {
        this.aTag.classList.add('active');
      }
      else {
        this.aTag.classList.remove('active');
      }
    }

    click() {
      this.switchToActive(true);
    }

    switchToActive(click) {
      let root = this.rootComponent;
      let activeMenuComponent = root.getMenuItemActive();
      if (activeMenuComponent) {
        activeMenuComponent.isActive = false;
      }
      this.isActive = true;
      root.setMenuItemActive(this);
      if (root.menuHidden) {
        root.rootElement.classList.toggle('sidenav-toggled');
      }
      this.emit('menuItemSelected', activeMenuComponent);
    }

  
  });
};