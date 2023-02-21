let def = {
  name: 'sbadmin-card-top-image',

  html: `
<img class="card-img-top" />
      `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.src) {
        this.rootElement.src = state.src;
      }

      if (state.alt) {
        this.rootElement.setAttribute('alt', state.alt);
      }

    }

    setSrc(src) {
      this.rootElement.src = src;
    }

    setAlt(alt) {
        this.rootElement.setAttribute('alt', alt);
    }

  `
};
export {def};
