(async () => {

  // Note that this will have already been loaded by the index.html file,
  //  so it will be actually imported from the browser's cache

  const {golgi} = await import('https://cdn.jsdelivr.net/gh/robtweed/golgi/src/golgi.min.js');

  // Note that by using the CDN version of golgi.js, we must specify absolute paths for
  //  the component and assembly paths in the context object.  Use window.location.origin for this
  //  This example is designed to run directly from the /example folder in the Github repo
  //  so we add /example to the window.location.origin. Adjust as required for your own setup

  // We're also adding a toSVG() method to the context, for use with components that use
  //  Feather.js icons.

  let urlRoot = window.location.origin + '/golgi-sbadmin/example';
  let context = {
    componentPaths: {
      sbadmin: 'https://robtweed.github.io/golgi-sbadmin/components/'
    },
    assemblyPath: urlRoot + '/js/assemblies/',
    toSVG: function(element) {
      if (typeof feather !== 'undefined') {
        const name = element.getAttribute('data-feather');
        if (name) {
          const svgString = feather.icons[name].toSvg();
          const svgDocument = new DOMParser().parseFromString(
            svgString,
            'image/svg+xml',
          );
          const svgElement = svgDocument.querySelector('svg');
          element.parentNode.replaceChild(svgElement, element);
        }
      }
    } 
  };

  //  Uncomment this if you want to enable Golgi's console log:

  // golgi.setLog(true);

  // fetch the pre-bundled sbadmin components and instantiate them.
  //  Note: don't await this but let it run asynchronously in the background

  await golgi.fetch_optimised_components('sbadmin', context);

  // now render the root assembly, which will start everything off.  
  //  Note that due to the previous command, by the time the
  //  first component is needed, it will have already been instantiated
  //  and available

  await golgi.renderAssembly('root_assembly', 'body', context);

})();
