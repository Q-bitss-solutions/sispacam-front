<template>
<div class="row">
  <div class="col-md-12">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active" id="tabPersonal">
          <a href="#datosGeograficos" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            Datos Geograficos
          </a>
        </li>
        <li role="presentation"  id="tabDatosCamino">
          <a href="#datosCamino" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            Datos del Camino
          </a>
        </li>  
        <li role="presentation"  id="tabDatosBeneficiario">
          <a href="#datosBeneficiario" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            Datos del Beneficiario
          </a>
        </li>           
    </ul>
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="datosGeograficos">
          <DatosGeograficos  @set-icveEdo="setCEdo" @show-error="showError" />
        </div>
        <div role="tabpanel" class="tab-pane" id="datosCamino">
          <DatosCamino :edo='cEstado' @show-error="showError"> </DatosCamino>
        </div>
        <div role="tabpanel" class="tab-pane" id="datosBeneficiario">
          <DatosBeneficiario> </DatosBeneficiario>
        </div>      
    </div>
  <div>
    <div v-if="msgError" class="alert alert-danger">{{ msgError }}</div>
  </div>    
  </div>
</div>
</template>

<script>
import DatosGeograficos from '@/components/AltaDeCaminos/DatosGeograficos';
import DatosCamino from '@/components/AltaDeCaminos/DatosCamino';
import DatosBeneficiario from '@/components/AltaDeCaminos/DatosBeneficiario';
export default {
  name: 'AltaCamino',
  components: { DatosGeograficos, DatosCamino, DatosBeneficiario },
  data () {
    return {
      cEstado: '',
      msgError: null
    }    
  },
  methods: {
    setCEdo (e) {
      console.log('alertMessageReceived')
      const obj = JSON.parse(JSON.stringify(e))
      this.cEstado = {
        iso:obj.edo.iso,
        abreviaturaEdo:obj.edo.abreviaturaEdo
      }
    },
    showError(e){
      console.log('show-error')
      this.msgError = e;
      console.log(e)
      //setTimeout(() => this.msgError = false, 10000);
    }
  },
  mounted () {  
},  
}
</script>



