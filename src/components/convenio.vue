
<template>
<table id="datosconvenio" class="tableContenido" width="100%" border="0">
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Programación de Obra </h3>
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
          
            
              <ejs-grid   ref="grid"
                    :dataSource="lista" :gridLines='lines' 
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
        <div class="modal fade" ref="mdlCancelarConvenio" id="mdlCancelarConvenio" tabindex="-1" role="dialog" aria-labelledby="mdlCancelarConvenio"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Canelación de Convenio</h4>
                    </div>
                    <div class="modal-body">
                        <p>Escriba el motivo de cancelación</p>
                          <div class="form-group">
                            <textarea rows="3" maxlength="350" id="motivoCancelacion" class="form-control" value=""   
                                placeholder="Ingrese el motivo de la canelación" v-model="motivoCancelacion">
                            </textarea>                    
                        </div>                                               
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cerrarCnclConvenio" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="CancelarConvenio()">Guardar</button>
                    </div>
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
import ButtonGrid  from '@/components/ButtonGrid'
import Cancelaconvenio   from '@/components/Cancelaconvenio'
import { getlistaConvenio, cancelarConvenio } from '@/api/obras'; 
import { GridPlugin, Sort, Page } from '@syncfusion/ej2-vue-grids';


Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(VueResource);
Vue.use(GridPlugin);


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
            estatus: '',
            min: 0,
            max: 999999,   
            btnSaveDisabled: true,
            info: null,
            flag: false,
            lines: 'Both',
            data:null,
            lista: null,
            motivoCancelacion: '',
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
        this.estatus = "A"
        console.log("this.anio")
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
                template:Cancelaconvenio
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
               
                
                

                let formData = new FormData();
                formData.append("anio", this.anio);
                formData.append("tramo",this.tramo);
                formData.append("monto",this.monto);
                formData.append("origen",this.origen);
                formData.append("meta",this.meta);
                formData.append("estatus","A");
                if(this.archivo) {
                  formData.append("archivo", this.archivo);
                }
                //formData.append("archivo", this.archivo);
                //formData.append("camino_id",this.$route.params.obraId);

                const resp = await generarConvenio(formData) 
                const list = await getlistaConvenio(this.$route.params.obraId)

                console.log(list)

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

        //Carga Datos
        async CargaDatos(clave){
          const response = await getupdate(clave)
          this.anio = response.anio
          this.tramo = response.tramo
          this.monto = response.monto
          this.origen = response.origen
          this.meta = response.meta
          this.estatus = response.estatus


        },

        async populate () {
          try{
             let results  = []
             let data = null
             console.log("Datos-Pruebas")
             console.log(data)
             console.log(this.flag)
             if(this.flag){
                if("1"){
                  this.lista = list
 
                        
                }
             }
             }catch(e) {
                console.log('error-->')
                console.log(e)
            }

      
        },
   
 

         onFileSelected (event) {
               this.archivo = event.target.files[0];
               
                
            },
        async listaconvenio(){
           this.lista = await getlistaConvenio(this.$route.params.obraId)
            console.log("listaconvenio")
           console.log(this.lista)
        } ,
        openmodal(){
          console.log("openmodal")
          $(this.$refs['mdlCancelarConvenio']).modal('show')
        } ,
        async CancelarConvenio (){
            $(this.$refs['mdlCancelarConvenio']).modal('hide')
            const data = await cancelarConvenio(this.$store.state.cancelConvenio.id)
            console.log("regresaCancelacion")
            console.log(data)
            this.populate()
            const r = this.$refs.grid.refresh
            r.refresh
        },
             
            
    },
    created:function(){
      this.listaconvenio()
      console.log("created")
    },
    computed:{
      isCanceled:function(){
        console.log("isCnceled")
        console.log(this.$store.state.cancelConvenio.id)
        if(this.$store.state.cancelConvenio.id){
          this.openmodal()
        }
        return this.$store.state.cancelConvenio.id
      }
    }
}
//console.log("data-list")
//console.log(data)

 


</script>
<style scoped>
.form-control-tramo{
    width: 20%;
 
}
</style>