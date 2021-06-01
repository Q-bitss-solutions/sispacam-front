
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
                        :disabled="editmode"
                        :change="setData">
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
                    <label class="control-label">Monto de Convenio(mdp):</label>
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
                    <label class="control-label">Meta de Convenio(km):</label>
                        <ejs-numerictextbox  
                            id="meta"
                            placeholder="Ingrese la Meta (km)"
                            v-model="meta"
                            :min="min"
                            :max="max"
                            :showSpinButton='false'>
                        </ejs-numerictextbox> 
                    </div>
                    <div class="row col-md-10" v-if="validaLongitud">
                    <small    class="form-text form-text-error">
                      La Meta no puede ser mayor a la Longitud a pavimentar acumulada                 
                    </small>  
                    </div>
                  </div>
                <div class="col-md-3 form-group">
                    <label class="control-label">Longitud a Pavimentar</label>
                    <div>
                    <td class="col-md-6" >{{ longitudP }}</td>
                    </div>
                    <label class="control-label">Longitud por programar</label>
                    <div>
                    <label class="col-md-6" >{{ (longitudP - getmeta) }}</label>
                    </div>
                  </div>
                </div>
                  <div class="col-md-3 form-group">
                    <label class="control-label">Archivo del Convenio (PDF):</label>
                    <input  id="fileconvenio" type="file" accept=".pdf" @change="onFileSelected" name="myfile" >
                    <div class="col-md-20">
                    <label class="control-label" >Nota: El archivo no debe exceder el tamaño de 12 megas</label>
                  </div>
                  </div>
                  <div class="col-md-12">
                    <button type="button" v-on:click="GuardaDatosConvenio" class="btn btn-default pull-right vertical-buffer" data-toggle="modal">Agregar Convenio</button>
                  </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="row">
        <div class="col-md-12">
          <h5 class="small-top-buffer small-bottom-buffer">Programación de Obras agregadas</h5>
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
                <e-column field='id' headerText='id' :visible='flag' textAlign='Center'></e-column>
                <e-column field='anio'  headerText='Año del Convenio' textAlign='Center'></e-column>
                <e-column field='tramo' headerText='Tramo' textAlign='Center'></e-column>
                <e-column field='monto' headerText='Monto' textAlign='right'></e-column>
                <e-column field='origen' headerText='Origen del recurso' textAlign='Center'></e-column>
                <e-column field='meta' headerText='Meta' textAlign='right'></e-column>
                <e-column field='archivo' headerText='Archivo' textAlign='Center'></e-column>
                <e-column field="id" :template='editTemplateA' headerText='Edicion' textAlign='Center' :visible='flagEdicion'></e-column>
                <e-column field="id" :template='cancelTemplate' headerText='Cancelar' textAlign='Center' :visible='flagEdicion'></e-column>                
                <e-column field="id" :template='editTemplateP' headerText='Presupuesto' textAlign='Center' :visible='flagEdicion'></e-column>               
            </e-columns>          
        </ejs-grid>  
        </div>
      </div>
      <div class="col-md-12 table-responsive">
<table class="table table-striped">
  <tbody>
      <tr>
        <h5 class="small-top-buffer small-bottom-buffer">TOTAL</h5>
        <td class="small-top-buffer small-bottom-buffer"><b>{{getmonto}}</b> </td>
        <td></td>
        <td></td>
        <td class="small-top-buffer small-bottom-buffer"><b>{{getmeta}}</b></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class="row" v-if="false">
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
import { generarConvenio, updateConvenio } from '@/api/obras';
import ButtonGrid  from '@/components/ButtonGrid'
import ButtonGridToPresupuesto  from '@/components/presupuestos/ButtonGridToPresupuesto'
import Cancelaconvenio   from '@/components/Cancelaconvenio'
import { getlistaConvenio, cancelarConvenio } from '@/api/obras'; 
import { GridPlugin, Sort, Page } from '@syncfusion/ej2-vue-grids';
import { getupdate } from '@/api/alta-camino';

Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(VueResource);
Vue.use(GridPlugin);


export default {
    name: 'DatosConvenio',
    props: {
        camino_id:{
            type:Number
        }
    },
    


    data(){
        return {
            editmode:false,
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
            longitudP:'',
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
        console.log("this.monto")
        console.log(this.monto)
        this.editmode = true
      },
          formatNum(num){
            return new Intl.NumberFormat().format(num);
        },
      setData(){
        const rowList = this.lista.find(row => row.anio == this.anio)
        
        console.log('rowList')
        console.log(rowList)
        if(rowList && rowList.id){
          this.anio = rowList.anio
          this.tramo = rowList.tramo
          this.monto = rowList.monto
          this.origen = rowList.origen
          this.meta = rowList.meta
          this.anioFields = rowList.anio
          this.estatus =  rowList.estatus   
        }else{
          this.tramo = ''
          this.monto = ''
          this.meta = ''
          this.anioFields = ''
          this.estatus =  'A'   
        }
      },
      editTemplateA () { 
            return { 
                template:ButtonGrid,
            }    
        },
        editTemplateP () { 
            return { 
                template:ButtonGridToPresupuesto 
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
               console.log('this.lista')
               console.log(this.lista)
               let rowId = -1
               if(this.lista.length > 0){
                 let rowExist = this.lista.find(l => l.anio == this.anio)
                 console.log('rowExist.length')
                 console.log(rowExist)
                 if(rowExist && rowExist.id){
                   console.log(rowExist)
                   rowId = rowExist.id
                   console.log('rowId')                   
                   console.log(rowId)              
                 }                 
               }

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
                let resp = '';
                if(rowId > 0 ){
                  resp = await updateConvenio(formData, rowId)
                }else{
                  resp = await generarConvenio(formData, this.camino_id) 
                }
                console.log(resp)
                this.lista = await getlistaConvenio(this.camino_id)
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
           this.lista = await getlistaConvenio(this.camino_id)
            console.log("listaconvenio")
           console.log(this.lista)
           const resp = await getupdate(this.$route.params.obraId)
           this.longitudP = this.formatNum(resp.longitud_pavimentar)
        console.log("longitudP")
        console.log(resp)
        
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
      this.longitudP =  this.formatNum(this.$route.params.longitud_pavimenta)
      console.log("this.ancho")
      console.log(this.ancho)
 
    },
    computed:{
      isCanceled:function(){
        console.log("isCnceled")
        console.log(this.$store.state.cancelConvenio.id)
        if(this.$store.state.cancelConvenio.id){
          this.openmodal()
        }
        return this.$store.state.cancelConvenio.id
      },
  
      getmonto(){
        if(this.lista){
        console.log("LISTA")
        console.log(this.lista)
        return this.lista.reduce((total,i)=>{return total+Number(i.monto)},0)
      }
      },
      getmeta(){
        if(this.lista){
        console.log("LISTA")
        console.log(this.lista)
        return this.lista.reduce((total,i)=>{return total+Number(i.meta)},0)
      }
      },
      getmeta2(){
        return this.formatNum(this.meta)
      },
      validaLongitud(){
        return this.getmeta2 > (this.longitudP - this.getmeta)   
      }          
    },
    
}

//console.log("data-list")
//console.log(data)

 


</script>
<style scoped>
.form-control-tramo{
    width: 20%;
 
}

</style>