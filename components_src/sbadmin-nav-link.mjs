let def = {
  name: 'sbadmin-nav-link',

  html: `
<a class="nav-link" href="golgi:bind=href">golgi:bind=text</a>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      else {
        this.golgi_state[this.stateMapName] = state;
      }
    }

    onBeforeState() {
      this.stateMapName = 'nav-link-' + this.name;
      this.addStateMap(this.stateMapName);
    }

  `
};
export {def};
