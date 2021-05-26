
<template>
<table id="datosconvenio" class="tableContenido" width="100%" border="0">
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Programación de Obra</h3>
            <hr class="red">
            <form role="form">
            </form>
        </div>
        </div>
        <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">Ingresa los datos del Convenio</h4>
            </div>
            <div class="panel-collapse collapse in">
              <div class="panel-body">
                <div class="row">

                  <div class="col-md-4">
                    <div>
                    <label>Año:</label>
                    <ejs-dropdownlist  
                        id="anio"    
                        :dataSource="anioData"
                        :fields="anioFields"
                        placeholder="Selecciona el año"
                        v-model="anio"
                      
 
                    >
                        </ejs-dropdownlist>

                    </div>

                    </div>
                  <div class="col-md-3 form-group">
                    <div> 
                    <label class="control-label">Tramo:</label>
                      <input v-model="tramo"   
                        id="tramo" 
                        name="tramo" 
                        class="form-control"  
                        type="text" 
                        placeholder="Ingrese el Tramo"  
                        v-model.trim="$v.tramo.$model"
                        value=""/>  
                    </div>
                                            <div class="row col-md-10">
                            <small v-if="!$v.tramo.required && $v.tramo.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>  
                  
                  </div>
                  <div class="col-md-3 form-group">
                    <div>
                    <label class="control-label">Monto (mdp):</label>
                        <ejs-numerictextbox  
                            id="monto"
                            placeholder="Ingrese el Monto (mdp)"
                            v-model="monto"
                            :min="min"
                            :max="max"
                            :showSpinButton='false'>
                        </ejs-numerictextbox> 
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 form-group">
                  <div>
                    <label class="control-label">Origen de recurso:</label>
                    <ejs-dropdownlist  
                        id="origen"    
                        :dataSource="origenRecData"
                        :fields="origenRecFields"
                        placeholder="Selecciona el Origen de  Recurso"
                        v-model="origen"
                        >
                    </ejs-dropdownlist>
                  </div>
                  </div>
                  <div class="col-md-3 form-group">
                    <div>
                    <label class="control-label">Meta (km):</label>
                        <ejs-numerictextbox  
                            id="meta"
                            placeholder="Ingrese la Meta (km)"
                            v-model="meta"
                            :min="min"
                            :max="max"
                            :showSpinButton='false'>
                        </ejs-numerictextbox> 
                    </div>
                  </div>
                  <div class="col-md-3 form-group">
                    <label class="control-label">Archivo del Convenio (PDF):</label>
                    <input  id="fileconvenio" type="file" accept=".pdf" @change="onFileSelected" name="myfile" >
                  </div>
                  <div class="col-md-12">
                    <button type="button" v-on:click="GuardaDatosConvenio" class="btn btn-default pull-right vertical-buffer" data-toggle="modal">Agregar Convenio</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="row">
        <div class="col-md-12">
          <h5 class="small-top-buffer small-bottom-buffer">Convenios agregados</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th class="text-center">Año del convenio</th>
                <th class="text-center">Tramo</th>
                <th class="text-center">Monto (mdp)</th>
                <th class="text-center">Origen de recurso</th>
                <th class="text-center">Meta (km)</th>
                <th class="text-center">Archivo del convenio</th>
                <th class="text-center">Presupuesto</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"><button class="btn btn-primary btn-sm" :disabled="btnSaveDisabled" type="button" aria-label="Presupuesto" title="Presupuesto" onclick="window.location.href = 'presupuesto';">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>
                <td class="text-center">
                  <button class="btn btn-primary btn-sm" :disabled="btnSaveDisabled" type="button" aria-label="Editar datos" title="Ver datos">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                  <button class="btn btn-primary btn-sm" :disabled="btnSaveDisabled" type="button" aria-label="Eliminar convenio" title="Eliminar convenio">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <hr />
          <button class="btn btn-default" type="button">Cancelar</button>
          <button class="btn btn-primary" type="button" disabled>Guardar</button>
        </div>
      </div>
    </div>
</table>    
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager } from "@syncfusion/ej2-data";
import Vue from "vue";
import { required } from 'vuelidate/lib/validators';
import VueResource from 'vue-resource';
import { generarConvenio } from '@/api/obras';
import { getconvenio } from '@/api/obras'


Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(VueResource);

export default {
    name: 'DatosConvenio',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:''
        },
    },
    data(){
        return {
            camino_id:'',
            anio:'',
            tramo: '',
            monto: '',
            origen: '',
            meta: '',
            archivo: null,
            min: 0,
            max: 999999,   
            btnSaveDisabled: true,
            Presup: '',
            anioFields: { text: 'name', value: 'id' },     
            anioData: new DataManager([
               { id: 2019, name: '2019' },
               { id: 2020, name: '2020' },
               { id: 2021, name: '2021' },
               { id: 2022, name: '2022' },
               { id: 2023, name: '2023' },
               { id: 2024, name: '2024' },
            ]),  
            origenRecFields: { text: 'name', value: 'id' },     
            origenRecData: new DataManager([
               { id: 'PEF', name: 'PEF' },
               { id: 'INDEP', name: 'INDEP' },
            ]),  
              editmode: false
        }
    },
    validations: {
        tramo: {
            required,

        },
    },
    methods:{ 
         async GuardaDatosConvenio(){    
           
             this.$emit("show-error", false); 
             this.$v.$touch()
             if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
             this.btnSaveDisabled  = true
             try{
               console.log("valor del anio")
                
                const data = {
                    anio:this.anio,
                    tramo:this.tramo,
                    monto:this.monto,
                    origen:this.origen,
                    meta:this.meta,
                    archivo:this.archivo,
                }
                console.log("año")
                console.log(data.anio)
                console.log("otro-año")
                console.log(this.anio)
                console.log("datos-envia")
                console.log(data)

                let formData = new FormData();
                formData.append("anio", this.anio);
                formData.append("tramo",this.tramo);
                formData.append("monto",this.monto);
                formData.append("origen",this.origen);
                formData.append("meta",this.meta);
                formData.append("archivo", this.archivo);
                //formData.append("camino_id",this.$route.params.obraId);

                const resp = await generarConvenio(formData) 
                
               console.log("resp")
               console.log(resp)

              


                }
                
                catch(err){    
                    this.btnSaveDisabled  = true                
                    console.log('error al obtener el convenio')
                    console.log(err)
                    $('#alertModal').modal('show')
                    this.$emit("show-error",'Error al guardar beneficiario');                  
                }
                
            }
            
        },
        async populate () {},
onFileSelected (event) {
               this.archivo = event.target.files[0];
               
                
            }
    }
}
</script>
<style scoped>
.form-control-tramo{
    width: 20%;
 
}
</style>