let def = {
  name: 'sbadmin-card-pre-text',

  html: `
<pre golgi:component-class="card-text"></pre>
<p></p>
      `,

  methods: `
    
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.textContent) {
        this.setText(state.textContent);
      }
    }

    setText(text) {
      this.rootElement.textContent = text;
    }
  `
};
export {def};

