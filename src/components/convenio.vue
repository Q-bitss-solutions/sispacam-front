
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
                        v-model.trim="$v.anio.$model"
                        :disabled = "editmode"
 
                    >
                        </ejs-dropdownlist>

                    </div>
                    <div class="row col-md-10">
                            <small v-if="!$v.anio.required && $v.anio.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
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
                        :disabled = "editmode"
                        value=""/>  
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
              <ejs-grid   ref="grid"
                    :dataSource="data" :gridLines='lines' 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :allowFiltering='true'
                    :allowTextWrap='true'
                    :rowSelected='rowSelected'
                    >
            <e-columns>
                <e-column field='id' headerText='id' :visible='flag'></e-column>
                <e-column field='anio' headerText='Año del Convenio' ></e-column>
                <e-column field='tramo' headerText='Tramo'></e-column>
                <e-column field='monto' headerText='Monto' ></e-column>
                <e-column field='origen' headerText='Origen del recurso' ></e-column>
                <e-column field='meta' headerText='Meta' ></e-column>
                <e-column field='Archivo' headerText='Archivo' ></e-column>
                <e-column field="id" :template='editTemplateA' headerText='Edicion' textAlign='Center' :visible='flagEdicion'></e-column>
                <e-column field="id" :template='cancelTemplate' headerText='Cancelar' textAlign='Center' :visible='flagEdicion'></e-column>
                
                <e-column field="id" :template='editTemplateP' headerText='Presupuesto' textAlign='Center' :visible='flagEdicion'></e-column> 
              
            </e-columns>
            
        </ejs-grid>
          

            </thead>
            <tbody>

 
              <tr >

                <!--<td class="text-center"></td>
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
                -->
              </tr> 
              
            </tbody>
           
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <hr />
          <button class="btn btn-default" type="button" disabled>Cancelar</button>
          <button class="btn btn-primary" type="button" disabled>Guardar</button>
        </div>
      </div>
           <div class="modal fade" id="addConvenio" tabindex="-1" role="dialog" aria-labelledby="addConcept"
           aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <h4 class="modal-title">Aviso del Sistema</h4>
                   </div>
                   <div class="modal-body">
                       <p>Se guardaron correctamente los datos del convenio,</p>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-default" data-dismiss="modal" >Cerrar</button>
                   </div>
               </div><!-- /.modal-content -->
           </div><!-- /.modal-dialog -->
       </div><!-- /.modal -->

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
import { getconvenio } from '@/api/obras';
import { axios } from 'axios';
import VueAxios from 'vue-axios';
import ButtonGrid from '@/components/ButtonGrid'
import Cancelaconv from '@/components/CancelaObra'


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
            info: null,
            flag: false,
            lines: 'Both',
            data:data,
            breadcrumb: [''],
            flagEdicion:true,
            pageSettings: { pageCount: 6, pageSize: 20  },
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
        anio: {
            required,

        },
    },
    methods:{ 
      rowSelected: function(args) {
        
        let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();
        let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
        this.anio = selectedrecords[0].anio
        this.tramo = selectedrecords[0].tramo
        this.monto = selectedrecords[0].monto
        this.origen = selectedrecords[0].origen
        this.meta = selectedrecords[0].meta
        this.anioFields = selectedrecords[0].anio
        conseole.log("this.anio")
        console.log(this.anio)
      },

      editTemplateA () { 
            return { 
                template:ButtonGrid,
               
                
        
            }
            
        },
        editTemplateP () { 
            return { 
                template:ButtonGrid 
            }
        },
        cancelTemplate () {
            return {
                template:Cancelaconv
            }
        },
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
                //formData.append("archivo", this.archivo);
                //formData.append("camino_id",this.$route.params.obraId);

                const resp = await generarConvenio(formData) 
                
               console.log("resp")
               console.log(resp)
               console.log(editmode)

                 $('#addConvenio').modal('show')
                 this.btnSaveDisabled  = false


                }
                
                catch(err){    
                    this.btnSaveDisabled  = true                
                    console.log('error al obtener el convenio')
                    console.log(err)
                    $('#alertModal').modal('show')
                    
                    this.$emit("show-error",'Error al guardar ');                  
                }
                
            }
            
        },


        async populate () {


        },

         onFileSelected (event) {
               this.archivo = event.target.files[0];
               
                
            }
             
            
    }
}
const data =
[
    {
    id: 1,
    anio:'2019',
    tramo:'Tramo',
    monto:'123.00',
    origen:'PEF',
    meta:'1.2',
    Archivo:'Pruebas.pdf'
    }  , 
     {
    id: 2,
    anio:'2020',
    tramo:'Tramo',
    monto:'456.00',
    origen:'PEF',
    meta:'2.2',
    Archivo:'Pruebas2.pdf'
    },        
       {
    id: 3,
    anio:'2021',
    tramo:'Tramo',
    monto:'789.00',
    origen:'PEF',
    meta:'3.2',
    Archivo:'Pruebas3.pdf'
    },
           {
    id: 4,
    anio:'2022',
    tramo:'Tramo',
    monto:'111.00',
    origen:'PEF',
    meta:'4.2',
    Archivo:'Pruebas4.pdf'
    }   ,
           {
    id: 5,
    anio:'2023',
    tramo:'Tramo',
    monto:'222.00',
    origen:'PEF',
    meta:'5.2',
    Archivo:'Pruebas5.pdf'
    }   ,
           {
    id: 6,
    anio:'2024',
    tramo:'Tramo',
    monto:'333.00',
    origen:'PEF',
    meta:'6.2',
    Archivo:'Pruebas6.pdf'
    }       
]

</script>
<style scoped>
.form-control-tramo{
    width: 20%;
 
}
</style>