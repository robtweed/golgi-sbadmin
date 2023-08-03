let def = {
  name: 'sbadmin-button-toolbar',

  html: `
<div role="toolbar" aria-label="Button Toolbar"></div>

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
      this.baseStyle = 'display: flex;flex-wrap: wrap;justify-content: flex-start;';
      this.rootElement.style = this.baseStyle;
    }

    show() {
      this.rootElement.style = this.baseStyle;
    }

    hide() {
      this.rootElement.style = this.baseStyle + 'display:none;';
    }

  `
};
export {def};
