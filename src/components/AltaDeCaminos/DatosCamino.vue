<template>


<div>
<table id="datosCamino" class="tableContenido" width="100%" border="0">
    <tr>
        <td>
            <h2>Datos del Camino</h2>
            <h2>{{idcamino}}</h2>
            <hr class="red">
        </td>        
    </tr> 
    <tr>
        <td>
            <div class="form-group col-md-12">
                <label>Estrategia Gobierno Federal:</label>
                <div>
                    <label class="checkbox-inline">
                        <input type="checkbox" id="ciit" value="true"  name="ciit" v-model="ciit" > 
                        CIIT
                    </label>
                    <label class="checkbox-inline">
                        <input type="checkbox" id="trenMaya" value="trenMaya" name="trenMaya" v-model="tren_maya"> 
                        Tren Maya
                    </label>               
                    <label class="checkbox-inline">
                        <input type="checkbox" id="caminosOriginales" value="caminosOriginales" name="caminosOriginales" v-model="caminosOriginales"> 
                        Caminos Originales
                    </label>                                                             
                </div>
            </div>            

            <div class="form-group col-md-12">
                <label for="tipoCamino">Tipo de Camino:</label>
                <div id="tipoCamino">
                    <label class="radio-inline">
                        <input v-model="tipo_camino" type="radio" id="cabecera" name="tipo_camino" value="C" :disabled = "editmode" > Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipo_camino" type="radio" id="agencia" name="tipo_camino" value="A"  :disabled = "editmode" > Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipo_camino" type="radio" id="otro" name="tipo_camino" value="O" :disabled = "editmode"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="otroTipoCamino" v-if="tipo_camino == 'O'" placeholder="Especificar otro" />              
                    </label> 
                    <div class="row col-md-10">
                    <small v-if="tipo_camino == 'A' && this.edo.localidades.length -1 < 1" class="form-text form-text-error">
                     Para esta opcion debe seleccionar por lo menos una Localidad
                    </small>  
                    </div>                                   
                </div>                    
            </div>              
            
            <div class="form-group">
                <div class="col-md-4">       
                    <div >
                        <label for="camino">ID Camino:</label>
                        <input id="camino" name="LADA3" class="form-control"  placeholder="Id Camino" value="" disabled v-model="idcamino"> 
                    </div>
                </div>
                <div class="col-md-8"> 
                      <label for="nombrecamino">Nombre del Camino:</label>
                      <input v-model="nombre_camino" :class="{'form-control-error': $v.nombre_camino.$error}"
                        id="nombre_camino" 
                        name="nombre_camino" 
                        v-model.trim="$v.nombre_camino.$model"
                        class="form-control"  
                        type="text" 
                        placeholder="Nombre del Camino"  
                
                        value=""/>  
                        <div class="row col-md-10">
                            <small v-if="!$v.nombre_camino.required && $v.nombre_camino.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>                                     
                </div>
            </div>  
            <div class="col-md-12 help-block"/>

            <div class="form-group">  
                
                <div class="col-md-4"> 
                    <label>Longitud total(km):</label>
                    <div> 
                        <ejs-numerictextbox  :class="{'form-control-error': $v.fLongitdTotal.$error}"
                            id="longitud"
                            placeholder="Longitud total(km)"
                            v-model="fLongitdTotal"
                            :min="min"
                            :max="max"
                            :showSpinButton='false'>
                           </ejs-numerictextbox>                        
                        <div class="row col-md-10">
                            <small v-if="!$v.fLongitdTotal.required && $v.fLongitdTotal.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>                      
                    </div>
                </div> 
                <div class="col-md-6">
                    <label>Longitud a pavimentar 2019-2024(km):</label>
                    <div>
                        <ejs-numerictextbox  :class="{'form-control-error': $v.fLongitdTotalAPavimentar.$error}" 
                            id="longitud_pavimentar"
                            placeholder="Longitud a pavimentar 2019-2014(km)"
                            v-model="fLongitdTotalAPavimentar" 
                            :min="min"                             
                            :max="max"
                            :showSpinButton='false'>
                        </ejs-numerictextbox> 
                        <div class="row col-md-10">
                            <small v-if="!$v.fLongitdTotalAPavimentar.required && $v.fLongitdTotalAPavimentar.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4"> 
                    <label>Ancho del Camino:</label>
                        <ejs-dropdownlist :class="{'form-control-error': $v.ancho_camino.$error}" 
                        id="ancho_camino"    
                        :dataSource="anchoCaminoData"
                        :change="obteneranchocamino"
                        :fields="anchoCaminoFields"
                        placeholder="Selecciona el ancho del camino"
                        v-model="ancho_camino"
                        v-model.trim="$v.ancho_camino.$model"
                        ref="refAncho"
                        >
                        </ejs-dropdownlist> 
                        <div class="row col-md-10">
                            <small v-if="!$v.ancho_camino.required && $v.ancho_camino.$error" class="form-text form-text-error">
                            Este campo es obligatorio
                            </small>
                        </div>
                </div>       
                <div class="col-md-4">
                    <label>Presupuesto Base:</label>
                    <input id="Presup"  type="text" class="form-control"  placeholder="" value="" disabled v-model="Presup">
                </div> 
             </div>         
        </td>
    </tr>
