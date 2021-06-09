<template>
<table id="datosFinancieros" class="tableContenido" width="100%" border="0">
    <div class="col-md-offset-8" >
        <label for="start" >Fecha Consulta:</label>
        <input type="date" id="start" name="trip-start" 
               value="07-06-2021"
               min="2021-06-07" max="2021-12-31"
               v-model="fechac"
               >
    </div>
    <div class="col-md-offset-10">
        <button class="btn btn-primary" type="button" id="buscarObras" @click="submit">
        <span  ></span>Buscar</button>
    </div>
    <div class="col-md-12 mx-auto">
         <div class="row">
            <h3>Clave Presupuestal</h3>
            <hr class="red">
            
        <div class="row">
        <div class="col-md-12 table-responsive">            
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
                        <e-column field='mes'         headerText='Mes' ></e-column>
                        <e-column field='modificado'  headerText='Modificado' textAlign='right'></e-column>
                        <e-column field='ejercido'      headerText='Ejercido' textAlign='right'></e-column>
                        <e-column field='comprometido'      headerText='Comprometido' textAlign='right'></e-column>
                        <e-column field='pagado'      headerText='Pagado' textAlign='right'></e-column>
                        <e-column field='disponible'       headerText='Disponible' textAlign='right'></e-column>             
                    </e-columns>          
                </ejs-grid>  
          

               
        </div>
          
      </div>

 
        </div>
        <div class="row">
            <h3>Modelo de Pagos SIA</h3>
            <hr class="red">
 
        </div>
        

        <div class="row">
        <div class="col-md-12 table-responsive">            
              <ejs-grid   ref="grid"
                    :dataSource="lista" 
                    :allowPaging='true' 
                    :allowSorting='true'
                    :pageSettings='pageSettings'
                    :allowFiltering='true'
                    :allowTextWrap='true'
                    :rowSelected='rowSelected'
                    >
                    <e-columns>
                        <e-column field='id'         headerText='id' :visible='flag'></e-column>
                        <e-column field='rfc_benef'  headerText='RFC'></e-column>
                        <e-column field='benef'      headerText='Beneficiario' ></e-column>
                        <e-column field='monto'      headerText='Monto' textAlign='right'></e-column>
                        <e-column field='reintegro'      headerText='Reintegro' textAlign='right'></e-column>
                        <e-column field='felab'      headerText='Fecha Elab'></e-column>
                        <e-column field='fpago'       headerText='Fecha Pago'></e-column>  
                        <e-column field='estatus'    headerText='Estatus'></e-column>              
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
import { getCvepres } from '@/api/obras'

Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(GridPlugin);


