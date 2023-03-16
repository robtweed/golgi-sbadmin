export function load() {

  let gx=`
<sbadmin-root>
  <assembly:header_assembly golgi:appendTo="topbarTarget" />
  <assembly:footer_assembly golgi:appendTo="footerTarget" />
  <assembly:sidebar_assembly golgi:appendTo="sidebarTarget" />

  <sbadmin-modal static="true" closeButton="true">
    <div golgi:appendTo="header">Golgi SBAdmin Module Library Demonstration</div>

    <div>You could be using Golgi, together with this Module Library to create
your own application that makes use of the SBAdmin User Interface in
just a matter of hours, without any complex build-chain tooling.
    </div>

    <div golgi:appendTo="footer">Check it out today!</div>

  </sbadmin-modal>

</sbadmin-root>
  `;

  return {gx};
};