let def = {
  name: 'sbadmin-div',
  useShadowDOM: true,

  css: `
.clearfix {
  display: block;
  clear: both;
  content: "";
}
  `,
  html: `
<div>
  <span golgi:prop="spanTag"></span>
</div>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.spanTag.textContent = state.text;
      }
      if (state.cls) {
        this.rootElement.classList.add(state.cls);
      }
    }

    set text(value) {
      this.spanTag.textContent = value;
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  `
};
export {def};
