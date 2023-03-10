let def = {
  name: 'sbadmin-carousel-item',

  html: `
<div class="carousel-item"></div>
      `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.active) {
        this.rootElement.classList.add('active');
      }

      if (state.cls) {
        this.classList.add(state.cls);
      }

      if (typeof state.interval !== 'undefined') {
        this.setAttribute('data-bs-interval', state.interval);
      }

    }

  `
};
export {def};
