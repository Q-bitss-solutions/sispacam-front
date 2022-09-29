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
      <tabla-frentes-camino :frentes="frentes"></tabla-frentes-camino>
    </div>
  </div>
</template>

<script>
import TablaFrentesCamino from "../components/Caminos/TablaFrentesCamino.vue";
import ModalSCT from "../components/Modals/SCTModal.vue";
import FormAgregarBeneficiario from "../components/Caminos/FormAgregarBeneficiario.vue";
import { getupdate } from "../api/alta-camino";
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
      frentes: {
        beneficiario: {
          id_camino: 5, // id del camino en la db
          clave_camino: "OAX-C-001", // clave del camino
          clave_beneficiario: "B", // clave del beneficiario
          region: "Detrás del cerro", // input del formulario
          ubicacion: "u1", // input del formulario
          p_indigena: "100", // viene de /api/v1/municipio?cve_agem=
          marginacion: "alta", // viene de /api/v1/municipio?cve_agem=
          total_p_indigena: "200", // viene de /api/v1/municipio?cve_agem=
          clave_estado: "OAX", // viene de /api/v1/estado?cve_agee=
          clave_municipio: "WIU", // viene de /api/v1/municipio?cve_agem=
          p_municipio: "300", // viene de /api/v1/municipio?cve_agem=
          num_localidades: "2", // suma de localidades de un minicipio
          p_total_localidades: "600", // suma de poblacion de localidaes
        },
        f2: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f3: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f4: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f5: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f6: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f7: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
        f8: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
          num_localidades: "2",
          localidades: [
            {
              nombre: "Localidad wiu 1",
              poblacion: "500",
            },
            {
              nombre: "Localidad wiu 2",
              poblacion: "100",
            },
          ],
          p_total_localidades: "600",
        },
      },
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
  },

  events: {},

  created() {},
};
</script>