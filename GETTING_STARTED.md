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

----

## First Steps in Controlling the SBAdmin User Interface

### Append Targets

Golgi WebComponents are designed to be composable, meaning that we can embed other Golgi WebComponents within them as Child Tags.  You can also embed ordinary HTML tags.

All Golgi WebComponents have a default target element within them to which Child Components or HTML tags will be appended.  This is made available via a WebComponent property named *childrenTarget*.  Unless otherwise specified, this is the outermost HTML tag within a Golgi WebComponent, but the WebComponent developer can re-assign this to any other HTML tag within the WebComponent.

Let's see what happens if we use that with the *sbadmin-root* WebComponent.

Edit the *js/assemblies/root_assembly.js* file, adding a child *div* tag with some text to the *sbadmin-root* WebComponent as follows:

        export function load() {
          let gx=`
        <sbadmin-root>
          <div>Here is some text</div>
        </sbadmin-root>
          `;
          return {gx};
        };

You can either edit the file in-situ on your web server, or edit it locally and upload it to the web server.  Remember, with Golgi there is no build step - just edit the files and re-load the application in your browser.  Note that you may need to clear the browser's cache to ensure it loads the latest versions of your files.

So, try reloading the *index.html* file in the browser.  

You should see the text appearing in the main content panel, because it is defined, within the *sbadmin-root* WebComponent, as being the *childrenTarget*.

For many WebComponents, this would be sufficient, but of course our SBAdmin User Interface has 4 panels, each of which you'll want to populate with your specific content.

To cater for such situations, Golgi allows you to define and use as many of your own Append Targets as you wish.

So, the *sbadmin-root* WebComponent has defined within it four Append Targets whose property names are:

- topbarTarget: The Header Panel
- sidebarTarget: The Left-hand Menu Panel
- footerTarget: The Footer Panel
- contentTarget: The Main Content Panel

As you've seen, you can also use the *childrenTarget* property to append content to the main Content Panel.

When adding child Components or HTML tags to a WebComponent that has custom Append Targets, you specify the Target to which you want to append the child Component, using a special attribute: *golgi:appendTo*

Let's try them out.  

Re-edit the *js/assemblies/root_assembly.js* file as follows:

        export function load() {
          let gx=`
        <sbadmin-root>
          <div golgi:appendTo="topbarTarget">
            Header Panel text
          </div>

          <div golgi:appendTo="footerTarget">
            Footer Panel text
          </div>

          <div golgi:appendTo="sidebarTarget">
            Menu Panel text
          </div>

          <div golgi:appendTo="contentTarget">
            Content Panel Text
          </div>

        </sbadmin-root>
          `;
          return {gx};
        };


Reload the *index.html* file in the browser.  

You should now see the various lines of text appearing in each of the four SBAdmin UI Panels:

![Getting Started with Targets](images/targets.png)

OK so we now know how to add content to each of the Panels!

### Panel Colours

#### Background Colours

Currently we're using the default background colours assigned to each of the SBAdmin UI Panels.  You may be quite happy to also use them as defined "out of the box", but you may decide you want to use different colours for one or more of the Panels.

The *sbadmin-root* WebComponent allows you to do this by making use of its built-in state object.  When you use a Golgi WebComponent within an Assembly, you can define its initial state properties simply by specifying them as attributes.

In the case of the *sbadmin-root* WebComponent, it allows you to specify four state properties:

- header_bg_color
- sidebar_bg_color
- footer_bg_color
- content_bg_color

The value can be any valid value for defining the CSS *background-color* style property, eg an RGB value.

So let's try this out.  We'll initially justrecolour the header panel.

Re-edit the *js/assemblies/root_assembly.js* file and add the *header_bg_color* attribute to the *sbadmin-root* tag as follows:

        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc">

          <div golgi:appendTo="topbarTarget">
            Header Panel text
          </div>

          <div golgi:appendTo="footerTarget">
            Footer Panel text
          </div>

          <div golgi:appendTo="sidebarTarget">
            Menu Panel text
          </div>

          <div golgi:appendTo="contentTarget">
            Content Panel Text
          </div>

        </sbadmin-root>
          `;
          return {gx};
        };


Reload the *index.html* file in the browser.  

The header panel should now have changed to having a grey background.

#### Text Colours

You can similarly define the text colour to be used in each panel.  These are assigned via the following state variable names:

- header_text_color
- sidebar_text_color
- footer_text_color
- content_text_color

The value can be any valid value for defining the CSS *color* style property, eg an RGB value or colour name.

So let's try this out.  We'll initially just recolour the header panel.

Re-edit the *js/assemblies/root_assembly.js* file and add the *header_text_color* attribute to the *sbadmin-root* tag as follows:

        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc" header_text_color="white">

          <div golgi:appendTo="topbarTarget">
            Header Panel text
          </div>

          <div golgi:appendTo="footerTarget">
            Footer Panel text
          </div>

          <div golgi:appendTo="sidebarTarget">
            Menu Panel text
          </div>

          <div golgi:appendTo="contentTarget">
            Content Panel Text
          </div>

        </sbadmin-root>
          `;
          return {gx};
        };


