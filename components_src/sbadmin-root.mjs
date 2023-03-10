let def = {
  name: 'sbadmin-root',
  useShadowDOM: true,

  css: `
span {
  font-family: Metropolis, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.topnav {
    z-index: 1039;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 0;
    height: 3.625rem;
    z-index: 1039;
    font-size: .9rem;
}
.shadow {
    box-shadow: 0 .15rem 1.75rem 0 rgba(33,40,50,0.15)!important;
}
.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.navbar-expand {
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.bg-topnav {
    --bs-bg-opacity: 1;
    background-color: #bdddf6;
}
#layoutSidenav {
    display: flex;
}
.topnav #layoutSidenav #layoutSidenav_nav {
    width: 15rem;
    height: 100vh;
    z-index: 1038;
}
.topnav #layoutSidenav #layoutSidenav_nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}

#layoutSidenav #layoutSidenav_nav {
    flex-basis: 15rem;
    flex-shrink: 0;
    transition: transform .15s ease-in-out;
    z-index: 1038;
    transform: translateX(-15rem);
}
.topnav #layoutSidenav #layoutSidenav_nav .sidenav {
    padding-top: 3.625rem;
}
.sidenav-light {
    background-color: #fff;
    color: #212832;
}
.sidenav {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-wrap: nowrap;
    font-size: .9rem;
}
.shadow-right {
    box-shadow: .15rem 0 1.75rem 0 rgba(33,40,50,0.15)!important;
}
.navbar-nav-scroll {
    max-height: 100%;
    overflow-y: auto;
}
.sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(0);
}
.sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1037;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

#layoutSidenav #layoutSidenav_content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    flex-grow: 1;
    min-height: calc(100vh - 3.625rem);
    margin-left: -15rem;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.py-4 {
    padding-top: 1.5rem!important;
    padding-bottom: 1.5rem!important;
}
.container-fluid {
    width: 100%;
    padding-right: var(--bs-gutter-x,0.75rem);
    padding-left: var(--bs-gutter-x,0.75rem);
    margin-right: auto;
    margin-left: auto;
}
.bg-light {
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-light-rgb),var(--bs-bg-opacity))!important;
}
.mt-auto {
    margin-top: auto!important;
}
.align-items-center {
    align-items: center!important;
}
.justify-content-between {
    justify-content: space-between!important;
}
.d-flex {
    display: flex!important;
}
small, .small {
    font-size: .875em;
}
@media (min-width: 992px) {
  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0);
  }
  #layoutSidenav #layoutSidenav_content {
    margin-left: 0;
    transition: margin 0.15s ease-in-out;
  }

  .sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(-15rem);
  }
  .sidenav-toggled #layoutSidenav #layoutSidenav_content {
    margin-left: -15rem;
  }
  .sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
    display: none;
  }
}
*, ::before, ::after {
    box-sizing: border-box;
}
  `,

  html: `
<span>
  <nav class="topnav navbar navbar-expand shadow navbar-mgw bg-topnav" golgi:prop="topbarTarget"></nav>

  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sidenav shadow-right sidenav-light navbar-nav-scroll" id="sidenavAccordion" golgi:prop="sidebarTarget"></nav>
    </div>
    <div id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4" golgi:prop="contentTarget"></div>
      </main>
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small" golgi:prop="footerTarget"></div>
        </div>
      </footer>
    </div>
  </div>
</span>
  `,

  methods: `
    getMenuItemActive() {
      return this.ActiveMenuComponent;
    }

    setMenuItemActive(comp) {
      this.ActiveMenuComponent = comp;
    }

    addToPage2MenuMap(pageName, menuComp) {
      this.page2MenuMap.set(pageName, menuComp);
    }

    setPageActive(pageName, obj) {

      console.log('**** setPageActive for ' + pageName);
      console.log(this);
      console.log(this.contentPages);

      // switch the active menu item if appropriate

      let menuComp = this.page2MenuMap.get(pageName);
      if (menuComp) {
        let activeComp = this.getMenuItemActive();
        if (activeComp) {
          activeComp.setInactive();
        }
        menuComp.setActive();
        this.setMenuItemActive(menuComp);
      }

      // set selected page to active
      // first hide allcontent  pages
      let page;
      for (page of this.contentPages.values()) {
        page.hide();
      }
      page = this.contentPages.get(pageName);
      console.log(111111111);
      console.log(page);
      
      if (page) {
        page.show();
        if (page.onSelected) {
          console.log(222222222);
          page.onSelected.call(page, obj);
        }
      }
    }

    async switchToPage(pageName, obj) {
      console.log('**** switchToPage ' + pageName);
      if (!this.contentPages.has(pageName)) {
        console.log('*** loading content page ' + pageName);
        this.context.assemblyName = pageName;
        await this.renderAssembly(pageName, this.contentTarget, this.context);
        console.log(33333333);
      }
      console.log(444444);
      this.setPageActive(pageName, obj);
    }

    setState(state) {
      if (state.sidebar_colour) {
        let target = this.sidebarTarget.classList;
        target.remove(sidebar_colour);
        sidebar_colour = state.sidebar_colour;
        if (!sidebar_colour.includes('-')) sidebar_colour = 'bg-gradient-' + state.sidebar_colour;
        target.add(sidebar_colour);
      }
    }

    async onBeforeState() {
      this.contentPages = new Map();
      this.page2MenuMap = new Map();
    }

  `
};
export {def};
