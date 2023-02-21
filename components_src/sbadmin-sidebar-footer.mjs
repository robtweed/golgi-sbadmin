let def = {
  name: 'sbadmin-sidebar-footer',

  html: `
<div golgi:component-class="sb-sidenav-footer" />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

  `
};
export {def};
