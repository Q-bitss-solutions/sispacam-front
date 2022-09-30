<template>
  <div>
    <h1>Editar Camino</h1>
    <h2>{{ nombre_camino }}</h2>
    <h2>{{ clave }}</h2>

    <hr class="red" />

    <h2>Información General</h2>

    <div class="row">
      <div class="row col-md-9">
        <div class="col-md-6">Tipo de Camino</div>
        <div class="col-md-6">{{ tipo_camino }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Estado</div>
        <div class="col-md-6">{{ cve_agee }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Municipio</div>
        <div class="col-md-6">{{ icve_municipio }}</div>
      </div>
      <div class="row col-md-9">
        <div class="col-md-6">Localidades</div>
        <div class="col-md-6">{{ localidades }}</div>
      </div>
    </div>

    <hr class="red" />

    <div class="row">
      <div class="col-md-12">
        <button
          class="btn btn-primary active"
          @click="showModal = true"
          type="button"
        >
          Agregar Beneficiario de Obra
        </button>
      </div>
    </div>

      <ModalSCT v-if="showModal">
        <h3 slot="header">Agregar Beneficiario de Obra{{ cve_agee }}</h3>
        <FormAgregarBeneficiario v-on:lololo="showModal=false" slot="body"></FormAgregarBeneficiario>
      </ModalSCT>

    <hr class="red" />
    no

    <div class="row">
      <tabla-frentes-camino :frentes="this.convenios"></tabla-frentes-camino>
    </div>
  </div>
</template>

<script>
import TablaFrentesCamino from "../components/Caminos/TablaFrentesCamino.vue";
import ModalSCT from "../components/Modals/SCTModal.vue";
import FormAgregarBeneficiario from "../components/Caminos/FormAgregarBeneficiario.vue";
import { getupdate, listBeneficiariosCamino } from "../api/alta-camino";
export default {
  components: { TablaFrentesCamino, ModalSCT, FormAgregarBeneficiario },
  name: "EditarCamino",
  data: function () {
    return {
      showModal: false,
      cve_agee: "20",
      icve_municipio: "174",
      localidades:
        '["[\\"0\\", \\"0\\", \\"0\\", \\"3\\"]", "[\\"0\\", \\"0\\", \\"0\\", \\"4\\"]"]',
      consecutivo: "2",
      tipo_camino: "A",
      nombre_camino: "CAMINOS DE OAXACA dlm",
      longitud: "2.0",
      longitud_pavimentar: "2.0",
      ancho_camino: 2,
      ubicacion_camino: "sureste",
      caracteristicas: "ctcc",
      beneficios: "benfc",
      ciit: true,
      tren_maya: false,
      caminos_originales: false,
      fecha: "2021-09-23T01:49:49.762Z",
      clave: "2-OAX-A",
      iso: "OAX",
      usuarios: null,
      estatus: "C",
      archivo: "",
      convenios:{}
    };
  },

  methods: {
    async GetCamino(clave) {
      const response = await getupdate(clave);
    },
    closeModal() {
      console.log("Close Modal EC");
      this.showModal = false;
    },

    async GetConvenios(){
      console.log("GetConvenios");
      const response = await listBeneficiariosCamino(1);
      this.convenios = response
      
    }
  },

  events: {},

  created() {
    this.GetConvenios()
  },


};
</script>