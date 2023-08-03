let def = {
  name: 'sbadmin-sidebar-divider',
  useShadowDOM: true,

  css: `
.sidebar-divider {
    margin: 0 1rem 1rem;
}
.d-none {
    display: none!important;
}
.d-md-block {
    display: block!important;
}

.dark {
  border-top: 1px solid rgba(255,255,255,.15);
}

*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<hr class="sidebar-divider" />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.button.classList.add(cl);
        });
      }
      if (state.margin === 'none' || state.margin === false) {
        this.rootElement.classList.remove('sidebar-divider');
      }
    }

    show() {
      this.rootElement.classList.remove('d-none');
    }

    hide() {
      this.rootElement.classList.add('d-none');
    }

  `
};
export {def};
