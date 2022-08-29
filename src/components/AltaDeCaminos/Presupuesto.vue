<template>
<div>
<table ref="datosPersonales" id="datosPersonales" class="table table-responsive table-bordered small-top-buffer" width="100%" border="0">
    <tbody>
        <tr>
            <td>
                <div>
                    <h2>Presupuesto Base</h2>
                    <hr class="red">
                </div> 
            </td>
        </tr>
              <div class="row">
        <div class="col-md-12">
          <table class="table table-responsive table-bordered small-top-buffer">
            <thead>
              <tr>
                <th width="50%">DESCRIPCIÓN</th>
                <th>UNIDAD</th>
                <th>CANTIDAD</th>
                <th>IMPORTE</th>
                <th>PORCENTAJE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LIMPIEZA DE LA SUPERFICIE DE RODAMIENTO PARA LA EJECUCIÓN DE LOS TRABAJOS DE CONSERVACIÓN.</td>
                <br>
                <select class="form-control" id="unidad1">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad1" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto1" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje1" placeholder="%"></td>
              </tr>
              <tr>
                <td>ESCARIFICACIÓN POR MEDIOS MANUALES DE LA SUPERFICIE COMPACTADA PARA RECIBIR UNA NUEVA CAPA.</td>
                <br>
                <select class="form-control" id="unidad2">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad2" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto2" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje2" placeholder="%"></td>
              </tr>
              <tr>
                <td>EXTRACCIÓN DE DERRUMBES OCASIONADOS POR CAUSAS NO IMPUTABLES AL CONTRATISTA CUALQUIERA QUE SEA SU CLASIFICACIÓN, EL MATERIAL SE TRANSPORTA AL BANCO DE DESPERDICIO, INCLUYE CARGA A UNIDADES DE RANSPORTE, POR UNIDAD DE OBRA TERMINADA.</td>
                <br>
                <select class="form-control" id="unidad3">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad3" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto3" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje3" placeholder="%"></td>
              </tr>
              <tr>
                <td>AFINAMIENTO PARA PERFILAR LAS SECCIONES DE CONSTRUCCIÓN, UTILIZANDO EL MATERIAL PRODUCTO DEL AFINAMIENTO, PARA SU EJECUCIÓN SE INCLUYE MANO DE OBRA Y HERRAMIENTA MENOR, POR UNIDAD DE OBRA TERMINADA.</td>
                <br>
                <select class="form-control" id="unidad4">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad4" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto4" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje4" placeholder="%"></td>
              </tr>
              <tr>
                <td>EXCAVACIÓN PARA ESTRUCTURAS U OBRAS DE DRENAJE, CUALQUIERA QUE SEA SU CLASIFICACIÓN, CON UNA PROFUNDIDAD MAYOR DE 1,5 HASTA 3,0 M, EL MATERIAL PRODUCTO DE LA EXCAVACIÓN SE DESPERDICIA EN EL BANCO QUE SE INDIQUE, POR UNIDAD DE OBRA TERMINADA.</td>
                <br>
                <select class="form-control" id="unidad5">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad5" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto5" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje5" placeholder="%"></td>
              </tr>
              <tr>
                <td>CABEZAL PARA ALCANTARILLA A BASE DE ZAMPEADO DE MAMPOSTERÍA DE PIEDRA PARA CUALQUIER ALTURA, DE TERCERA CLASE JUNTEADA CON MORTERO DE CEMENTO, POR UNIDAD DE OBRA TERMINADA.</td>
                <br>
                <select class="form-control" id="unidad6">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad6" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto6" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje6" placeholder="%"></td>
              </tr>
              <tr>
                <td>MUROS DE CONTENCIÓN A BASE DE MAMPOSTERÍA DE PIEDRA DE TERCERA CLASE JUNTEADA CON MORTERO DE CEMENTO, PARA CUALQUIER ALTURA, POR UNIDAD DE OBRA TERMINADA.</td>
                <br>
                <select class="form-control" id="unidad7">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad7" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto7" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje7" placeholder="%"></td>
              </tr>
              <tr>
                <td>FORMACION DE PEDRAPLEN EN RELLENOS DE CAJAS CON MATERIAL DE LOS BANCOS, POR UNIDAD DE OBRA TERMINADA, PARA ABATIMIENTO DE NIVEL DE AGUAS FREATICAS.</td>
                <br>
                <select class="form-control" id="unidad8">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad8" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto8" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje8" placeholder="%"></td>
              </tr>
              <tr>
                <td>GUARNICIÓN DE CONCRETO</td>
                <br>
                <select class="form-control" id="unidad9">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad9" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto9" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje9" placeholder="%"></td>
              </tr>
              <tr>
                <td>RODERAS DE CONCERETO HIDRAULICO DE F'C= 200 KG/CM2, POR UNIDAD DE OBRA TERMINADA</td>
                <br>
                <select class="form-control" id="unidad10">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad10" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto10" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje10" placeholder="%"></td>
              </tr>
              <tr>
                <td>CONSTRUCCION DE SUBRASANTE, DE 20 CM. DE  ESPESOR COMPACTO, COMPACTADA AL CIEN POR CIENTO (90%), INCLUYE ACARREOS.</td>
                <br>
                <select class="form-control" id="unidad11">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad11" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto11" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje11" placeholder="%"></td>
              </tr>
              <tr>
                <td>EMPEDRADO A BASE DE CONCRETO Y PIEDRA BRAZA PARA CAMINO.</td>
                <br>
                <select class="form-control" id="unidad12">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad12" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto12" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje12" placeholder="%"></td>
              </tr>
              <tr>
                <td>SUMINISTRO Y COLOCACION DE SEÑALAMIENTO PREVENTIVO (SP) DE 71 X 71 CMS,   P.U.O.T.</td>
                <br>
                <select class="form-control" id="unidad13">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad13" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto13" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje13" placeholder="%"></td>
              </tr>
              <tr>
                <td>SUMINISTRO Y COLOCACION DE SEÑALAMIENTO DE INFORMACION RESTRICTIVO (SR) DE 71X 71 CMS, P.U.O.T.</td>
                <br>
                <select class="form-control" id="unidad14">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad14" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto14" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje14" placeholder="%"></td>
              </tr>
              <tr>
                <td>SUMINISTRO Y COLOCACION DE BARRERAS DE PROTECCION (OD-4) QUE CUMPLAN CON EL NIVEL DE SEGURIDAD 4 O SUPERIOR DEL REPORTE NCHRP-350 Y LA NORMA NOM-037-SCT2-2012, FORMAN CON VIGAS ACANALADAS DE ACERO GALVANIZADO DE TRES CRESTAS POR INMERSION EN CALIENTE CON ACCESORIOS ( MENSULAS CON REFLEJANTE ALTA INTENSIDAD Y TUERCAS Y/O SISTEMA DE SOLDADURA ANTIVANDALISMO) INCLUYE TERMINALES (OD/4.4.2/S), P.U.O.T.</td>
                <br>
                <select class="form-control" id="unidad15">
                            <option>HA</option>
                            <option>M3</option>
                            <option>ML</option>
                            <option>PZA</option>
                        </select>
                <td><input type="number" size="10" class="form-control" id="cantidad15" placeholder=""></td>
                <td><input type="number" size="10" class="form-control" id="monto15" placeholder="$"></td>
                <td><input type="number" size="10" class="form-control" id="porcentaje15" placeholder="%"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </tbody>                                                                                                                    
