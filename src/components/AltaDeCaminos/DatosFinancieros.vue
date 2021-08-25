<template>
<table id="datosFinancieros" class="tableContenido" width="100%" border="0">
  <div class="row">  
    <div class="col-md-4 col-md-offset-3" >
        <label for="start" >Fecha Consulta:</label>
        <input type="date" id="start" name="trip-start" 
               v-model="fechac"
               >
                <input type="date" id="start" name="trip-start"  v-if="tipo_camino == 'O'"
               :disabled = "editmode" v-model="fechacE" 
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
<div id="app">
    <div class="row">
       <div class="col-md-12"> 
        <div class="row">
            <h3>Clave Presupuestal</h3>
            <hr class="red">
    </div>
        <ejs-grid ref='grid1' 
        id='FirstGrid' 
        :dataSource='clave'
        
        :toolbar='toolbarOptions' 
        :pageSettings='pageSettings'
        :allowExcelExport='true' 
        :toolbarClick='toolbarClick'>
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
                    <option value="02">Febrero</option>
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
    
    <ejs-grid ref='grid2' 
    id='SecondGrid' 
    :dataSource='lista' 
    :allowExcelExport='true'>
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
</table> 
</template>
<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { generarId } from '@/api/alta-camino';
import Vue from "vue";
import ButtonGrid  from '@/components/ButtonGrid'
import { getCvepres, getSpago, getMescons} from '@/api/obras'
import VueCurrencyFilter from 'vue-currency-filter'
import excel from 'vue-excel-export'

import { GridPlugin, Toolbar, ExcelExport, Sort, Page } from '@syncfusion/ej2-vue-grids';




Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(excel);

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
  data() {
       var f = new Date();
                var dt =(f.getMonth() +1)
                var dy =(f.getDate() -1)
                if(dt <= 9){
                    dt = '0' + (f.getMonth() +1)
                }else{
                dt=(f.getMonth() +1)
                }
                /**/
                if(dy <= 9){
                    dy = '0' + (f.getDate() -1)
                }else{
                dy=(f.getDate() -1)
                }
                var ft =f.getFullYear() + '-' + 
                        dt + '-' + 
                        dy 
                var ftE =dy + dt + f.getFullYear() 
                console.log("ft")
                console.log(ft)
                console.log("ftE")
                console.log(ftE)
         
return {
  /*fData: data.slice(0, 5),*/
  /*sData: employeeData.slice(0, 5),*/
  editmode: false,
  tipo_camino: null,
            flag: false,
            lista:[],
            
            clave:[],
            tit1:[],
            tit2:[],
            nama1:'',
            nama2:'',
            tHeader:[],
            pageSettings: { pageCount: 5, pageSize: 20  },
            flagEdicion:true,
            usuario:'' ,
            start:'',
            mes:'',
            benef:'',
            downloadLoading: false,
            fechac :ft,
            fechacE :ftE,
            vname:'',
  toolbarOptions: ['ExcelExport']
};
  },
  methods: {
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
                let nama1 = null
                let nama2 = null
                let tit1 = null
                let tit2 = null
                if(this.fechac){
                    this.clave = await getCvepres(this.fechac) 
                    this.fdata = await getCvepres(this.fechac) 
                    this.lista = await getSpago(this.fechac)   
                    this.sdata = await getSpago(this.fechac)  
                    this.nama1 = this.fechacE + '-' + 'clave_presupuestal.xls'
                    this.nama2 = this.fechacE + '-' + 'Pagos_SIA.xlsx'
                    this.tit1 = ['', '', '',  '' ,'Calendario de Recursos SIA']
                    this.tit2 = ['', '', '',  'Programa Presupuestario U004 “Mejora en la conectividad municipal a través de caminos rurales y carreteras alimentadoras”' ,'Reporte de pagos del SIA']
                console.log("this.fechacE")
                console.log(this.fechacE)
                console.log("this.fechac")
                console.log(this.fechac)
                }
            }catch(e) {
                console.log('error-->')
                console.log(e)
            }
        },
    toolbarClick : function (args) {
      if (args.item.id === 'FirstGrid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
         console.log("this.nama2")
            console.log(this.nama2)
        let appendExcelExportProperties = {
           
            multipleExport: { type: 'NewSheet' },
            fileName: this.nama2,
            header: {
               headerRows: 5,
                rows: [
                                        {
                        cells:[{
                            colSpan: 8,
                            value: 'SUBSECRETARIA DE INFRAESTRUCTURA',
                            style: {fontSize: 20, hAlign:'Center', bold: true}

                        }],
                     
                    },
                    { cells:[{
                            colSpan: 8,
                            value: 'DIRECCION GENERAL DE CARRETERAS',
                            style: {fontSize: 20, hAlign:'Center', bold: true}

                        }],
                    },
                    { cells:[{
                            colSpan: 8,
                            value: 'DIRECCION COORDINADORA DE CAMINOS RURALES Y ALIMENTADORES',
                            style: {fontSize: 10, hAlign:'Center', bold: true}

                        }],
                    },
                    { cells:[{
                            colSpan: 8,
                            value: 'Programa Presupuestario U004 “Mejora en la conectividad municipal a través de caminos rurales y carreteras alimentadoras”',
                            style: {fontSize: 10, hAlign:'Center', bold: true}

                        }],
                    }
                    ],

            }, 
        };
        console.log("appendExcelExportProperties")
        console.log(appendExcelExportProperties)

        let firstGridExport = this.$refs.grid1.excelExport(appendExcelExportProperties, true);
        firstGridExport.then((fData) => {
            this.$refs.grid2.excelExport(appendExcelExportProperties, false, fData);
        });
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
        },
        },
        computed:{
       
        getCdate(){
            var currentDate = new Date();
            this.fechac=currentDate.getDate()+'/'+currentDate.getMonth()+1+'/'+ currentDate.getYear()
            this.editmode = true
            
            return this.fechac,
             
             this.editmode
                    console.log('this.fechac')
                    console.log(this.fechac)
        }
        
        },

     created(){
        if(this.$route.params.obraId){
            this.editmode = true
        }
        this.populate()
    },
  provide: {
grid: [Toolbar, ExcelExport]
  }
}

</script>
<style>

</style>