</table>
<table width="100%" border="0">
    <tr>
        <td>
        <div class="form-group col-md-12">
                <label>Ubicación:</label>
                <div> 
                    <textarea maxlength="350" id="ubicacionCamino" name="ubicacionCamino" class="form-control" value=""   
                        placeholder="Ingrese la ubicación Camino" rows="3"  v-model="ubicacionCamino"></textarea>
                </div>
            </div>
        </td>
    </tr> 
</table>    
<table width="100%" border="0">
<tr>
    <td>
        <div class="form-group">
            <div class="col-md-12"> 
                <label>Caracteristicas actuales del camino:</label>    
                <div> 
                    <textarea  rows="3" maxlength="350" id="caracteristicasCamino" name="caracteristicasCamino" class="form-control" value=""   
                        placeholder="Ingrese las caracteristicas del camino"  v-model="caracteristicasCamino">
                    </textarea>
                </div>                                
            </div>
        </div>
    </td>
</tr>
</table>   

<table width="100%" border="0">
    <tr>
        <td>
            <div class="col-md-12 help-block"/>
            <div class="form-group">
                <div class="col-md-12"> 
                    <label>Beneficios del Camino:</label>
                    <div>
                        <textarea rows="3" maxlength="350" id="beneficiosCamino" name="beneficiosCamino" class="form-control" value=""   
                            placeholder="Ingrese los beneficios del camino" v-model="beneficiosCamino">
                        </textarea>                    
                    </div>
                </div>
            </div>            
        </td>
    </tr>    
</table>
       <div class="modal fade" id="addCamino" tabindex="-1" role="dialog" aria-labelledby="addConcept"
           aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <h4 class="modal-title">Aviso del Sistema</h4>
                   </div>
                   <div class="modal-body">
                       <p>Se guardaron los datos correctamente</p>
                       <p>El id del camino es:<strong class="alert">{{idcamino}}</strong></p>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                   </div>
               </div><!-- /.modal-content -->
           </div><!-- /.modal-dialog -->
       </div><!-- /.modal -->
<div class="form-group">
    <div class="row">
        <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
            v-on:click="GuardaDatos" :disabled="btnSaveDisabled">
            Guardar Datos
        </button>
    </div>
</div>
<div id="alertModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="alert alert-danger">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <div class="">Ocurrio un error</div>
            </div>            
            <div class="modal-body">
                <p>El camino no pudo ser guardado favor de intentarlo mas tarde o contactar al 
                    area de sistemas</p>
            </div>            
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">
                    Close</button>
            </div>
        </div>
    </div>
</div>
<div id="alertlong" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="alert alert-danger">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <div class="">Ocurrio un error</div>
            </div>            
            <div class="modal-body">
                <p>La obra que estás intentando registrar es de tipo Agencia Municipal, 
                    y por lo tanto solo debe tener una sola localidad, favor de corregir y reintentar
                </p>
            </div>            
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">
                    Close</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager } from "@syncfusion/ej2-data";
