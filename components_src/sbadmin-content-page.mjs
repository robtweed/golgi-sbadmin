let def = {
  name: 'sbadmin-content-page',
  useShadowDOM: true,

  css: `
.collapse:not(.show) {
    display: none;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<div class="collapse multi-collapse"></div>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    show() {
      this.rootElement.classList.add('show');
    }

    hide() {
      this.rootElement.classList.remove('show');
    }

    onBeforeHooks() {
      this.name = this.context.assemblyName;
      this.rootComponent.contentPages.set(this.name, this);
      this.onSelected = (obj) => {
        this.emit('selected', obj);
      };
    }

  `
};
export {def};
