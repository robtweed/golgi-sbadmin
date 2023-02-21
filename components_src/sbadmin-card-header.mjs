let def = {
  name: 'sbadmin-card-header',
  useShadowDOM: true,

  css: `
.card-header {
    font-weight: 500;
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33,40,50,0.03);
    border-bottom: 1px solid rgba(33,40,50,0.125);
}
.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}
h5 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #363d47;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<h5 class="card-header"></h5>
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

    setText(text) {
      this.rootElement.textContent = text;
    }

  `
};
export {def};
