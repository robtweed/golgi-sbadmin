let def = {
  name: 'sbadmin-radio-option',

  html: `
<div class="form-check">
  <input class="form-check-input" type="radio" golgi:prop="radio" golgi:on_click="onClicked">
  <label class="form-check-label" golgi:prop="label"></label>
</div>
  `,

  methods: `
    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (typeof state.label === 'undefined') {
        this.label.className = 'label-hidden';
        this.rootElement.classList.remove('form-check');
      }
      else {
        this.label.textContent = state.label;
      }
      if (state.readonly) {
        this.radio.readOnly = true;
      }
      if (state.disabled) {
        this.radio.disabled = true;
      }
      if (state.value) {
        this.radio.value = state.value;
      }
      if (state.checked) {
        this.radio.checked = true;
      }
      if (state.inline) {
        this.rootElement.classList.add('form-check-inline');
      }
      if (state.cls) {
        this.radio.className = state.cls;
      }
      if (state.labelcls) {
        this.label.className = state.labelcls;
      }

    }

    onClicked() {
      console.log('radio ' + this.radio.name + ' checked: value= ' + this.value);
      if (this.radioGroup) {
        this.radioGroup.value = this.value;
      }
    }

    set value(value) {
      this.radio.value = value;
    }

    get value() {
      return this.radio.value;
    }

    get isChecked() {
      return this.radio.checked;
    }

    check() {
      this.radio.checked = true;
    }

    get checked() {
      return this.radio.checked;
    }

    readonly() {
      this.radio.readOnly = true;
    }

    disable() {
      this.radio.disabled = true;
    }

    enable() {
      this.radio.disabled = false;
      this.radio.readOnly = false;
    }

    onBeforeState() {
      let name = this.name + '';
      this.radioGroup = this.getParentComponent('sbadmin-radio');
      if (this.radioGroup) {
        this.radio.name = this.radioGroup.name;
        this.radioGroup.optionsByName.set(name, this);
      }
      this.radio.id = name;
      this.label.setAttribute('for', name);
    }

  `
};
export {def};
