<template>
<div>
<table id="datosCamino" class="tableContenido" width="100%" border="0">
    <tr>
        <td>
            <h2>Datos del Camino</h2>
            <hr class="red">
        </td>
    </tr> 
    <tr>
        <td>
            <div class="form-group col-md-12">
                <label>Estrategia Gobierno Federal:</label>
                <div>
                    <label class="checkbox-inline">
                        <input type="checkbox" id="ciit" value="ciit"  name="ciit" v-model="ciit"> 
                        CIIT
                    </label>
                    <label class="checkbox-inline">
                        <input type="checkbox" id="trenMaya" value="trenMaya" name="trenMaya" v-model="trenMaya"> 
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
                        <input v-model="tipoCamino" type="radio" id="cabecera" name="tipoCamino" value="C" v> Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="agencia" name="tipoCamino" value="A"> Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="otro" name="tipoCamino" value="O"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="otroTipoCamino" v-if="tipoCamino == 'O'" placeholder="Especificar otro" />              
                    </label> 
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
                      <label for="nombreCamino">Nombre del Camino:</label>
                      <input v-model="nombreCamino" id="nombreCamino" name="nombreCamino" class="form-control"  type="text" placeholder="Nombre del Camino"  value="">                                       
                </div>
            </div>  
            <div class="col-md-12 help-block"/>

            <div class="form-group">  
                
                <div class="col-md-4"> 
                    <label>Longitud total(km):</label>
                    <div> 
                        <ejs-numerictextbox  
                            placeholder="Longitud total(km)"
                            :showSpinButton='false'
                            v-model="fLongitdTotal" 
                            :min="min" 
                            :max="max">
                        </ejs-numerictextbox>                       
                    </div>
                </div> 
                <div class="col-md-4">
                    <label>Longitud a pavimentar 2019-2024(km):</label>
                    <div>
                        <ejs-numerictextbox  
                            placeholder="Longitud a pavimentar 2019-2014(km)"
                            v-model="fLongitdTotalAPavimentar" 
                            :min="min"                             
                            :max="max"
                            :showSpinButton='false'>
                        </ejs-numerictextbox> 
                    </div>
                </div>
                <div class="col-md-4"> 
                    <label>Ancho del Camino:</label>
                        <ejs-combobox 
                        :dataSource="anchoCaminoData"
                        :fields="anchoCaminoFields"
                        placeholder="Selecciona el ancho del camino"
                        v-model="anchoCamino"
                        >
                        </ejs-combobox> 
                </div>     
             </div> 
        
            <div class="col-md-12 help-block"/>
        
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
                    <label>Beneficios del Camino</label>
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
       <div class="modal fade" id="addConcept" tabindex="-1" role="dialog" aria-labelledby="addConcept"
            aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <h4 class="modal-title">Aviso del Sistema</h4>
                   </div>
                   <div class="modal-body">
                       <p>Se guardaron los datos correctamente</p>
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
        v-on:click="GuardaDatos"
        data-target="#addConcept">
        Guardar Camino
       </button>
 </div>
</div>









</div>
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { DataManager } from "@syncfusion/ej2-data";
import { generarId } from '@/api/alta-camino';
import Vue from "vue";


Vue.use(ComboBoxPlugin);
Vue.use(NumericTextBoxPlugin);

export default {
    name: 'DatosCamino',
    props: {
        abreviaturaEdo: {
            type: String
        }
    },
    data(){
        return {
            ciit:'',
            trenMaya:'',
            caminosOriginales:'',
            tipoCamino: null,
            otroTipoCamino: '',
            nombreCamino:'',
            ubicacionCamino:'',
            caracteristicasCamino:'',
            beneficiosCamino:'',
            fLongitdTotal: null,
            anchoCamino:'',
            fLongitdTotalAPavimentar: null,
            min: 0,
            max: 999999,   
            idcamino: '',
            anchoCaminoFields: { text: 'name', value: 'id' },     
            anchoCaminoData: new DataManager([
                { id: '1', name: '4' },
                { id: '2', name: '4.5' },
                { id: '3', name: '5' },
                { id: '4', name: '5.5' },
                { id: '5', name: '6' },
            ]),                

        }
    },
    methods:{ 
        async GuardaDatos(){
            try{
                console.log("GenerarId")
                console.log(this.ciit)
                console.log(this.trenMaya)
                console.log(this.caminosOriginales)
                console.log(this.tipoCamino)
                console.log(this.abreviaturaEdo)
                console.log(this.nombreCamino)
                console.log(this.fLongitdTotal)
                console.log(this.fLongitdTotalAPavimentar)
                console.log(this.anchoCamino)
                console.log(this.ubicacionCamino)
                console.log(this.caracteristicasCamino)
                console.log(this.beneficiosCamino)
                
                
                        const response = await generarId(this.id,
                                                         this.cve_agee,
                                                         this.estrategia_gobierno,
                                                         this.tipo_camino,
                                                         this.nombre_camino,
                                                         this.longitud,
                                                         this.longitud_pavimentar,
                                                         this.ubicacion,
                                                         this.caracteristicas,
                                                         this.beneficios)
                console.log(response)
                this.idcamino = response
                
                }
                catch(err){
                    console.log('error al obtener el Id-Camino')
                    console.log(err)
                    this.$emit("show-error", err);

                }
        }
    }
}
</script>

<style >
.form-control-idCamino{
    width: 50%;
    margin-right: 6%; 
}
.form-control-nombreCamino{
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