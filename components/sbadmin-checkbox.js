function load(){let e="sbadmin-checkbox",c=-1;customElements.define(e,class extends HTMLElement{constructor(){super(),c++;this.html='<div class="form-check"><input class="form-check-input" type="checkbox" golgi:prop="checkbox" golgi:on_click="onClicked"> <label class="form-check-label" golgi:prop="label"></label></div>',this.name=e+"-"+c}setState(e){void 0===e.label?(this.label.className="label-hidden",this.rootElement.classList.remove("form-check")):this.label.textContent=e.label,e.readonly&&(this.checkbox.readOnly=!0),e.disabled&&(this.checkbox.disabled=!0),e.value&&(this.checkbox.value=e.value),e.checked&&(this.checkbox.checked=!0),e.inline&&this.rootElement.classList.add("form-check-inline"),e.cls&&(this.checkbox.className=e.cls),e.labelcls&&(this.label.className=e.labelcls),e.switch&&this.rootElement.classList.add("form-switch")}onClicked(){this.checkbox.checked?this.checkboxGroup.valuesById.set(this.checkbox.id,this.checkbox.value):this.checkboxGroup.valuesById.delete(this.checkbox.id),this.checkbox.checked||this.checkbox.classList.toggle("showImage")}isSwitch(){this.rootElement.classList.add("form-switch")}set labelText(e){this.label.textContent=e}set value(e){this.checkbox.value=e}get value(){return this.checkbox.value}get isChecked(){return this.checkbox.checked}check(){this.checkbox.checked=!0}get checked(){return this.checkbox.checked}readonly(){this.checkbox.readOnly=!0}disable(){this.checkbox.disabled=!0}enable(){this.checkbox.disabled=!1,this.checkbox.readOnly=!1}onBeforeState(){var e=this.name+"";this.checkboxGroup=this.getParentComponent("sbadmin-checkbox-group"),this.checkboxGroup&&(this.checkbox.name=this.checkboxGroup.name,this.checkboxGroup.count++,this.checkboxGroup.checkboxes.push(this)),this.checkbox.id=e,this.label.setAttribute("for",e)}})}export{load};