<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Registro de Obra</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="email-01">Estado</label>
                        <ejs-combobox :dataSource='dataItem' :fields='dataFields' placeholder='Selecciona un pais'
                        :change='onCountryChange' ref='comboboxInstance'>
                        </ejs-combobox>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Municipio</label>
                    <ejs-combobox :dataSource='stateDataItem' :fields='stateDataFields' 
                    placeholder='Selecciona un estado' :enabled='enableCombobox' :query='childDataQuery' >
                    </ejs-combobox>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Número del INEGI</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Región</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Comunidad Indígena</label>
                        <div class="radio form-control">
                            <label>
                                <input type="radio" name="radio-01" value="opcion-01" checked="checked"> Sí
                            </label>
                            <label>
                                <input type="radio" name="radio-01" value="opcion-02" checked="checked"> No
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Grado de marginación</label>
                        <select class="form-control" id="municipio">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                </div>












                <div class="form-group">
                    <button class="btn btn-primary pull-right" type="submit">Enviar</button>
                </div>

            </form>
        </div>
    </div>


</template>

<script>
import Vue from "vue";
import {ComboBoxPlugin} from "@syncfusion/ej2-vue-dropdowns";
import { Query } from '@syncfusion/ej2-data';
Vue.use(ComboBoxPlugin);

export default Vue.extend({
  data: function() {
    return {
      eneableCombobox: false,
      childDataQuery: null,
      dataItem:[
        { CountryName: 'Aguascalientes', CountryId: '1' },
        { CountryName: 'Baja California', CountryId: '2' },
        { CountryName: 'Campeche', CountryId: '4' },
        { CountryName: 'Coahuila de Zaragoza', CountryId: '5' },
        { CountryName: 'Colima', CountryId: '6' }
      ],
      dataFields: { text: 'CountryName', value: 'CountryId' },
      stateDataItem:[
        { StateName: 'Cosío', StateId: '004', CountryId: '1' },
        { StateName: 'El Llano', StateId: '010', CountryId: '1' },
        { StateName: 'Mexicali', StateId: '002', CountryId: '2' },
        { StateName: 'Tecate', StateId: '003', CountryId: '2' },
        { StateName: 'Champotón', StateId: '105', CountryId: '4' },
        { StateName: 'Calakmul', StateId: '106', CountryId: '4' },
        { StateName: 'Abasolo', StateId: '107', CountryId: '5' },
        { StateName: 'Allende', StateId: '108', CountryId: '5' },
        { StateName: 'Armería', StateId: '109', CountryId: '6' },
        { StateName: 'Minatitlán', StateId: '110', CountryId: '6' }
      ],
      stateDataFields: {text: 'StateName', value: 'StateId'},
      enableCombobox: false,
    };
  },
  methods: {
    onCountryChange: function(args) {
      this.enableCombobox = true;
      this.childDataQuery = new Query().where('CountryId', 'equal', args.value);
    }
  }
});
</script>


<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>
