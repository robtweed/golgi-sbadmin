let def = {
  name: 'sbadmin-footer-text',
  useShadowDOM: true,

  css: `
.txt-small {
  font-size: 10px;
}
  `,

  html: `
<div class="txt-small" golgi:prop="textTag"></div>
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
        this.rootElement.textContent = state.textContent;
      }
      if (state.center === true) {
        let footer = this.rootComponent.footerTarget;
        footer.classList.remove('justify-content-between');
        footer.classList.add('justify-content-center');
      }
      if (state.color) {
        this.rootElement.style.color = state.color;
      }

    }

  `
};
export {def};