</table>
</div>
</template>



<script>
import Vue from "vue";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { getEdos, getMunicipios, getLocalidades, getCvepres, getSpagos } from '@/api/alta-camino'
import { required } from 'vuelidate/lib/validators'

Vue.use(NumericTextBoxPlugin);
Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

const API = process.env.VUE_APP_SCT_SVC_BACK_BASE_URL;

export default {
    name: 'DatosGeograficos',       
    data: function() {
        return {            
            iPoblacionTotalLocalidades: 0,
            iPoblacionMunicipio: 0,
            iLocalidadesMunicipio: 0,
            ubicacion: '',
            region: '',
            icveEstadoInegi: null,
            estadosHabilitado: false,
            estadosData: new DataManager([]),
            estadosFields: { text: 'nom_agee', value: 'cve_agee' },

            icveMunicipio: null,
            municipiosHabilitado: false,
            municipiosData: new DataManager([]),
            municipiosFields: { text: 'nom_agem', value: 'cve_agem', custom: 'cve_agee' },

            localidades: [],
            localidadesHabilitado: false,
            localidadesData: new DataManager([]),
            localidadesFields: { text: 'nom_loc', value: 'cve_loc' },
            localidadesTabla: [],
            iTotalPoblacionIndigena: null,
            poblacion: 0,
            marginacion: null,

            poblacionIndigena: null,

            isoEdo:'',
            DatosGeograficos:{
                    abreviaturaEdo: '',
                    iso: '',
                    localidades: '',
                    icveestados: '',
                    region: '',
                    ubicacion: '',
                    poblacionIndigena: '',
                    totpoblacion: '',
                    icveEstadoInegi: '',
                    icveMunicipio: '',
                    iPoblacionTotalLocalidades: '',
                    iPoblacionMunicipio: '',
                    iLocalidadesMunicipio: '',
                    marginacion: '', 
                    cve_agee: '',
                    /*1*/
                }
        };
    },
     validations: {
        icveEstadoInegi: {
            required,

        }, 
        icveMunicipio: {
           required,
        },
    },
 
 
 

    methods: {
        //Envia datos Region
        enviardatos_r(){
            this.$emit("set-icveEdo", {
            datos:this.DatosGeograficos
        }); 
        },
        //Envia datos Ubicacion
        enviardatos_u(){
            this.$emit("set-icveEdo", {
            datos:this.DatosGeograficos
        }); 
        },        
        //Funcion fregion
        fregion(){
            this.DatosGeograficos.region = this.region
            this.enviardatos_r()
        },
         //Funcion funibacion
        fubicacion(){
            this.DatosGeograficos.ubicacion = this.ubicacion
            this.enviardatos_u()
        },



        //NEW ORDER
        //estados
        async siguiente(){   
            this.$emit("show-error", false); 
            this.$v.$touch()
            if (this.$v.$invalid) {
               this.submitStatus = "Error";
            }
            },
        async initData() {
            try{
                const res = await getEdos()
                const results = res.results;
                this.estadosData = new DataManager(results);
                this.estadosHabilitado = true;
                this.icveEstadoInegi = null;   
            }catch(error) {             
                console.log('error al obtener estados')
                console.log(error);
                this.$emit("show-error", error);
            }

        },
        //municipios
        async obtenerMunicipios(){            
            this.$emit("show-error", false);
            this.icveMunicipio = null;
            this.municipiosData = new DataManager([]);
            this.municipiosHabilitado = true;    
            this.clearLocalidades();            
            try{
                const {results} = await getMunicipios(this.icveEstadoInegi)
                this.municipiosData = new DataManager(results);
                this.municipiosHabilitado = true;            
            }catch(err){
                console.log('error al obtener municipios')
                console.log(err)
                this.$emit("show-error", err);
            }
        },

        //localidades
        async obtenerLocalidades(){
            try{                
                this.$emit("show-error", false);
                this.clearLocalidades();
                const res = await getLocalidades(this.icveEstadoInegi, 
                                                    this.icveMunicipio)        
                this.iLocalidadesMunicipio = res.length;
                this.iPoblacionTotalLocalidades = res.reduce((x, y) => {
                    return x + y.pob;
                    },0)
                
                this.localidadesHabilitado = true;            
                this.localidadesData = new DataManager(res);
                this.setEdoIso()
            }catch(error){
                console.log('error al obtener localidades')
                console.log(error);
                this.$emit("show-error", error);
            }
        },

        recalcularPoblacionTotal() {                     
            if (this.localidades.length > 0) {   
                const localidadesData = this.localidadesData.executeLocal(new Query());
                this.localidadesTabla = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc));

                this.iPoblacionMunicipio = localidadesData
                .filter(a => this.localidades.includes(a.cve_loc))
                .map(a => a.pob)
                .reduce((a, b) => (a + b), 0);
                 
                 this.DatosGeograficos.localidades = this.localidades
                 this.DatosGeograficos.icveestados = this.icveEstadoInegi
                 this.DatosGeograficos.region      = this.region
                 this.DatosGeograficos.ubicacion   = this.ubicacion
                 this.DatosGeograficos.poblacionIndigena = this.poblacionIndigena
                 this.DatosGeograficos.totpoblacion = this.totpoblacion
                 this.DatosGeograficos.icveEstadoInegi = this.icveEstadoInegi
                 this.DatosGeograficos.icveMunicipio = this.icveMunicipio
                 this.DatosGeograficos.iPoblacionTotalLocalidades = this.iPoblacionTotalLocalidades
                 this.DatosGeograficos.iPoblacionMunicipio = this.iPoblacionMunicipio
                 this.DatosGeograficos.iLocalidadesMunicipio = this.iLocalidadesMunicipio
                 this.DatosGeograficos.marginacion = this.marginacion
                



                 /*2*/
                 this.$emit("set-icveEdo", {
                     datos:this.DatosGeograficos
                 }); 
            
            } else {
                this.localidadesTabla = [];
                this.iPoblacionMunicipio = 0;
            }
        },             
        updateLocalidades(e){
            this.localidades = this.$refs.localidades.ej2Instances.value
            this.recalcularPoblacionTotal()

        },

        clearLocalidades(){
            this.localidadesData = null;
            this.localidadesHabilitado = false;
            this.localidades = [];
            this.localidadesTabla = [];
        },

        formatNum(num){
            return new Intl.NumberFormat().format(num);
        },

        setEdoIso(){
            const edoSelect = this.estadosData.executeLocal(new Query())
                                .filter(a => a.cve_agee == this.icveEstadoInegi)                        
            this.DatosGeograficos.iso = edoSelect[0].iso,
            this.DatosGeograficos.abreviaturaEdo = this.icveEstadoInegi
 /*           this.$emit("set-icveEdo", {
                edo:{
                    abreviaturaEdo:this.icveEstadoInegi,
                    iso:edoSelect[0].iso
                }
                }); 
 */         
            const munSelect = this.municipiosData.executeLocal(new Query())
                                .filter(a => a.cve_agem == this.icveMunicipio) 
            this.marginacion = munSelect[0].grado_marginacion.descripcion
            this.poblacionIndigena = munSelect[0].poblacion_indigena.descripcion
            this.iTotalPoblacionIndigena = munSelect[0].total_poblacion_indigena
            this.iTotalPoblacionIndigena = this.formatNum(this.iTotalPoblacionIndigena)
            var str = JSON.stringify(munSelect, null, 2); // spacing level = 2                          
        }
    },
    
    mounted() {
        this.$nextTick(() => { 
            })
    },

    created() {       
        this.initData()
    }

}
</script> 

<style>
@import "./../../../node_modules/@syncfusion/ej2-bootstrap-theme/styles/bootstrap.css";
/*
@import "ej2/base/bootstrap.scss";
*/
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.e-control.e-numerictextbox.e-lib.e-input{
    color: black !important;
    font-size: 18px;
    border: 0px ;
}

</style>