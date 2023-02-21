let def = {
  name: 'sbadmin-sidebar-heading',
  useShadowDOM: true,

  css: `
.sidenav-menu-heading {
  padding: 1.75rem 1rem 0.75rem;
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: #a7aeb8;
  list-style: none;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<div class="sidenav-menu-heading"></div>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
    }

  `
};
export {def};
