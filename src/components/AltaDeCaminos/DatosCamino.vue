<template>
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
                        <input type="checkbox" id="ciit" value="ciit"  name="ciit"> 
                        CIIT
                    </label>
                    <label class="checkbox-inline">
                        <input type="checkbox" id="trenMaya" value="trenMaya" name="trenMaya" > 
                        Tren Maya
                    </label>               
                    <label class="checkbox-inline">
                        <input type="checkbox" id="caminosOriginales" value="caminosOriginales" name="caminosOriginales" > 
                        Caminos Originales
                    </label>                                                             
                </div>
            </div>            

            <div class="form-group col-md-12">
                <label for="tipoCamino">Tipo de Camino:</label>
                <div id="tipoCamino">
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="cabecera" name="tipoCamino" value="cabecera" v> Cabecera
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="agencia" name="tipoCamino" value="agencia"> Agencia
                    </label>
                    <label class="radio-inline">
                        <input v-model="tipoCamino" type="radio" id="otro" name="tipoCamino" value="otro"> Otro
                    </label>
                    <label class="radio-inline">
                        <input v-model="otroTipoCamino" v-if="tipoCamino == 'otro'" placeholder="Especificar otro" />              
                    </label> 
                </div>                    
            </div>              
            
            <div class="form-group">
                <div class="col-md-4">       
                    <div >
                        <label for="camino">ID Camino:</label>
                        <input id="camino" name="LADA3" class="form-control"  placeholder="Id Camino" value="" disabled> 
                    </div>
                </div>
                <div class="col-md-8"> 
                      <label for="nombreCamino">Nombre del Camino:</label>
                      <input id="nombreCamino" name="nombreCamino" class="form-control"  type="text" placeholder="Nombre del Camino"  value="">                                       
                </div>
            </div>  
            <div class="col-md-12 help-block"/>

            <div class="form-group">  
                
                <div class="col-md-4"> <label>Longitud total(km):</label>
                    <div> 
                        <ejs-numerictextbox  :value="value" :min="min" :max="max"></ejs-numerictextbox>                       
                    </div>
                </div> 
                <div class="col-md-4">
                    <label>Longitud a pavimentar(km):</label>
                    <input id="longitudPavimentarCamino" name="longitudCamino" class="form-control" value="" type="text"
                        placeholder="Longitud a pavimentar(km)">
                </div>
                <div class="col-md-4"> <label>Ancho del Camin:</label>
                    <select id="anchoCamino" name="anchoCamino" class="form-control">
                        <option selected="selected" value="">Selecciona el ancho del camino</option>        
                    </select>
                </div>     
             </div> 
        
            <div class="col-md-12 help-block"/>
            <div class="form-group">
                <div class="col-md-12"> 
                    <label>Ubicación:</label>
                    <div> 
                        <textarea id="ubicacionCamino" name="ubicacionCamino" class="form-control" value=""   
                            placeholder="Ingrese la ubicación Camino" ></textarea>
                    </div>
                </div> 
            </div>
            <div class="col-md-12 help-block"/>
            <div class="form-group">
                <div class="col-md-12"> 
                    <label>Caracteristicas actuales del camino:</label>    
                    <div> 
                        <textarea id="caracteristicasCamino" name="caracteristicasCamino" class="form-control" value=""   
                            placeholder="Ingrese las caracteristicas del camino" >
                        </textarea>
                    </div>                                
                </div>
            </div>
            <div class="col-md-12 help-block"/>
            <div class="form-group">
                <div class="col-md-12"> 
                    <label>Beneficios del Camino</label>
                    <div>
                        <textarea id="beneficiosCamino" name="beneficiosCamino" class="form-control" value=""   
                            placeholder="Ingrese los beneficios del camino" >
                        </textarea>                    
                    </div>
                </div>
            </div>
        
        </td>
    </tr>
</table>
</template>

<script>
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";

import Vue from "vue";

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
            tipoCamino: null,
            otroTipoCamino: '',
            fLongitudTotalCamino: 0.00,
            pfLongitudTotalCamino: 0.00,
            value: 0,
            min: 1,
            max: 100,            

        }
    },
    methods:{
   handleInput (k, e) {
       console.log('handle')
       console.log(e)           
      const charCode = e.keyCode;
      console.log('charCode')
      console.log(charCode)    
      const code = [16,37,39,48,49,50,51,52,53,54,55,56,57]
      console.log(code.includes(charCode))
      if (!code.includes(charCode)) {
          console.log('ifff')
          console.log(this.pfLongitudTotalCamino)
          this.fLongitudTotalCamino =  this.pfLongitudTotalCamino
         return;  
      }else{    
          this.calcula(this.fLongitudTotalCamino)
          //this.pLongitudTotalCamino =  this.fLongitudTotalCamino          
          //setTimeout(() =>  this.calcula(this.fLongitudTotalCamino), 3000)
         
      }
      
    },    
    calcula(e) {
        console.log('calcula')
        console.log(e)
        let stringValue = parseFloat(e.replace(/[^\d\.]/g, ""))
        console.log(stringValue)
        if (isNaN(stringValue)) {
                    stringValue = 0
                }
        const decimals = 2;
        const thousandsSeparator = ',';
        const rounded =  Math.round(stringValue * (10 ^ decimals)) / (10 ^ decimals)
        console.log('rounded')
        console.log(rounded)
        let result = stringValue.toFixed(decimals).toString();
        console.log('result')
        console.log(result)
        if(thousandsSeparator) {
            result = result.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
            }
        console.log('result: ',result )
        this.fLongitudTotalCamino =  result;  
        this.pfLongitudTotalCamino = this.fLongitudTotalCamino;
        console.log('prev: ' ,this.pfLongitudTotalCamino)     
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
</style>