let def = {
  name: 'sbadmin-image',

  html: `
<img alt="" />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.src) {
        this.rootElement.src = state.src;
      }
    }

    setSrc(src) {
      this.rootElement.src = src;
    }

    set src(src) {
      this.rootElement.src = src;
    }

    set cls(cls) {
      this.rootElement.classList.add(cls);
    }

    set alt(value) {
      this.rootElement.setAttribute('alt', value);
    }

  `
};
export {def};
