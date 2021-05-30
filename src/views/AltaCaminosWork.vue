<template>
<div class="row">
  <div class="col-md-12">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active" id="tabPersonal">
          <a href="#datosGeograficos" aria-controls="profile" role="tab" data-toggle="tab" id="input-1" aria-expanded="true">
            Datos Geográficos
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
        <li v-if="$route.params.obraId" role="presentation"  id="tabAsina">
          <a href="#asignarresidente" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="true">
            Asignar
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
        <div role="tabpanel" class="tab-pane" id="asignarresidente">
          <AsignarResidente> </AsignarResidente>
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
import AsignarResidente from '@/components/AsignarResidente';
import { mapMutations } from 'vuex'

export default {
  name: 'AltaCamino',
  components: { DatosGeograficos, 
                DatosCamino, 
                DatosBeneficiario,
                AsignarResidente
              },
  data () {
    return {
      cEstado: '',
      msgError: null,
      breadcrumb: ['Camino '+ this.$route.params.obraId],
    }    
  },
  methods: {
    setCEdo (e) {
      console.log('alertMessageReceived')
      const obj = JSON.parse(JSON.stringify(e))
      console.log(obj)
      this.cEstado = obj.datos
    },
    showError(e){
      console.log('show-error')
      this.msgError = e;
      console.log(e)
      //setTimeout(() => this.msgError = false, 10000);
    },
    ...mapMutations(['setBreadcrumb']),    
  },
  created() {
    console.log('caminoid: ' + this.$route.params.obraId)
  },
  beforeMount: function () {    
    if(this.$route.params.obraId){
      this.setBreadcrumb(this.breadcrumb)
    }
  }, 
}
</script>



