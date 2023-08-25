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

<a class="nav-link collapsed" href="javascript:void(0);" golgi:prop="aTag" data-bs-toggle="collapse" aria-expanded="false" golgi:on_click="switchToActive">
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
      if (state.reactive) {
        this.isReactive = true;
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
        this.expand();
      }
      else {
        this.aTag.classList.remove('active');
        this.collapse();
      }
    }

    set highlight(on) {
      if (on) {
        this.aTag.classList.add('active');
      }
      else {
        this.aTag.classList.remove('active');
      }
    }

    isChildMenuComponent(menuComponent) {
      let found = false;
      let ok = true;
      let count = 0;
      let childComponent = menuComponent;
      let parentComponent;
      do {
        parentComponent = childComponent.getParentComponent('sbadmin-sidebar-nested-menu');
        count++;
        if (count > 20) {
          ok = false;
          return;
        }
        if (!parentComponent) {
          ok = false;
          return;
        }
        if (parentComponent === this) {
          found = true;
          ok = false;
        }
        childComponent = parentComponent;
      }
      while (ok);

      return found;
    }

    switchToActive() {

      let root = this.rootComponent;

      // was another highlightable menu component already active?

      let activeMenuComponent = root.getMenuItemActive();
      if (activeMenuComponent) {
        // if it's not this item, switch selection and expand this nested content
        if (activeMenuComponent !== this) {
          activeMenuComponent.isActive = false;
          this.isActive = true;

          if (this.isChildMenuComponent(activeMenuComponent)) {
            // collapse the selected nested menu
            this.collapse();
          }
        }
        else {
         // if it's the current menu option, toggle it
         if (this.isExpanded) {
            this.collapse();
          }
          else {
            this.expand();
          }
        }
      }
      else {
        // otherwise make this the active menu option and expand it
        this.isActive = true;
      }
      // reset the root-level indicator of which is the active menu component

      root.setMenuItemActive(this);

      // hide the toggle if it was previously hidden

      if (root.menuHidden) {
        root.rootElement.classList.toggle('sidenav-toggled');
      }
      this.emit('menuItemSelected', {
        active: this,
        inactive: activeMenuComponent
      });
    }

    get isCollapsed() {
      return !this.collapseDiv.classList.contains('show');
    }

    get isExpanded() {
      return this.collapseDiv.classList.contains('show');
    }

  
  });
};