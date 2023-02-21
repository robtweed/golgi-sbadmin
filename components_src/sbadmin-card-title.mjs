let def = {
  name: 'sbadmin-card-title',

  html: `
<h5 golgi:component-class="card-title" class="card-title"></h5>
      `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.title) {
        this.rootElement.textContent = state.title;
      }
    }

    setTitle(text) {
      this.rootElement.textContent = text;
    }

  `
};
export {def};