import { generarId, getupdate, CaminoPut } from '@/api/alta-camino';
import Vue from "vue";
import { required } from 'vuelidate/lib/validators'



Vue.use(DropDownListPlugin);
Vue.use(NumericTextBoxPlugin);

export default {
    name: 'DatosCamino',
    props: {
        edo:{
            abreviaturaEdo:'',
            iso:'',
            localidades:'',
            icveestados: '',
            region: '',
            ubicacion: '',
            poblacion_indigena: '',
            totpoblacion: '',
            icve_estado_inegi: '',
            icve_municipio: '',
            ip_poblacion_total_localidadess: '',
            ipoblacion_municipio: '',
            ilocalidades_municipioo: '',
            marginacion: '',
        },
    },
    data(){
        return {
            ciit:'',
            tren_maya:'',
            caminosOriginales:'',
            tipo_camino: null,
            otroTipoCamino: '',
            nombre_camino:'',
            ubicacionCamino:'',
            caracteristicasCamino:'',
            beneficiosCamino:'',
            fLongitdTotal: '',
            ancho_camino:'',
            fLongitdTotalAPavimentar: '',
            min: 0,
            max: 999999,   
            idcamino: '',
            btnSaveDisabled: false,
            Presup: '',
            anchoCaminoFields: { text: 'name', value: 'id' },     
            anchoCaminoData: new DataManager([
               { id: 1, name: '4.0' },
               { id: 2, name: '4.5' },
               { id: 3, name: '5.0' },
               { id: 4, name: '5.5' },
               { id: 5, name: '6.0' },
            ]),  
            editmode: false              

        }
    },
    validations: {
        nombre_camino: {
            required,

        },
        ancho_camino: {
            required,

        },
        fLongitdTotalAPavimentar: {
            required,
        },
        fLongitdTotal: {
            required,
        },
        
    },
    methods:{ 
         async obteneranchocamino(){ 
           if(this.ancho_camino == 1)  
              this.Presup = "$ 2,700,104.59"
           if(this.ancho_camino == 2)  
              this.Presup = "$ 3,100,198.29"
           if(this.ancho_camino == 3)  
              this.Presup = "$ 3,507,565.95"
           if(this.ancho_camino == 4)  
              this.Presup = "$ 3,929,902.41"
           if(this.ancho_camino == 5)  
              this.Presup = "$ 4,300,019.57"

          },

          async CargaDatos(clave){
              const response = await getupdate(clave)
              console.log(response)
              this.ciit = response.ciit
              this.tren_maya = response.tren_maya
              this.caminosOriginales = response.caminos_originales
              this.tipo_camino = response.tipo_camino
              this.idcamino = response.clave
              this.nombre_camino = response.nombre_camino
              this.fLongitdTotal = response.longitud
              this.fLongitdTotalAPavimentar = response.longitud_pavimentar
              //this.anchoCaminoData = response.ancho_camino
              this.anchoCaminoFields = response.ancho_camino
              this.ubicacionCamino   = response.ubicacion
              this.caracteristicasCamino = response.caracteristicas
              this.beneficiosCamino = response.beneficios 
              console.log("ancho_camino") 
              console.log(response.ancho_camino)

              this.ancho_camino = response.ancho_camino

              
              this.$refs.refAncho.ej2Instances.value = response.ancho_camino
              console.log("this.ancho_camio_2")
              console.log(this.ancho_camino)
              
              if (response.ancho_camino == 1) this.ancho_camino = 1 
              if (response.ancho_camino == 2) this.ancho_camino = 2
              if (response.ancho_camino == 3) this.ancho_camino = 3
              if (response.ancho_camino == 4) this.ancho_camino = 4
              if (response.ancho_camino == 5) this.ancho_camino = 5

            
             
              //anchoCaminoData.push([{
              //    id: "1", name: "otr"
              //}
              //])

              if(this.ancho_camino == 1)  this.Presup = "$ 2,700,104.59"
              if(this.ancho_camino == 2)  this.Presup = "$ 3,100,198.29"
              if(this.ancho_camino == 3)  this.Presup = "$ 3,507,565.95"
              if(this.ancho_camino == 4)  this.Presup = "$ 3,929,902.41"
              if(this.ancho_camino == 5)  this.Presup = "$ 4,300,019.57"  
              

              //new DataManager(this.ancho_camino)
              //this.anchoCaminoData.push([
              //  { id: '1', name: 'OTR' },
              //])
             
          },


         async GuardaDatos(){   
             this.$emit("show-error", false); 
             this.$v.$touch()
             if (this.$v.$invalid) {
                this.submitStatus = "Error";
            } else {
             this.btnSaveDisabled  = true
             try{
                 console.log("GenerarId22")
                 
                 const data = {
                    iso:this.edo.iso,
                    cve_agee:this.edo.cve_agee,
                    estrategia_gobierno:"A",
                    ciit:this.ciit == "" ? false:true,
                    tren_maya:this.tren_maya == "" ? false:true,
                    caminos_originales:this.caminosOriginales == "" ? false:true,
                    tipo_camino:this.tipo_camino,
                    nombre_camino:this.nombre_camino,                                
                    longitud:this.fLongitdTotal,
                    longitud_pavimentar:this.fLongitdTotalAPavimentar,
                    ancho_camino:this.ancho_camino,
                    caracteristicas:this.caracteristicasCamino,
                    beneficios:this.beneficiosCamino,
                    localidades:this.edo.localidades,
                    icveestados:this.edo.icveestados,
                    region:this.edo.region,
                    ubicacion:this.edo.ubicacion,
                    poblacion_indigena:this.edo.poblacion_indigena,
                    totpoblacion:this.edo.totpoblacion,
                    icve_estado_inegi:Number.parseInt(this.edo.icve_estado_inegi) ,
                    icve_municipio:this.edo.icve_municipio,
                    ip_poblacion_total_localidades:this.edo.ip_poblacion_total_localidades,
                    ipoblacion_municipio:this.edo.ipoblacion_municipio,
                    ilocalidades_municipio:this.edo.ilocalidades_municipio,
                    marginacion:this.edo.marginacion

                }

                
                //console.log('data')
                //console.log(data)
                if(this.editmode) {
                 const response1 = await CaminoPut(data, this.$route.params.obraId)
                 console.log(response1)
                }else{
                 const response = await generarId(data)
                 this.idcamino = response.clave
                 $('#addCamino').modal('show')
                 this.btnSaveDisabled  = false
                }
                
                //console.log(response)
                 


                }
                catch(err){    
                    this.btnSaveDisabled  = false  
                    if(this.tipo_camino == 'A' && (this.edo.localidades.length -1) > 1) {
                       //console.log("aqui")
                        //console.log(this.edo.localidades.length -1)
                         $('#alertlong').modal('show')
                     }
                    console.log('error al obtener el Id-Camino')
                    console.log(err)
                    //$('#alertModal').modal('show')
                    this.$emit("show-error",'Error al guardar camino por');                  
                }
             
                
            }
            
        }
    },
    created(){
        if(this.$route.params.obraId){
            this.editmode = true
            this.CargaDatos(this.$route.params.obraId)
        }
        console.log('caminoid: ' + this.$route.params.obraId)
        console.log(getupdate)
        
        

    },      
}
</script>

<style >
.form-control-idCamino{
    width: 50%;
    margin-right: 6%; 
}
.form-control-nombre_camino{
    width: 50%;
 
}

.e-input[disabled],
.e-input-group .e-input[disabled],
.e-input-group.e-control-wrapper .e-input[disabled],
.e-input-group.e-disabled,
.e-input-group.e-control-wrapper.e-disabled,
.e-float-input input[disabled],
.e-float-input.e-control-wrapper input[disabled],
.e-float-input textarea[disabled],
.e-float-input.e-control-wrapper textarea[disabled],
.e-float-input.e-disabled,
.e-float-input.e-control-wrapper.e-disabled {
  -webkit-text-fill-color: #555;
  background: #eee;
  color: #999;
  border-color: #ccc;
}
</style>