<template>
  <div>

    <h2>Edición del camino: {{ clave }}</h2>

    <InfoCamino :camino="camino"></InfoCamino>

    <hr class="red" />

    <div class="row justify-content-around">
      <div class="col-md-6">
        <button class="btn btn-primary active" @click="showModal = true" type="button">
          Agregar Beneficiario de Obra
        </button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary active" @click="goToPage" type="button">
          Editar Obra
        </button>
      </div>
    </div>


    <hr class="red" />

    <!-- Tabla Frentes de camino -->
    <!-- TODO: Rebuild - Cambiar nombre del componente -->
    <div class="row">
      <tabla-frentes-camino @deleteBeneficiario="GetConvenios(camino.id)"
        :frentes="this.convenios"></tabla-frentes-camino>
    </div>

    <hr class="red" />

    <div class="row">
      <div class="col-md-8">
        <AgregadoFrentes :metrics="metrics"></AgregadoFrentes>
      </div>
    </div>

    <!-- Modal: Formulario Agregar Beneficiarios -->
    <ModalSCT v-if="showModal">
      <h3 slot="header">Agregar Beneficiario de Obra</h3>
      <FormAgregarBeneficiario @updateFrentes="GetConvenios(camino.id)" v-on:closeModal="showModal=false" slot="body"
        :camino="camino">
      </FormAgregarBeneficiario>
    </ModalSCT>


  </div>
</template>

<script>
import TablaFrentesCamino from "@/components/Caminos/TablaFrentesCamino.vue";
import ModalSCT from "@/components/Modals/SCTModal.vue";
import FormAgregarBeneficiario from "@/components/Caminos/FormAgregarBeneficiario.vue";
import { listBeneficiariosCamino, listMetricasBeneficiario } from "@/api/beneficiarios";

import { getDetalleCamino } from "@/api/caminos";
import AgregadoFrentes from "@/components/Caminos/AgregadoFrentes.vue";
import InfoCamino from '@/components/Caminos/InfoCamino.vue';
export default {
  components: { TablaFrentesCamino, ModalSCT, FormAgregarBeneficiario, AgregadoFrentes, InfoCamino },
  name: "EditarCamino",
  data() {
    return {
      camino: null,
      showModal: false,
      metrics: [],
      convenios: {},
      clave: this.$route.params.obraId,
    };
  },

  methods: {
    goToPage(){
      this.$router.push('/editobra/'+this.clave)
    },
    async GetCamino(clave) {
      const response = await getDetalleCamino(clave);
      console.log("DETALLE CAMINO");
      console.log(response);
      this.camino = response;
      this.GetConvenios(response.id)
      this.GetMetrics(response.id)
    },
    closeModal() {
      console.log("Close Modal EC");
      this.showModal = false;
    },

    async GetConvenios(id_camino) {
      const response = await listBeneficiariosCamino(id_camino);
      this.convenios = response
    },
    async GetMetrics(id_camino) {
      const response = await listMetricasBeneficiario(id_camino);
      this.metrics = response
    }

  },

  created() {
    this.GetCamino(this.clave)
  },


};
</script>