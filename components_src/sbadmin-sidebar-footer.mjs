let def = {
  name: 'sbadmin-sidebar-footer',
  useShadowDOM: true,

  css: `
.sb-sidenav-footer {
    padding: 0.75rem;
}
  `,

  html: `
<div class="sb-sidenav-footer" />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.bgColor) {
        this.rootElement.style = 'background-color: ' + state.bgColor + ';';
      }
    }

  `
};
export {def};
