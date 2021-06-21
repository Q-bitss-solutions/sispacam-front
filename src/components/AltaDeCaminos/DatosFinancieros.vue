<template>
<table id="datosFinancieros" class="tableContenido" width="100%" border="0">
  <div class="row">  
    <div class="col-md-4 col-md-offset-3" >
        <label for="start" >Fecha Consulta:</label>
        <input type="date" id="start" name="trip-start" 
               v-model="fechac"
               >
    </div>
    <div class="col-md-1">
        <button class="btn btn-default btn-sm" type="button" id="buscarObras" @click="submit">
        <span  ></span>Buscar</button>
    </div> 
  </div>
    <div class="col-md-12 mx-auto">
       <div class="row">
            <h2>Consulta SIA</h2>
      </div>
    </div>


    <div class="col-md-12 mx-auto">
         <div class="row">
            <h3>Clave Presupuestal</h3>
        
  
    
            <hr class="red">
    
        <!-- <div>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
    </div> -->

        <div class="row">
        <div class="col-md-12">            
              <ejs-grid   ref="grid"
                    :dataSource="clave" 
                    :allowPaging='false' 
                    :allowSorting='false'
                    :pageSettings='pageSettings'
                    :allowFiltering='true'
                    :allowTextWrap='true'
                    :rowSelected='rowSelected'
                    >
                    <e-columns>
                        <e-column field='mes'           headerText='Mes' ></e-column>
                        <e-column field='modificado'    headerText='Modificado' textAlign='right' format='C2'></e-column>
                        <e-column field='ejercido'      headerText='Ejercido' textAlign='right' format='C2'></e-column>
                        <e-column field='comprometido'  headerText='Comprometido' textAlign='right' format='C2' ></e-column>
                        <e-column field='pagado'        headerText='Pagado' textAlign='right' format='C2'></e-column>
                        <e-column field='disponible'    headerText='Disponible' textAlign='right' format='C2'></e-column>             
                    </e-columns>          
                </ejs-grid>  
          

               
        </div>
          
      </div>

 
        </div>
        <div class="row">
            <h3>Pagos SIA</h3>
            <hr class="red">
        </div>
    <div class="tab-pane">
        <div class="row">
            <div  class="col-md-4 form-group"  > 
                <label class="control-label" for="mescons">Mes:</label>
                 <select v-model="mes" class="form-control" id="mes">
                    <option value="">Selecciona un mes...</option>
                    <option value="01">Enero</option>
                    <option value="02">Febreo</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
         </select>
            </div>
            <div class="col-md-4 form-group">
                <label class="control-label" for="nombreBenf">Beneficiario:</label>
                <input class="form-control" id="nombreBenef" placeholder="Beneficiario" type="text" v-model="benef">
            </div>    
            <div class="col-md-4 form-group">
                <button class="btn btn-default btn-sm small-top-buffer" type="button" id="buscarObras" @click="consulta">
                <span  ></span>Buscar</button>
            </div>        
        </div>
    </div>
        
        

        <div class="row">
        <div class="col-md-12 table-responsive">            
              <ejs-grid  height='450px' width='100%' ref="grid"
                    :dataSource="lista" 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :allowFiltering='true'
                    :allowTextWrap='true'
                    >
                    <e-columns>
                        <e-column field='idpago'         headerText='id' :visible='flag' width=120></e-column>
                        <e-column field='rfc_benef'  headerText='RFC' width=150></e-column>
                        <e-column field='nombre'      headerText='Beneficiario' width=150></e-column>
                        <e-column field='importe'      headerText='Monto' textAlign='right' format='C2' width=150></e-column>
                        <e-column field='reintegro'  headerText='Reintegro' textAlign='right' format='C2' width=150></e-column>
                        <e-column field='f_elab'      headerText='Fecha Elab' width=150></e-column>
                        <e-column field='f_pago'      headerText='Fecha Pago' width=150></e-column>  
                        <e-column field='estatus'    headerText='Estatus' width=150></e-column>              
                    </e-columns>          
                </ejs-grid>  


               
        </div>
          
      </div>
    </div>
    
</table>  


</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { generarId } from '@/api/alta-camino';
import Vue from "vue";
import { required } from 'vuelidate/lib/validators'
import { GridPlugin, Sort, Page} from '@syncfusion/ej2-vue-grids';
import ButtonGrid  from '@/components/ButtonGrid'
import { getCvepres, getSpago, getMescons} from '@/api/obras'
import VueCurrencyFilter from 'vue-currency-filter'



Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(GridPlugin);
Vue.use(VueCurrencyFilter, {
  symbol: '$', // El símbolo, por ejemplo €
  thousandsSeparator: ',', // Separador de miles
  fractionCount: 2, // ¿Cuántos decimales mostrar?
  fractionSeparator: '.', // Separador de decimales
  symbolPosition: 'front', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
  symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
})



