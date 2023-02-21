let def = {
  name: 'sbadmin-icon',

  html: `
<i></i>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.iconName) {
        this.rootElement.setAttribute('data-feather', state.iconName);
      }
    }

    onAfterHooks() {
      if (typeof feather !== 'undefined') feather.replace();
    }

  `
};
export {def};
