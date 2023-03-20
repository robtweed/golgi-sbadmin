let def = {
  name: 'sbadmin-copyright',
  useShadowDOM: true,

  css: `
.txt-small {
  font-size: 10px;
}
  `,

  html: `
<p class="txt-small">
  <span>Copyright &copy; </span>
  <span golgi:prop="textTarget" />
</p>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.textTarget.textContent = state.text;
      }
      if (state.textContent) {
        this.textTarget.textContent = state.textContent;
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
