let def = {
  name: 'sbadmin-row',
  useShadowDOM: true,

  css: `
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}
  `,

  html: `
<span class="row" />
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

  `
};
export {def};
