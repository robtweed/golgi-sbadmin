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
      let _this = this;
      this.onSelected = function(obj) {
        console.log(9999999);
        console.log(this);
        let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log('w = ' + w);
        if (w < 992) {
          this.rootComponent.rootElement.classList.toggle('sidenav-toggled');
        }
      };
    }

  `
};
export {def};
