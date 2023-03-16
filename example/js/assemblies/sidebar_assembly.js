export function load() {

  let gx=`

<sbadmin-sidebar-menu>
  <sbadmin-sidebar-menu-item text="Carousel and Form Demo" iconName="info" contentPage="about"/>
  <sbadmin-sidebar-heading text="Multi-Level Menu Demo" />

  <sbadmin-sidebar-nested-menu iconName="server" text="Back-end Frameworks">
    <sbadmin-sidebar-menu-item text="QEWD" contentPage="qewd"/>
    <sbadmin-sidebar-menu-item text="mgweb Server" contentPage="mgweb-server"/>
    <sbadmin-sidebar-menu-item text="EWD" contentPage="ewd"/>
  </sbadmin-sidebar-nested-menu>

  <sbadmin-sidebar-nested-menu iconName="map" text="Language Bindings and Interfaces">
    <sbadmin-sidebar-sub-menu text="Language Bindings for IRIS and YottaDB" isLeafMenu="true">
      <sbadmin-sidebar-menu-item text="PHP" contentPage="mgphp"/>
      <sbadmin-sidebar-menu-item text="Python" contentPage="mgpython"/>
      <sbadmin-sidebar-menu-item text="Node.js" contentPage="mgdbx"/>
    </sbadmin-sidebar-sub-menu>
    <sbadmin-sidebar-sub-menu text="Interfaces for IRIS and YottaDB" isLeafMenu="true">
      <sbadmin-sidebar-menu-item text="mg_web: Alternative to WebLink, CSP and mgwsi" contentPage="mgweb"/>
      <sbadmin-sidebar-menu-item text="mg-dbx: Node.js Interface" contentPage="mgdbx"/>
    </sbadmin-sidebar-sub-menu>
    <sbadmin-sidebar-sub-menu text="Integrating YottaDB with InterSystems Products" isLeafMenu="true">
      <sbadmin-sidebar-menu-item text="mg_pwind: YottaDB Process Window" contentPage="pwind"/>
    </sbadmin-sidebar-sub-menu>
  </sbadmin-sidebar-nested-menu>

</sbadmin-sidebar-menu>

  `;

  return {gx};
};
