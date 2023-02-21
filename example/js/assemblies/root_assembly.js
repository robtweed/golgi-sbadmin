export function load() {

  let gx=`
<sbadmin-root>
  <assembly:header_assembly golgi:appendTo="topbarTarget" />
  <assembly:footer_assembly golgi:appendTo="footerTarget" />
  <assembly:sidebar_assembly golgi:appendTo="sidebarTarget" />

  <sbadmin-modal static="true" closeButton="true">
    <div golgi:appendTo="header">Welcome to the PhotoEntry Controller Application</div>

    <div>This is the Modal Body Text</div>

    <div golgi:appendTo="footer">Modal Footer Text</div>

  </sbadmin-modal>

</sbadmin-root>
  `;

  return {gx};
};