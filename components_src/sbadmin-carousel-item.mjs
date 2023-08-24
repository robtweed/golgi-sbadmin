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

    set active(value) {
      if (value) {
        this.rootElement.classList.add('active');      }
      else {
        this.rootElement.classList.remove('active');
      }
    }

    get itemNo() {
      let carousel = this.getParentComponent('sbadmin-carousel');
      return carousel.items.indexOf(this);
    }

  `
};
export {def};
