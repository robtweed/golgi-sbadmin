let def = {
  name: 'sbadmin-card-link',

  html: `
<a href="#" class="card-link"></a>
      `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.href) {
        this.rootElement.href = state.href;
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
