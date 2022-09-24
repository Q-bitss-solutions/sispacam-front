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
        <button class="btn btn-primary active" type="button">
          Agregar Frente de Obra
        </button>
      </div>
    </div>

    <hr class="red" />

    <div class="row">
      <tabla-frentes-camino :frentes="frentes"></tabla-frentes-camino>

    </div>
    
  </div>
</template>

<script>
import TablaFrentesCamino from '../components/Caminos/TablaFrentesCamino.vue';
export default {
  components: { TablaFrentesCamino },
  name: "EditarCamino",
  data: function () {
    return {
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
        f1: {
          region: "Detrás del cerro",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
        },
        f2: {
          region: "Rancho alegre",
          ubicacion: "u1",
          p_indigena: "100",
          marginacion: "alta",
          total_p_indigena: "200",
          clave_estado: "OAX",
          clave_municipio: "WIU",
          p_municipio: "300",
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
        },
      },
    };
  },
};
</script>