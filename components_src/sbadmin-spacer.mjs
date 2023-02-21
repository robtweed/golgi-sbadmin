let def = {
  name: 'sbadmin-spacer',
  useShadowDOM: true,

  css: `
*, ::before, ::after {
    box-sizing: border-box;
}
div {
  opacity: 0;
}
  `,

  html: `
<div>_</div>
  `
};
export {def};
