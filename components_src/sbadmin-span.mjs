let def = {
  name: 'sbadmin-span',

  html: `
  <span></span>
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

    set text(value) {
      this.rootElement.textContent = value;
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  `
};
export {def};
