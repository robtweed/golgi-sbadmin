let def = {
  name: 'sbadmin-card-footer',
  useShadowDOM: true,

  css: `
.card-footer {
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.card-footer:last-child {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
}
  `,

  html: `
<div class="card-footer"></div>
      `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.text) {
        this.rootElement.textContent = state.text;
      }

      if (state.muted) {
        this.rootElement.classList.add('text-muted');
      }

      if (state.smallText) {
        let el = document.createElement('small');
        el.classList.add('text-muted');
        el.textContent = state.smallText;
        this.rootElement.appendChild(el);
      }

    }

    setText(text) {
      this.rootElement.textContent = text;
    }

  `
};
export {def};
