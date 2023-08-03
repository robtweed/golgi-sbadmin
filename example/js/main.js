(async () => {

  // Note that this will have already been loaded by the index.html file,
  //  so it will be actually imported from the browser's cache

  const {golgi} = await import('https://cdn.jsdelivr.net/gh/robtweed/golgi/src/golgi.min.js');

  // Note that by using the CDN version of golgi.js, we must specify absolute paths for
  //  the component and assembly paths in the context object.  Use window.location.origin for this
  //  This example is designed to run directly from the /example folder in the Github repo
  //  so we add /example to the window.location.origin. Adjust as required for your own setup

  let urlRoot = window.location.origin + '/golgi-sbadmin/example';
  let context = {
    componentPaths: {
      sbadmin: 'https://robtweed.github.io/golgi-sbadmin/components/'
    },
    assemblyPath: urlRoot + '/js/assemblies/' 
  };

  //  Uncomment this if you want to enable Golgi's console log:

  // golgi.setLog(true);

  // fetch the pre-bundled sbadmin components and instantiate them.
  //   comment this out to load each one dynamically only when needed (slower if on a slow network)

  await golgi.fetch_optimised_components(context, urlRoot + '/js/components/golgi-components.js')

  // now render the root assembly, which will start everything off.  
  //  Note that due to the previous command, by the time the
  //  first component is needed, it will have already been instantiated
  //  and available

  await golgi.renderAssembly('root_assembly', 'body', context);

})();
