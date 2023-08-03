export function load(ctx) {
  let componentName = 'sbadmin-sidebar-menu';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_menu extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.sidenav-menu {
    flex-grow: 1;
}
.sidenav-menu .nav {
    flex-direction: column;
    flex-wrap: nowrap;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="sidenav-menu">
  <div class="nav accordion" golgi:prop="childrenTarget" />
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    onBeforeState() {
      this.childrenTarget.id = 'sideNav_' + this.name;
      this.style = 'flex-grow: 1;';
    }

  
  });
};