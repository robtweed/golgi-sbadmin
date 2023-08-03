let def = {
  name: 'sbadmin-button-group',
  useShadowDOM: true,
  css: `
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
  `,

  html: `
<div class="btn-group" role="group" aria-label="Button Group"></div>

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
          _this.rootElement.classList.add(cl);
        });
      }
      if (state.ariaLabel) {
        this.rootElement.setAttribute('aria-label', state.ariaLabel);
      }
    }

    set text(value) {
      this.spanTag.textContent = value;
    }

    set cls(value) {
      this.setState({cls: value});
    }

    onBeforeState() {
      this.buttons = [];
    }

  `
};
export {def};
