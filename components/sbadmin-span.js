export function load(ctx) {
  let componentName = 'sbadmin-span';
  let count = -1;
  customElements.define(componentName, class sbadmin_span extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
  <span></span>
  `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
    }

    set text(value) {
      this.rootElement.textContent = value;
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  
  });
};