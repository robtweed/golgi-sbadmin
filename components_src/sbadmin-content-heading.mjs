let def = {
  name: 'sbadmin-content-heading',
  useShadowDOM: true,

  css: `
.mt-4 {
  margin-top: 1.5rem !important;
}
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
  `,

  html: `
<h1 class="mt-4"></h1>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.position) {
        this.rootElement.classList.add('text-' + state.position);
      }
    }

  `
};
export {def};
