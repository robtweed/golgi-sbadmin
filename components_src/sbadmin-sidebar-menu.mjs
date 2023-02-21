let def = {
  name: 'sbadmin-sidebar-menu',
  useShadowDOM: true,

  css: `
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
  `,
  html: `
<div class="sidenav-menu">
  <div class="nav accordion" golgi:prop="childrenTarget" />
</div>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    onBeforeState() {
      this.childrenTarget.id = 'sideNav_' + this.name;
    }

  `
};
export {def};