export default {
    name: 'DatosCamino',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:''
        },
    },
    data(){
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
            lista:lista,
            clave:[],
            pageSettings: { pageCount: 10, pageSize: 20  },
            flagEdicion:true,
            usuario:'' ,
            start:'',
            fechac:'',
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
        rowSelected: function(args) {
            let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();  // Get the selected row indexes.
            //alert(selectedrowindex); // To alert the selected row indexes.
            let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
            console.log(selectedrecords)
            this.usuario = selectedrecords[0].nombre + ' ' 
            + selectedrecords[0].apaterno + ' ' + selectedrecords[0].amaterno
            this.id = selectedrecords[0].id
            }, 
            async asignar(){
            const response = await asignarUsuario(this.$route.params.obraId, this.id)
            alert(response.msg)
            console.log(response)
        },
        async populate () {
            try{
                let results  = []
                let clave = null
                console.log("this.fecha")
                console.log(this.fecha)
                if(this.fecha){
                        clave = await getCvepres(this.fecha)    
                        const aRR = []
                        aRR.push(clave)
                        results = aRR    
                    }
            }catch(e) {
                console.log('error-->')
                console.log(e)
            }

            
        },

        async valbenef() {
            // ...
            console.log("valbenef")
            console.log(this.fisica_moral)
            console.log(this.rfc_benef.length)
            
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
     console.log('submit...')
    console.log(this.fechac)

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
                 console.log("GenerarId50")
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
                console.log('data')
                console.log(data)
                const response = await generarId(data)
                console.log(response)
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
     created(){
        if(this.$route.params.obraId){
            this.editmode = true
        }
    }
}



const lista =
[
    
{id:1,rfc_benef:"MSM9601018X3",benef:"MUNICIPIO DE SANTA MARIA TOTOLAPILLA",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:2,rfc_benef:"MSP850101RG0",benef:"MUNICIPIO DE SAN PEDRO JOCOTIPAC",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:3,rfc_benef:"",benef:"TOTAL Mes de MARZO del estatus Cuenta por Liquidar",monto:"12,000,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:4,rfc_benef:"MSM8501011Q0",benef:"MUNICIPIO DE SANTA MARIA PAPALO",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:5,rfc_benef:"MSJ850101GZ0",benef:"MUNICIPIO DE SAN JUAN CIENEGUILLA",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:6,rfc_benef:"MSD8501017D1",benef:"MUNICIPIO DE SANTO DOMINGO YODOHINO",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:7,rfc_benef:"MVT850101N90",benef:"MUNICIPIO DE VALERIO TRUJANO",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:8,rfc_benef:"MSJ8501019M5",benef:"MUNICIPIO DE SAN JUAN BAUTISTA ATATLAHUCA",monto:"5,600,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:9,rfc_benef:"MNZ850101C61",benef:"MUNICIPIO NUEVO ZOQUIAPAM",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:10,rfc_benef:"MSC850102GC4",benef:"MUNICIPIO DE SANTA CRUZ ZENZONTEPEC",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:11,rfc_benef:"MSP8501013Z2",benef:"MUNICIPIO DE SAN PEDRO QUIATONI",monto:"6,000,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:12,rfc_benef:"MAO850101QH0",benef:"MUNICIPIO DE ABEJONES",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:13,rfc_benef:"MCB850101B96",benef:"MUNICIPIO DE CHIQUIHUITLAN DE BENITO JUAREZ",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:14,rfc_benef:"MSC850101GK3",benef:"MUNICIPIO DE SANTA CRUZ ITUNDUJIA",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:15,rfc_benef:"MSJ85010131A",benef:"MUNICIPIO DE SAN JERONIMO TAVICHE",monto:"4,300,000",reintegro:"0.00",felab:"11/03/2021",fpago:"17/03/2021",estatus:"Pago Siaff",},
{id:16,rfc_benef:"MSX860201T84",benef:"MUNICIPIO DE SANTIAGO XANICA",monto:"5,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:17,rfc_benef:"MSM850101JS8",benef:"MUNICIPIO DE SAN MIGUEL PIEDRAS",monto:"5,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:18,rfc_benef:"MSJ850101NK0",benef:"MUNICIPIO DE SAN JUAN LACHIGALLA",monto:"5,400,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:19,rfc_benef:"MSM850101HB6",benef:"MUNICIPIO DE SAN MARCIAL OZOLOTEPEC",monto:"4,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"24/03/2021",estatus:"Pago Siaff",},
{id:20,rfc_benef:"MSF8501012U4",benef:"MUNICIPIO DE SAN FRANCISCO CHINDUA",monto:"4,300,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:21,rfc_benef:"MSC8501012S5",benef:"MUNICIPIO DE SANTA CATALINA QUIERI",monto:"4,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:22,rfc_benef:"MSP850101KH0",benef:"MUNICIPIO DE SAN PEDRO SOCHIAPAM",monto:"5,000,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:23,rfc_benef:"MSP850101E91",benef:"MUNICIPIO DE SAN PEDRO MARTIR QUIECHAPA",monto:"5,000,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:24,rfc_benef:"MSM8501015M9",benef:"MUNICIPIO DE SANTA MARIA TEMAXCALTEPEC",monto:"4,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:25,rfc_benef:"MCV850101DX4",benef:"MUNICIPIO DE CUYAMECALCO VILLA DE ZARAGOZA",monto:"5,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:26,rfc_benef:"MSF421219RP1",benef:"MUNICIPIO DE SAN FRANCISCO CAHUACUA",monto:"5,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:27,rfc_benef:"MSL850101FQ1",benef:"MUNICIPIO DE SANTA LUCIA MIAHUATLAN",monto:"5,500,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:28,rfc_benef:"MSM8501016A8",benef:"MUNICIPIO DE SAN MIGUEL DEL PUERTO",monto:"4,300,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:29,rfc_benef:"MRO850101K51",benef:"MUNICIPIO DE LA REFORMA",monto:"5,000,000",reintegro:"0.00",felab:"22/03/2021",fpago:"25/03/2021",estatus:"Pago Siaff",},
{id:30,rfc_benef:"MSJ850101PZ3",benef:"MUNICIPIO DE SAN JERONIMO COATLAN",monto:"8,600,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:31,rfc_benef:"MMM850101M10",benef:"MUNICIPIO DE MAGDALENA MIXTEPEC",monto:"4,500,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:32,rfc_benef:"MSS85010119A",benef:"MUNICIPIO DE SAN SEBASTIAN COATLAN",monto:"8,600,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:33,rfc_benef:"MST850101MH9",benef:"MUNICIPIO DE SANTIAGO TLAZOYALTEPEC",monto:"8,600,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:34,rfc_benef:"MSC850101IW4",benef:"MUNICIPIO DE SANTA CRUZ TACAHUA",monto:"4,500,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:35,rfc_benef:"MSA850101LW4",benef:"MUNICIPIO DE SAN AGUSTIN AMATENGO",monto:"4,500,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:36,rfc_benef:"MSA850101TD6",benef:"MUNICIPIO DE SANTA ANA ATEIXTLAHUACA",monto:"3,010,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:37,rfc_benef:"MSM960101960",benef:"MUNICIPIO DE SAN MATEO YUCUTINDOO",monto:"5,190,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:38,rfc_benef:"MOA8501011N7",benef:"MUNICIPIO LA COMPAÃ‘IA",monto:"4,500,000",reintegro:"0.00",felab:"26/03/2021",fpago:"31/03/2021",estatus:"Pago Siaff",},
{id:39,rfc_benef:"",benef:"TOTAL Mes de MARZO del estatus Pago Siaff",monto:"181,700,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:40,rfc_benef:"",benef:"TOTAL del mes de MARZO",monto:"193,700,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:41,rfc_benef:"MSJ8501012Y0",benef:"MUNICIPIO DE SAN JUAN QUIAHIJE",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:42,rfc_benef:"MSJ850101L10",benef:"MUNICIPIO DE SAN JUAN TABAA",monto:"5,500,000",reintegro:"0.00",felab:"21/04/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:43,rfc_benef:"",benef:"TOTAL Mes de ABRIL del estatus Cuenta por Liquidar",monto:"11,500,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:44,rfc_benef:"MAT8501014QA",benef:"MUNICIPIO DE ASUNCION TLACOLULITA",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:45,rfc_benef:"MSA850101IK6",benef:"MUNICIPIO DE SAN ANDRES TEPETLAPA",monto:"1634000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:46,rfc_benef:"MST720605D61",benef:"MUNICIPIO DE SANTIAGO TEPETLAPA",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:47,rfc_benef:"MSM850101FE6",benef:"MUNICIPIO SANTA MARIA ZOQUITLAN",monto:"8,600,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:48,rfc_benef:"MSM850101QL0",benef:"MUNICIPIO DE SAN MIGUEL TEQUIXTEPEC",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:49,rfc_benef:"MSA8501012B6",benef:"MUNICIPIO DE SANTA ANA YARENI",monto:"4,300,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:50,rfc_benef:"MSP8501015D9",benef:"MUNICIPIO DE SAN PABLO CUATRO VENADOS",monto:"7,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:51,rfc_benef:"MSM8501014E6",benef:"MUNICIPIO DE SAN MIGUEL PERAS",monto:"8,600,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:52,rfc_benef:"MSI850101KE9",benef:"MUNICIPIO DE SANTIAGO IHUITLAN PLUMAS",monto:"5,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:53,rfc_benef:"MTM8501018RA",benef:"MUNICIPIO DE TEOCOCUILCO DE MARCOS PEREZ",monto:"7,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"22/04/2021",estatus:"Pago Siaff",},
{id:54,rfc_benef:"MSM8501011J5",benef:"MUNICIPIO DE SAN MIGUEL ALOAPAM",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"22/04/2021",estatus:"Pago Siaff",},
{id:55,rfc_benef:"MSJ850101FD5",benef:"MUNICIPIO DE SAN JUAN TEPEUXILA",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:56,rfc_benef:"MSJ850101LD9",benef:"MUNICIPIO DE SAN JUAN BAUTISTA JAYACATLAN",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:57,rfc_benef:"MSZ930101I29",benef:"MUNICIPIO SANTIAGO ZACATEPEC",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:58,rfc_benef:"MSM860201JP0",benef:"MUNICIPIO DE SANTA MARIA NDUAYACO",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"20/04/2021",estatus:"Pago Siaff",},
{id:59,rfc_benef:"MMF850101GE7",benef:"MUNICIPIO MAZATLAN VILLA DE FLORES",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:60,rfc_benef:"MSA8501016L7",benef:"MUNICIPIO DE SAN ANDRES LAGUNAS",monto:"4,300,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:61,rfc_benef:"MSC850101KI6",benef:"MUNICIPIO DE SANTA CRUZ XITLA",monto:"4,300,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:62,rfc_benef:"MSC850101RPA",benef:"MUNICIPIO SAN CARLOS YAUTEPEC",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:63,rfc_benef:"MSM850101UD4",benef:"MUNICIPIO DE SAN MIGUEL TULANCINGO",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:64,rfc_benef:"MSL850101PK4",benef:"MUNICIPIO DE SAN LUCAS CAMOTLAN",monto:"8,600,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:65,rfc_benef:"MSI850101CZ0",benef:"MUNICIPIO SANTIAGO IXTAYUTLA",monto:"3,800,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:66,rfc_benef:"MSJ8501018M8",benef:"MUNICIPIO DE SAN JUAN YATZONA",monto:"4,300,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:67,rfc_benef:"MST8501012S1",benef:"MUNICIPIO DE SANTIAGO TEXTITLAN",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:68,rfc_benef:"MSC850101II1",benef:"MUNICIPIO DE SANTA CATARINA QUIOQUITANI",monto:"2,150,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:69,rfc_benef:"MSJ8501017W0",benef:"MUNICIPIO DE SAN JUAN JUQUILA MIXES",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:70,rfc_benef:"MSP850101HWA",benef:"MUNICIPIO DE SAN PEDRO OCOTEPEC",monto:"4,300,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:71,rfc_benef:"MSM850101QV0",benef:"MUNICIPIO DE SAN MIGUEL QUETZALTEPEC",monto:"5,000,000",reintegro:"0.00",felab:"19/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:72,rfc_benef:"MSF850101812",benef:"MUNICIPIO DE SAN FRANCISCO OZOLOTPEC",monto:"2,700,000",reintegro:"0.00",felab:"19/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:73,rfc_benef:"MSM960101V77",benef:"MUNICIPIO DE SANTIAGO MINAS",monto:"7,000,000",reintegro:"0.00",felab:"19/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:74,rfc_benef:"MSJ850101G81",benef:"MUNICIPIO SAN JUAN BAUTISTA TLACHICHILCO",monto:"6,450,000",reintegro:"0.00",felab:"19/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:75,rfc_benef:"MSY960101246",benef:"MUNICIPIO DE SANTIAGO YAVEO",monto:"8,600,000",reintegro:"0.00",felab:"19/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:76,rfc_benef:"MSD850101E57",benef:"MUNICIPIO DE SANTO DOMINGO ALBARRADAS",monto:"6,000,000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:77,rfc_benef:"MSM850101169",benef:"MUNICIPIO DE SANTA MARIA APAZCO",monto:"6,000,000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:78,rfc_benef:"MSM850101C93",benef:"MUNICIPIO DE SANTA MARIA QUIEGOLANI",monto:"6,000,000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:79,rfc_benef:"MSJ850101FX7",benef:"MUNICIPIO DE SAN JUAN BAUTISTA TLACOATZINTEPEC",monto:"4,300,000",reintegro:"0.00",felab:"20/04/2021",fpago:"14/04/2021",estatus:"Pago Siaff",},
{id:80,rfc_benef:"MSM850101RP9",benef:"MUNICIPIO DE SANTA MARIA YAVESIA",monto:"6,000,000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:81,rfc_benef:"MSR8501013Z4",benef:"MUNICIPIO DE SANTOS REYES PAPALO",monto:"6,000,000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:82,rfc_benef:"MAO850101QH0",benef:"MUNICIPIO DE ABEJONES",monto:"8750000",reintegro:"0.00",felab:"20/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:83,rfc_benef:"MSP850101DI8",benef:"MUNICIPIO DE SAN PEDRO JALTEPETONGO",monto:"8,600,000",reintegro:"0.00",felab:"21/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:84,rfc_benef:"MSD850101BB4",benef:"MUNICIPIO DE SANTO DOMINGO ROAYAGA",monto:"8,600,000",reintegro:"0.00",felab:"21/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:85,rfc_benef:"MSM850101FCA",benef:"MUNICIPIO DE SANTA MARIA TEMAXCALAPA",monto:"6,000,000",reintegro:"0.00",felab:"14/04/2021",fpago:"21/04/2021",estatus:"Pago Siaff",},
{id:86,rfc_benef:"MZL8501013Z8",benef:"MUNICIPIO DE ZAPOTITLAN LAGUNAS",monto:"7,000,000",reintegro:"0.00",felab:"21/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:87,rfc_benef:"MSA8501011U2",benef:"MUNICIPIO DE SAN ANDRES CABECERA NUEVA",monto:"8,600,000",reintegro:"0.00",felab:"21/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:88,rfc_benef:"MSM850101AX3",benef:"MUNICIPIO DE SAN MATEO PIÃ‘AS",monto:"8,600,000",reintegro:"0.00",felab:"21/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:89,rfc_benef:"MSC850101GK3",benef:"MUNICIPIO DE SANTA CRUZ ITUNDUJIA",monto:"4,300,000",reintegro:"0.00",felab:"21/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:90,rfc_benef:"MSA850101BQ2",benef:"MUNICIPIO DE SAN ANTONIO ACUTLA",monto:"5,000,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:91,rfc_benef:"MSM8501014L3",benef:"MUNICIPIO DE SANTA MARIA ECATEPEC",monto:"5,000,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:92,rfc_benef:"MSP850101K79",benef:"MUNICIPIO DE SAN PEDRO YANERI",monto:"7,000,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:93,rfc_benef:"MSP850101CX1",benef:"MUNICIPIO DE SAN PEDRO TEUTILA",monto:"7,000,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:94,rfc_benef:"CIS201231Q8A",benef:"COMUNIDAD INDIGENA DE SAN JUAN MAZATLAN",monto:"6,000,000",reintegro:"0.00",felab:"28/04/2021",fpago:"07/05/2021",estatus:"Pago Siaff",},
{id:95,rfc_benef:"MSA850101214",benef:"MUNICIPIO DE SANTIAGO APOALA",monto:"4,390,000",reintegro:"0.00",felab:"26/04/2021",fpago:"29/04/2021",estatus:"Pago Siaff",},
{id:96,rfc_benef:"MNZ850101C61",benef:"MUNICIPIO NUEVO ZOQUIAPAM",monto:"8,600,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:97,rfc_benef:"MTM8501018RA",benef:"MUNICIPIO DE TEOCOCUILCO DE MARCOS PEREZ",monto:"8,600,000",reintegro:"0.00",felab:"26/04/2021",fpago:"30/04/2021",estatus:"Pago Siaff",},
{id:98,rfc_benef:"",benef:"TOTAL Mes de ABRIL del estatus Pago Siaff",monto:"327,974,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:99,rfc_benef:"",benef:"TOTAL del mes de ABRIL",monto:"339,474,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:100,rfc_benef:"MSJ850101G22",benef:"MUNICIPIO DE SAN JORGE NUCHITA",monto:"1,075,000",reintegro:"0.00",felab:"12/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:101,rfc_benef:"MSJ850101V61",benef:"MUNICIPIO DE SAN JUAN OZOLOTEPEC",monto:"3,500,000",reintegro:"0.00",felab:"12/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:102,rfc_benef:"MSM850101SN1",benef:"MUNICIPIO DE SAN MIGUEL AHUEHUETITLAN",monto:"4,300,000",reintegro:"0.00",felab:"12/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:103,rfc_benef:"MSC850101372",benef:"MUNICIPIO DE SANTA CATARINA LOXICHA",monto:"6,000,000",reintegro:"0.00",felab:"12/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:104,rfc_benef:"MSD8501017D1",benef:"MUNICIPIO DE SANTO DOMINGO YODOHINO",monto:"12,900,000",reintegro:"0.00",felab:"12/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:105,rfc_benef:"MSJ850101QD2",benef:"MUNICIPIO DE SAN JUAN DEL RIO",monto:"8,600,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:106,rfc_benef:"MSJ8501016I0",benef:"MUNICIPIO DE SAN JUAN IHUALTEPEC",monto:"6,000,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:107,rfc_benef:"MSJ960101K93",benef:"MUNICIPIO DE SANTIAGO JOCOTEPEC",monto:"8,600,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:108,rfc_benef:"MSJ850101GD2",benef:"MUNICIPIO DE SAN JUAN COTZOCON",monto:"10,000,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:109,rfc_benef:"MSM850101RI3",benef:"MUNICIPIO DE SAN MARTIN ZACATEPEC",monto:"8,600,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:110,rfc_benef:"MSJ85010131A",benef:"MUNICIPIO DE SAN JERONIMO TAVICHE",monto:"8,600,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:111,rfc_benef:"MSP8501013Z2",benef:"MUNICIPIO DE SAN PEDRO QUIATONI",monto:"8,600,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:112,rfc_benef:"MRO850101K51",benef:"MUNICIPIO DE LA REFORMA",monto:"5,500,000",reintegro:"0.00",felab:"14/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:113,rfc_benef:"MSM850101FU5",benef:"MUNICIPIO DE SAN MIGUEL TENANGO",monto:"8,600,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:114,rfc_benef:"MSP850101CJ9",benef:"MUNICIPIO DE SAN PEDRO TAVICHE",monto:"6,000,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:115,rfc_benef:"MSM850101568",benef:"MUNICIPIO DE SANTA MARIA TEXCATITLAN",monto:"8,600,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:116,rfc_benef:"MSM860201EP4",benef:"MUNICIPIO DE SANTA MARIA IXCATLAN",monto:"8,600,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:117,rfc_benef:"MSJ8501019R4",benef:"MUNICIPIO DE SAN JUAN TEITA",monto:"4,300,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:118,rfc_benef:"MSJ850101DY0",benef:"MUNICIPIO DE SAN JUAN MIXTEPEC",monto:"5,000,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:119,rfc_benef:"MSJ850101V10",benef:"MUNICIPIO DE SAN JOSE INDEPENDENCIA",monto:"6,248,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:120,rfc_benef:"MSS960101NHA",benef:"MUNICIPIO DE SAN SIMON ZAHUATLAN",monto:"4,569,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:121,rfc_benef:"MSP850101KH0",benef:"MUNICIPIO DE SAN PEDRO SOCHIAPAM",monto:"8,600,000",reintegro:"0.00",felab:"20/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:122,rfc_benef:"MOA8501011N7",benef:"MUNICIPIO LA COMPAÑIA",monto:"4,300,000",reintegro:"0.00",felab:"24/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:123,rfc_benef:"MSA850101LW4",benef:"MUNICIPIO DE SAN AGUSTIN AMATENGO",monto:"3,895,000",reintegro:"0.00",felab:"24/05/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:124,rfc_benef:"",benef:"TOTAL Mes de MAYO del estatus Cuenta por Liquidar",monto:"160,987,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:125,rfc_benef:"",benef:"TOTAL del mes de MAYO",monto:"160,987,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:126,rfc_benef:"CIS210325CB9",benef:"COMUNIDAD INDIGENA DE SAN JUAN LACHIXILA",monto:"5,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:127,rfc_benef:"MSM8501017A5",benef:"MUNICIPIO DE SANTA MARIA PEÃ‘OLES",monto:"8,600,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:128,rfc_benef:"MSJ850101395",benef:"MUNICIPIO DE SAN JUAN LALANA",monto:"7,800,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:129,rfc_benef:"MSA951112IS7",benef:"MUNICIPIO DE SANTIAGO AMOLTEPEC",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:130,rfc_benef:"MSM850101LF8",benef:"MUNICIPIO DE SAN MATEO TLAPILTEPEC",monto:"3,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:131,rfc_benef:"MSM860101RW9",benef:"MUNICIPIO DE SANTA MARIA ZANIZA",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:132,rfc_benef:"MSM850101BA4",benef:"MUNICIPIO DE SAN MIGUEK YOTAO",monto:"2,700,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:133,rfc_benef:"MSJ850101MF2",benef:"MUNICIPIO DE SAN JUAN TAMAZOLA",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:134,rfc_benef:"MSF850101JZ9",benef:"MUNICIPIO DE SAN FRANCISCO DEL MAR",monto:"6,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:135,rfc_benef:"MSC850101A73",benef:"MUNICIPIO DE SANTA CATARINA LACHATAO",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:136,rfc_benef:"MSC8501013J0",benef:"MUNICIPIO DE SANTIAGO CAMOTLAN",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:137,rfc_benef:"MSM8501011J5",benef:"MUNICIPIO DE SAN MIGUEL ALOAPAM",monto:"6,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:138,rfc_benef:"MSJ850101NK0",benef:"MUNICIPIO DE SAN JUAN LACHIGALLA",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:139,rfc_benef:"MSM9601018X3",benef:"MUNICIPIO DE SANTA MARIA TOTOLAPILLA",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:140,rfc_benef:"MSM860201JP0",benef:"MUNICIPIO DE SANTA MARIA NDUAYACO",monto:"6,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:141,rfc_benef:"MSF8501012U4",benef:"MUNICIPIO DE SAN FRANCISCO CHINDUA",monto:"3,800,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:142,rfc_benef:"MNZ850101C61",benef:"MUNICIPIO NUEVO ZOQUIAPAM",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:143,rfc_benef:"MAO850101QH0",benef:"MUNICIPIO DE ABEJONES",monto:"2,000,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:144,rfc_benef:"MSC850101GK3",benef:"MUNICIPIO DE SANTA CRUZ ITUNDUJIA",monto:"4,300,000",reintegro:"0.00",felab:"07/06/2021",fpago:"",estatus:"Cuenta por Liquidar",},
{id:145,rfc_benef:"",benef:"TOTAL Mes de JUNIO del estatus Cuenta por Liquidar",monto:"89,600,000",reintegro:"",felab:"",fpago:"",estatus:"",},
{id:146,rfc_benef:"",benef:"TOTAL del mes de JUNIO",monto:"89,600,000",reintegro:'',felab:'',fpago:'',estatus:'',},
{id:147,rfc_benef:"",benef:"TOTAL GENERAL",monto:"783,761,000",reintegro:"",felab:"",fpago:"",estatus:"",},

    
]

//const clave =
//[
//{mes:"Enero",modificado:"2,823.52",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"2,823.52",},
//{mes:"Febrero",modificado:"662,652.00",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"662,652.00",},
//{mes:"Marzo",modificado:"297,705,414.67",ejercido:"12,000,000",comprometido:"0.00",pagado:"181,700,000.00",disponible:"104,005,414.67",},
//{mes:"Abril",modificado:"241,216,020.37",ejercido:"11,500,000",comprometido:"0.00",pagado:"321,974,000.00",disponible:"-92,257,979.63",},
//{mes:"Mayo",modificado:"159,584,747.30",ejercido:"160,987,000",comprometido:"0.00",pagado:"6,000,000.00",disponible:"-7,402,252.70",},
//{mes:"Junio",modificado:"150,812,361.72",ejercido:"89,600,000.00",comprometido:"0.00",pagado:"0.00",disponible:"61,212,361.72",},
//{mes:"Julio",modificado:"390,750,000.00",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"390,750,000.00",},
//{mes:"Agosto",modificado:"495,989,331.24",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"495,989,331.24",},
//{mes:"Septiembre",modificado:"250,744,240.53",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"250,744,240.53",},
//{mes:"Octubre",modificado:"185,115,899.70",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"185,115,899.70",},
//{mes:"Noviembre",modificado:"80,963,509.37",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"80,963,509.37",},
//{mes:"Diciembre",modificado:"46,452,999.58",ejercido:"0.00",comprometido:"0.00",pagado:"0.00",disponible:"46,452,999.58",},
//{mes:"TOTAL",modificado:"2,300,000,000.00",ejercido:"274,087,000.00",comprometido:"0.00",pagado:"509,674,000.00",disponible:"1,516,239,000.00",},



//]


</script>


<style scoped>

</style>