export default {
    
    name: 'DatosFinancieros',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:''
        },
    },
    data(){
                var f = new Date();
                var dt =(f.getMonth() +1)
                if(dt <= 9){
                    dt = '0' + (f.getMonth() +1)
                }else{
                dt=(f.getMonth() +1)
                }
                var ft =f.getFullYear() + '-' + 
                        dt + '-' + 
                       (f.getDate() -1)        
        return {
            nombre:'',
            apaterno:'',
            amaterno:'',
            rfc_benef:'',
            clabe:'',
            juridica:'',
            calle:'',
            next:'',
            colonia:'',
            cp:'',
            tipocalle:'',
            estatus:'',
            editmode: false,
            flag: false,
            lista:[],
            clave:[],
            pageSettings: { pageCount: 5, pageSize: 20  },
            flagEdicion:true,
            usuario:'' ,
            start:'',
            mes:'',
            benef:'',
            downloadLoading: false,
            fechac :ft,
                }
                
    },
        validations: {
        nombre: {
            required,

        },
        apaterno: {
            required,
        },
        amaterno: {
            required,
        },
        rfc_benef: {
            required,
        },
        clabe: {
            required,
        },
    },
     provide: {
        grid: [Sort, Page]
    }, 
    
    methods:{ 
    handleDownload() {
      this.downloadLoading = true
      const tHeader = ['Mes', 'Modificado', 'Ejercido', 'Comprometido', 'Pagado', 'Disponible']
      const filterVal= ['mes', 'modificado', 'ejercido', 'comprometido', 'pagado', 'disponible']
      const list = this.clave
      const data = this.formatJson(filterVal, list)
      excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
        rowSelected: function(args) {
            let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();  // Get the selected row indexes.
            //alert(selectedrowindex); // To alert the selected row indexes.
            let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
            this.usuario = selectedrecords[0].nombre + ' ' 
            + selectedrecords[0].apaterno + ' ' + selectedrecords[0].amaterno
            this.id = selectedrecords[0].id
            }, 
            async asignar(){
            const response = await asignarUsuario(this.$route.params.obraId, this.id)
            alert(response.msg)
        },
        formatNum(num){
            return new Intl.NumberFormat().format(num);
        },
        async consulta(){
            if(this.mes || this.benef){
                this.lista = await getMescons(this.fechac, this.mes, this.benef)      
            }else{
                 this.lista = await getSpago(this.fechac) 
            }

        },
        async populate () {
            try{
                let results  = []
                let clave = null
                if(this.fechac){
                    this.clave = await getCvepres(this.fechac) 
                    this.lista = await getSpago(this.fechac)    
                }
            }catch(e) {
                console.log('error-->')
                console.log(e)
            }
        },
        async valbenef() {
            // ...
        
            
            //12
            if (this.fisica_moral == "M" && this.rfc_benef.length != 12) {
            alert('El RFC capturado no corresponde a una persona moral')
            
             
            }
            //13
            if (this.fisica_moral == "F" && this.rfc_benef.length != 13 ) {
            alert('El RFC capturado no corresponde a una persona fisica')
             
            }
  },
  submit() { 
     this.populate()
  },

  editTemplateA () { 
            return { 
                template:ButtonGrid,
            }    
        },
editTemplateB () { 
            return { 
                template:ButtonGrid,
            }    
        },
         async DatosFinacieros(){   
             this.$emit("show-error", false); 
             this.$v.$touch()
             if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
             this.btnSaveDisabled  = true
             try{
                 
                 const data = {
                    nombre:this.nombre,
                    apaterno:this.apaterno,
                    amaterno:this.amaterno,
                    rfc_benef:this.rfc_benef,
                    clabe:this.clabe,
                    juridica:this.juridica,
                    calle:this.calle,
                    next:this.next,
                    colonia:this.colonia,
                    cp:this.cp,
                    tipocalle:this.tipocalle,
                    estatus:this.estatus
                }
                const response = await generarId(data)
                this.idcamino = response.beneficios + '-' + this.tipoCamino
                $('#addCamino').modal('show')
                this.btnSaveDisabled  = false           
                }
                catch(err){    
                    this.btnSaveDisabled  = false                
                    console.log('error al obtener el Id-Camino')
                    console.log(err)
                    $('#alertModal').modal('show')
                    this.$emit("show-error",'Error al guardar beneficiario');                  
                }
            }
        }
    },
    computed:{
        
        getCdate(){
            var currentDate = new Date();
            this.fechac=currentDate.getDate()+'/'+currentDate.getMonth()+1+'/'+ currentDate.getYear()
            return this.fechac
        }
    },
     created(){
         
        if(this.$route.params.obraId){
            this.editmode = true
            
            

        }
        this.populate()
        
        
    }
}
</script>


<style scoped>

</style>