Reload the *index.html* file in the browser.  

The header panel should now have changed to having white text in a grey background.


----

## Customising the SBAdmin Header Panel

Rather than using simple HTML tags within the SBAdmin Header Panel, you should use the other Golgi SBAdmin WebComponents that are designed for use within it.  These include their own specific, built-in styling:

- *sbadmin-brand*: use this for displaying any text that you want to appear in the Header Panel
- *sbadmin-sidebar-toggle*: use this to provide a responsive display that automatically takes account of the screen width.

  If the screen is wide enough, the left-hand menu panel will be displayed

  If the screen is too narrow, a "hamburger" icon will appear in the header which, when clicked, slides the menu panel into view.  The menu panel automatically slides out of view whenever a menu item is clicked or tapped.

Let's see these in action.

### Adding Header Panel Text

Re-edit the *js/assemblies/root_assembly.js* file and add the *sbadmin-brand* tag as a child tag of the *sbadmin-root* tag.

The text is defined as a *text* attribute.

The *sbadmin-brand* tag must be appended to the *sbadmin-root* Component's *topbarTarget*

So here's the new edited version:


        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc" header_text_color="yellow">

          <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" golgi:appendTo="topbarTarget"/>

        </sbadmin-root>
          `;
          return {gx};
        };


Reload the *index.html* file in the browser.

You should now see the specified text in the SBAdmin Header Panel.  

Notice, however, that despite specifying the *header_text_color* to be *yellow*, it is appearing as black text.

This is because the *sbadmin-brand* Component has its own internal stylesheet within its Shadow DOM which is overriding that of the *sbadmin-root* Component.

However, just add a *color* attribute to the *sbadmin-brand* tag to change its value, eg:

        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc">

          <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" color="yellow" golgi:appendTo="topbarTarget"/>

        </sbadmin-root>
          `;
          return {gx};
        };


When you reload the *index.html* file, the text should now appear in yellow.


### Adding The Sidebar Toggle Device

To Add the Sidebar Toggle device, simply append the *sbadmin-sidebar-toggle* Component to the *sbadmin-root* Component's *topbarTarget*.

We already appended the *sbadmin-brand* Component to this Target, so we have two choices:

- explicitly append each of the child components to the *topbarTarget*, eg:


        <sbadmin-root header_bg_color="#aabbcc">

          <sbadmin-sidebar-toggle golgi:appendTo="topbarTarget" />
          <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" color="yellow" golgi:appendTo="topbarTarget" />

        </sbadmin-root>


- append a benign intermediate HTML tag such as *span* and then add the two Components as child tags of the *span*:

        <sbadmin-root header_bg_color="#aabbcc">

          <span golgi:appendTo="topbarTarget">
            <sbadmin-sidebar-toggle />
            <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" color="yellow" />
          </span>

        </sbadmin-root>


Both options should behave identically.


Reload the *index.html* file in the browser and you should now see the Sidebar toggle device.  Try clicking it to slide the Menu Panel in and out of view.


Note that the Sidebar Toggle device icon is displayed in black by default.  To change its colour, simply add a *color* attribute to the *sbadmin-sidebar-toggle* tag, eg:


            <sbadmin-sidebar-toggle color="yellow" />


If you've made the edits above correctly, on reloading the *index.html* file, the SBAdmin UI should now look like this:

![Customised Header](images/header.png)

----

## Customising the SBAdmin Footer Panel

Rather than using simple HTML tags within the SBAdmin Footer Panel, you should use the other Golgi SBAdmin WebComponents that are designed for use within it.  These include their own specific, built-in styling:

- *sbadmin-footer-text*: use this for displaying any text that you want to appear in the Footer Panel
- *sbadmin-copyright*: use this to display a copyright notice

These two Components are very similar: the only difference is that the *sbadmin-copyright* Component prefixes the specified text with "Copyright &copy;".

Let's try one out.  

