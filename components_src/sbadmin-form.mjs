let def = {
  name: 'sbadmin-form',
  useShadowDOM: true,

  css: `
fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
    pointer-events: auto;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<form></form>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    onBeforeState() {
      this.fields = [];
    }

    get values() {
      let valArr = [];
      let _this = this;
      this.fields.forEach(function(field) {
        valArr.push({
          name: field.name,
          value: field.value
        });
      });
      return valArr;
    }

  `
};
export {def};
