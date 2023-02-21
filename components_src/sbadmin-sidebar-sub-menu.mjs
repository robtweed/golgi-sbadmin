let def = {
  name: 'sbadmin-sidebar-sub-menu',
  useShadowDOM: true,

  css: `
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
  `,

  html: `
<a class="nav-link collapsed" href="javascript:void(0);" golgi:prop="aTag" data-bs-toggle="collapse" aria-expanded="false" golgi:on_click="toggle">
  <span golgi:prop="spanTag"></span>
  <div class="sidenav-collapse-arrow">
    <i data-feather="chevron-down" golgi:prop="chevronTag"></i>
  </div>
</a>
<div class="collapse" golgi:prop="collapseDiv">
  <nav class="sidenav-menu-nested nav accordion" golgi:prop="childrenTarget">
</div>
  `,

  methods: `

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.spanTag.textContent = state.text;
      }
      if (state.isLeafMenu) {
        this.childrenTarget.classList.remove('accordion');
      }
    }

    onBeforeState() {
      // add the various cross-linked id references
      let id = "collapse_" + this.name;
      this.collapseDiv.id = id;
      this.aTag.setAttribute('data-bs-target', '#' + id);
      this.aTag.setAttribute('aria-controls', id);
      this.childrenTarget.id = "subMenu_" + this.name;
      let parentMenu = this.getParentComponent('sbadmin-sidebar-sub-menu');
      if (!parentMenu) parentMenu = this.getParentComponent('sbadmin-sidebar-nested-menu');
      if (parentMenu) {
        id = parentMenu.childrenTarget.id;
        this.collapseDiv.setAttribute('data-bs-parent', '#' + id);
      }
    }

    onAfterHooks() {
      if (typeof feather !== 'undefined') {
        this.context.toSVG(this.chevronTag);
      }
    }

    toggle() {
      this.aTag.classList.toggle('collapsed');
      let af = this.aTag.getAttribute('aria-expanded') === 'true';
      this.aTag.setAttribute('aria-expanded', !af);
      this.collapseDiv.classList.toggle('show');
    }

  `
};
export {def};
