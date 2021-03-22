<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Alta de caminos</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="email-01">Estado</label>
                        <ejs-combobox :dataSource='dataItem' :fields='dataFields' placeholder='Selecciona un estado'
                        :change='onCountryChange' ref='comboboxInstance'>
                        </ejs-combobox>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Municipio</label>
                    <ejs-combobox :dataSource='stateDataItem' :fields='stateDataFields' 
                    placeholder='Selecciona un municipio' :enabled='enableCombobox' :query='childDataQuery' >
                    </ejs-combobox>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region"></label>
                        <!--input class="form-control" id="region" placeholder="" type="number"-->
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Loclidad</label>
                        <ejs-combobox :dataSource='stateDataItem' :fields='stateDataFields' 
                        placeholder='Selecciona una localidad' :enabled='enableCombobox' :query='childDataQuery' >
                        </ejs-combobox>
                    </div>
                </div>
                <br>
                <hr class="red">
                <h4>Datos a nivel municipal</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Tipo de Población</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Región</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Ubicación</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th> &nbsp; </th>
                            <th> &nbsp;  </th>
                        </tr>
                        <br>
                        <tr>
                            <th>Grado de marginación</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Población indígena</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Población total</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <br>
                        <tr>
                            <th>Clave INEGI estado</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th>Clave INEGI municipio</th>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <br>
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
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";
Vue.use(ComboBoxPlugin);


export default Vue.extend({
  data: function() {
    const newLocal='http://10.33.151.219:8001/api/v1/estado/';
    return {
      eneableCombobox: false,
      childDataQuery: null,
      
      dataItem: new DataManager({
        url: newLocal,
        adaptor: new WebApiAdaptor,
        crossDomain: true
      }),
      dataFields: { text: 'nom_agee', value: 'cve_agee' },

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
