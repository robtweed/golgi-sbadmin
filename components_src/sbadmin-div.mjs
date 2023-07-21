let def = {
  name: 'sbadmin-div',

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
    }

  `
};
export {def};
