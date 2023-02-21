export function load() {
  let gx=`
<sbadmin-content-page>
  <sbadmin-spacer />

  <sbadmin-carousel>
    <sbadmin-carousel-item active="true">

      <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
        <sbadmin-card-header text="PhotoEntry Controller" />
        <sbadmin-card-body>
          <sbadmin-card-text>
Testing
          </sbadmin-card-text>
        </sbadmin-card-body>
        <sbadmin-card-footer text="My footer Text" />
      </sbadmin-card>

    </sbadmin-carousel-item>

    <sbadmin-carousel-item>

      <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
        <sbadmin-card-header text="Panel 2" />
        <sbadmin-card-body>
          <sbadmin-form>
            <fieldset>
              <sbadmin-select name="selectField"  label="Select" golgi:hook="configure"/>
              <sbadmin-select name="selectMultiple" label="Select Multiple" multiple="true" size="3" golgi:hook="configureMultiple"/>
              <sbadmin-input type="text" label="Test Label" name="text" value="Hello!" cls="form-control form-control-lg" />
              <sbadmin-input type="date" label="Enter Date" name="date" />
              <sbadmin-range label="Enter Range" name="range" />
              <sbadmin-textarea label="Textarea" name="textarea" value="Hello again!" />
              <sbadmin-checkbox-group name="check1">
                <sbadmin-checkbox label="Check 123" value="123" />
                <sbadmin-checkbox label="Check 234" value="234" />
              </sbadmin-checkbox-group>
 
              <sbadmin-checkbox-group name="check2" switch="true" label="Single Checkbox" value="999" />
 
              <sbadmin-radio-group name="radio1">
                <sbadmin-radio value="1" label="one" checked="true" />
                <sbadmin-radio value="2" label="two" />
                <sbadmin-radio value="3" label="three" />
              </sbadmin-radio-group>
              <sbadmin-range label="Enter Range 2" min="10" max="22" value="11" name="range2" cls="w-25"/>
              <sbadmin-button color="red" text="Submit" golgi:hook="configure" />
              <sbadmin-button color="blue" text="Test" golgi:hook="test" />
            </fieldset>      
          </sbadmin-form>
        </sbadmin-card-body>
        <sbadmin-card-footer text="My footer Text 2" />
      </sbadmin-card>

    </sbadmin-carousel-item>

    <sbadmin-carousel-item>

      <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
        <sbadmin-card-header text="Panel 3" />
        <sbadmin-card-body>
          <sbadmin-card-text>
This is Panel 3
          </sbadmin-card-text>
        </sbadmin-card-body>
        <sbadmin-card-footer text="My footer Text 3" />
      </sbadmin-card>

    </sbadmin-carousel-item>

  </sbadmin-carousel>
</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-select': {
      configure: function() {
        this.options([
          {value: 'a', text: 'Option 1'},
          {value: 'b', text: 'Option 2'}
        ]);
      },
      configureMultiple: function() {
        this.options([
          {value: 'm1', text: 'Option 1'},
          {value: 'm2', text: 'Option 2'},
          {value: 'm3', text: 'Option 3'},
          {value: 'm4', text: 'Option 4'}
        ]);
      }
    },
    'sbadmin-radio': {
      configure: function() {
        this.options([
          {value: 'a', label: 'Option a', checked: true},
          {value: 'b', label: 'Option b'},
          {value: 'c', label: 'Option c'}
        ]);
      }
    },
    'sbadmin-button': {
      configure: function() {
        let _this = this;
        this.onClicked = function(e) {
          console.log('*** button clicked ****');

          console.log(_this.form.values);
        }
      },
      test: function() {
        let _this = this;
        this.onClicked = function(e) {
          let form = _this.getParentComponent('sbadmin-form');
          console.log(9999991111);
          console.log(form);
          let cbg = form.fields[7];
          let cb = cbg.checkboxes[0];
          console.log(cb);
          cb.checkbox.focus();
        };
      }
    }
  }
  return {gx, hooks};
};