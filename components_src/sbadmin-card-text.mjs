let def = {
  name: 'sbadmin-card-text',
  useShadowDOM: true,

  css: `
.card-text:last-child {
  margin-bottom: 0;
}
.text-muted {
  --bs-text-opacity: 1;
  color: #6c757d !important;
}
  `,

  html: `
<p class="card-text"></p>
<p />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.smallText) {
        let el = document.createElement('small');
        el.classList.add('text-muted');
        el.textContent = state.smallText;
        this.rootElement.appendChild(el);
      }
      if (state.textContent) {
        this.setText(state.textContent);
      }
    }

    setText(text) {
      if (this.rootComponent.useShowdown && typeof showdown === 'undefined') {
        this.rootElement.textContent = text;
        let _this = this;
        setTimeout(function() {
          _this.setText(text);
        }, 100);
        return;
      }
      if (typeof showdown !== 'undefined') {
        let converter = new showdown.Converter();
        this.rootElement.innerHTML = converter.makeHtml(text);
      }
      else {
        this.rootElement.textContent = text;
      }
    }

  `
};
export {def};