Re-edit the *js/assemblies/root_assembly.js* file and add the *sbadmin-footer-text* tag as a child tag of the *sbadmin-root* tag.

        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc">

          <span golgi:appendTo="topbarTarget">
            <sbadmin-sidebar-toggle />
            <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" color="yellow" />
          </span>
          
          <sbadmin-footer-text golgi:appendTo="footerTarget">
            Developed using the golgi-sbadmin WebComponent Library
          </sbadmin-footer-text>

        </sbadmin-root>
          `;
          return {gx};
        };

Note that the *sbadmin-footer-text* Component must be appended to the *sbadmin-root* Component's *footerTarget".

Note also that the text itself can be specified withing the *textContent* of the *sbadmin-footer-text* - ie between its opening and closing tags.

Alternatively you can specify the text using a *text* attribute, eg:

          <sbadmin-footer-text text="Developed using the golgi-sbadmin WebComponent Library" golgi:appendTo="footerTarget" />


Reload the *index.html* file into the browser and you should now see the specified text appearing in the footer.

By default the text colour is black.  To change this, add a *color* attribute, eg:

          <sbadmin-footer-text golgi:appendTo="footerTarget" color="red">
            Developed using the golgi-sbadmin WebComponent Library
          </sbadmin-footer-text>

By default the text is left-justified within the footer.  You can optionally centralise it by adding the attribute: *center="true"*, eg:

          <sbadmin-footer-text golgi:appendTo="footerTarget" color="red" center="true">
            Developed using the golgi-sbadmin WebComponent Library
          </sbadmin-footer-text>


The SBAdmin UI should now appear like this in your browser:


![Customised Footer](images/footer.png)


----

## Customising the SBAdmin Menu Panel

This is where the real fun begins and we begin to actually create a working application.

The core functionality of the SBAdmin User Interface is one or more collapsible, multi-level menus which, when a bottom-level (or "leaf") menu option is clicked or tapped, causes corresponding content to appear automatically in the Content Panel.

Each time a leaf menu option is clicked, the Content Panel visually changes.

The *golgi-sbadmin* Component Library includes a set of Golgi Components that allow you to construct and customise the menu(s) you'll need for your application.

So let's begin by constructing a simple menu, initially with a header line and a single menu option that populates the Content Panel with a simple "Hello World" display.

### The *sbadmin-sidebar-menu* Component

You'll normally begin by appending the *sbadmin-sidebar-menu* Component to the *sbadmin-root* Component's *sidebarTarget*.

Re-edit the *js/assemblies/root_assembly.js* file as shown below:

        export function load() {
          let gx=`
        <sbadmin-root header_bg_color="#aabbcc">

          <span golgi:appendTo="topbarTarget">
            <sbadmin-sidebar-toggle />
            <sbadmin-brand text="Golgi SBAdmin Module Library Demonstration" color="yellow" />
          </span>
          
          <sbadmin-footer-text golgi:appendTo="footerTarget" center="true">
            Developed using the golgi-sbadmin WebComponent Library
          </sbadmin-footer-text>
          
          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
          </sbadmin-sidebar-menu>

        </sbadmin-root>
          `;
          return {gx};
        };


You can reload this version into your browser, but you'll not notice any visual changes yet: the *sbadmin-sidebar-menu* Component is simply a top-level container for all your other menu Components.

### The *sbadmin-sidebar-heading* Component

We can now add a top-level heading into our Menu Panel by adding an *sbadmin-sidebar-heading* Component.  Edit these lines:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
          </sbadmin-sidebar-menu>


If you save this version of the *js/assemblies/root_assembly.js* file and reload the *index.html* file into the browser, you shoud now see our heading in the Menu Panel:

![Menu Header](images/menu1.png)


### The *sbadmin-sidebar-menu-item* Component

Bottom-level, or "leaf" Menu Options are specified using the *sbadmin-sidebar-menu-item* Component.

This Component can define three things:

- the menu text (mandatory)
- an icon (optional)
- a Golgi Assembly that will be displayed in the Content Panel when the menu text is clicked or tapped.

These are specified using the following corresponding attributes (which are case-sensitive):

- text
- iconName
- contentPage

So let's add one by editing these lines in your *js/assemblies/root_assembly.js* file:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" />
          </sbadmin-sidebar-menu>


If you save this version of the *js/assemblies/root_assembly.js* file and reload the *index.html* file into the browser, you shoud now see our menu option in the Menu Panel:

![Menu Hello World](images/menu2.png)

If you try clicking the *Hello World* menu option, nothing will currently happen.  In fact if you were to examine the browser's JavaScript Console, you'd see that it reports an error, telling you that it can't find your Golgi Assembly named *helloworld*.  That, of course, is because we haven't yet created it.

### Content Panel Assemblies

So far we've been defining everything in our Root Assembly file: *js/assemblies/root_assembly.js*.

Content Panel Assemblies are defined in their own separate files, but held within the same folder as the Root Assembly file, since this is where we've configured Golgi to find Assemblies.

Create a new file: *js/assemblies/helloworld.js*.  Let's just create something very simple to begin with:

        export function load() {
          let gx=`
        <sbadmin-content-page>
          <div>Hello World!</div>
        </sbadmin-content-page>
          `;

          return {gx};
        };

Notice that a Content Panel Assembly **must** define its content inside the *sbadmin-content-page* Component.

This Component contains logic necessary for automatically showing and hiding itself in response to Menu Panel activity.

For now we're just going to use a simple *div* tag to display the text "Hello World!".  We'll see how to create more complex Content Panel content in a later section of this tutorial.

Having saved this new Assembly file, try reloading the *index.html* file into the browser (as always you may find that you need to clear the browser's cache first).

When you click the "Hello World" Menu option, you should now see the next "Hello World!" appear in the Content Panel:

![Content Hello World](images/menu3.png)


### Menu Icons

You can optionally add an icon next to each of your menu options to add some visual interest.

Golgi's SBAdmin UI implementation makes use of [the Feather icon library](https://feathericons.com/).

To apply an icon, find the one you want from the Feather Icon web page and note its name.  I'm going to use the
one named *globe" for my Hello World menu item.  

Now re-edit the *js/assemblies/root_assembly.js* file and add the icon name as an *iconName* attribute to the *sbadmin-sidebar-menu-item* Component:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
          </sbadmin-sidebar-menu>

The globe icon should now appear when you save and reload:

![Icon Hello World](images/menu4.png)


### Multiple Menu Options

So now let's add a couple more simple menu options with corresponding simple Content Panel Assemblies, so we can see how the content switches as you click the menu options.

First, re-edit the *js/assemblies/root_assembly.js* file and add two more menu items here:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
            <sbadmin-sidebar-menu-item text="Second Option" contentPage="content2" />
            <sbadmin-sidebar-menu-item text="Third Option" contentPage="content3" />
          </sbadmin-sidebar-menu>

Feel free to add icons to them if you wish.

Next, create the two new Content Panel Assemblies:

#### *js/assemblies/content2.js*

        export function load() {
          let gx=`
        <sbadmin-content-page>
          <div>This is the Content for the Second Menu Option</div>
        </sbadmin-content-page>
          `;

          return {gx};
        };

#### *js/assemblies/content3.js*

        export function load() {
          let gx=`
        <sbadmin-content-page>
          <div>This is the Content for the Third Menu Option</div>
        </sbadmin-content-page>
          `;

          return {gx};
        };


Save the three files on your web server's file system and reload the *index.html* file.

You should now see three menu options, and clicking them will switch the content between your three coresponding Content Panel Assemblies.


### Multi-level Menus

The *golgi-sbadmin* Library includes Components that allow you to very quickly and easily create multi-level menus that can visually expand and contract as you navigate within them.

Let's add one.


First, re-edit the *js/assemblies/root_assembly.js* file and add a new heading:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
            <sbadmin-sidebar-menu-item text="Second Option" contentPage="content2" />
            <sbadmin-sidebar-menu-item text="Third Option" contentPage="content3" />

            <sbadmin-sidebar-heading text="Multi-level Menu" />

          </sbadmin-sidebar-menu>


A multi-level menu first requires use of the *sbadmin-sidebar-nested-menu* Component to create the outer container.
You define its text and optionally an iconName.

So edit this section of the file to look like this:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
            <sbadmin-sidebar-menu-item text="Second Option" contentPage="content2" />
            <sbadmin-sidebar-menu-item text="Third Option" contentPage="content3" />

            <sbadmin-sidebar-heading text="Multi-level Menu" />

            <sbadmin-sidebar-nested-menu text="Select from Within">
            </sbadmin-sidebar-nested-menu>

          </sbadmin-sidebar-menu>

We could add menu items inside this - let's just re-use the ones we've already created for now:

          <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">
            <sbadmin-sidebar-heading text="Menu Demo" />
            <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
            <sbadmin-sidebar-menu-item text="Second Option" contentPage="content2" />
            <sbadmin-sidebar-menu-item text="Third Option" contentPage="content3" />

            <sbadmin-sidebar-heading text="Multi-level Menu" />

            <sbadmin-sidebar-nested-menu text="Select from Within">
              <sbadmin-sidebar-menu-item text="Hello World" contentPage="helloworld" iconName="globe" />
              <sbadmin-sidebar-menu-item text="Second Option" contentPage="content2" />
              <sbadmin-sidebar-menu-item text="Third Option" contentPage="content3" />
            </sbadmin-sidebar-nested-menu>

          </sbadmin-sidebar-menu>


Try it out by saving this version of the file and reloading the *index.html* file.

You should see this:

![Multi Level Menu Closed](images/multilevel1.png)


And when you click on the text "Select from Within", the three menu items appear:

![Multi Level Menu Open](images/multilevel2.png)

Clicking the text "Select from Within" again will hide the menu items again.


