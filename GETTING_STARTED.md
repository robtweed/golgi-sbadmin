# Getting Started with the Golgi SBAdmin Module Library

This short tutorial will show you how you can get a basic SBAdmin User Interface up and running in a few minutes.

## Pre-Requisites

You'll need access to a web server to which you have file read/write privileges, so you can upload and modify files in its file system.

This tutorial will assume that the web server you use will have access to the open Internet (although this is not essential: the SBAdmin Module Library can be configured to work in a closed Intranet).

Otherwise, you'll just need an editor of your choice.  No build-chain or other tooling is required.

## Recommended File System Folder Structure

This tutorial will assume that you'll create a folder/file structure as follows.  This structure can be created
at either your web server's root path or, if you prefer, at any other subdirectory/path.

Golgi's browser-based run-time simply fetches the JavaScript Module files it needs when it needs them, using a simple configuration JSON object that instructs it where to find them in your web server's paths.


      |- index.html
      |
      |- js
      |   |
      |   |- app.js 
      |   |
      |   | - assemblies
      |   |      |
      |   |      |- root_assembly.js
      |   |      |
      |   |      |- ...etc


The contents of the files shown in this structure will be described below.

### *index.html*

This is the HTML page that you will load to start your SBAdmin Application.

It should contain, at the very least, the following:

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>Golgi SBAdmin Module Library Demo</title>
          </head>

          <body>
            <script type="module" src="js/app.js"></script>
            <script async src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js"></script>
            <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>

You can, of course, modify the title as desired.

Note that we're going to load the Bootstrap and Feather JavaScript library code from CDNs.  You can, of course, use local copies of these libraries from your web server if you prefer.

As you can see, everything is then controlled by the *app.js* Module that will be loaded into the browser from your web server's *js* folder.

### *app.js*

This file has three basic purposes:

- to import and load the Golgi framework module;

- to define the Golgi configuration, so that Golgi knows where to find your assemblies and the SBAdmin Components;

- to load your root Assembly, which, together with any other assemblies that it, in turn, might load, defines your specific SBAdmin User Interface and its behaviour.

Start with this simple version which implements those three functions:

        (async () => {
          const {golgi} = await import('https://cdn.jsdelivr.net/gh/robtweed/golgi/src/golgi.min.js');
          let context = {
            assemblyPath: window.location.origin + '/js/assemblies/',
            componentPaths: {
              sbadmin: 'https://robtweed.github.io/golgi-sbadmin/components/'
            }
          };
          await golgi.renderAssembly('root_assembly', 'body', context);
        })();


Notice that we're fetching Golgi itself from its Github repository, but once again, you could make a local copy on your web server.

The *context* object defines our specific Golgi configuration:  

- the assemblies, which define your specific SBAdmin User Interface, will be fetched from your Web Server (from the */js/assemblies/* folder in this instance: change as required).

- you'll notice, however, that we're going to fetch the SBAdmin Golgi Components directly from this Github repository.  You could, of course, copy them to your web server and fetch them from there instead.

Finally, we're loading our root assembly module, the contents of which we'll describe next.


### root_assembly.js

Create this file in your *js/assemblies* folder, initially containing the code shown below:

        export function load() {
          let gx=`
        <sbadmin-root />
          `;
          return {gx};
        };

So you'll see that all we're going to do, for now, is load the *sbadmin-root* Golgi Component.

Having saved this file, we're now ready to try out this initial version of your application.


## Try It Out

To try out your application, all you need to do is load the *index.html* file from your web server into your browser.

For example, assuming the web server's paths are mapped to your file system:

        https://example.com/sbadmin/index.html


You should see an empty set of SBAdmin panels:

![root layout](images/root.png)


Congratulations if you see this in your browser!  You've successfully got the SBAdmin User Interface up and running.

None of the panels are populated with your content, of course, but it's now just a case of building out your assembly files.  Everything else you've created can remain the same (though we may want to add some optimisation later).




