<template>
  <div class="row">
    <div class="col-md-12">

      <!-- MUNICIPIO -->
      <div class="col-md-12">
        <label class="control-label" for="municipio">Municipio</label>
        <ejs-combobox :dataSource="municipiosData" :fields="municipiosFields"
          :class="{ 'form-control-error': $v.icve_municipio.$error }" id="municipio"
          placeholder="Selecciona un municipio" ref="refMunicipio" v-model="clave_municipio" v-on:change="obtenerLocalidades">
        </ejs-combobox>
        <div class="row col-md-12" v-if="!$v.icve_municipio.required && $v.icve_municipio.$error">
          <small class="form-text form-text-error">
            Este campo es obligatorio
          </small>
        </div>
      </div>

      <!-- LOCALIDAD -->
      <div class="col-md-12">
        <label class="control-label">Localidad</label>
        <ejs-combobox placeholder="Selecciona una localidad" id="localidades" ref="localidades"
          :dataSource="localidadesData" :fields="localidadesFields" v-model="clave_localidad">
        </ejs-combobox>
      </div>

      <!-- REGION -->
      <div class="col-md-12">
        <label class="control-label" for="region">Region</label>

        <input id="region" v-model="region" placeholder="Región" maxlength="40" class="e-input" />
      </div>

      <!-- UBICACION -->
      <div class="col-md-12">

        <input id="ubicacion" v-model="ubicacion" placeholder="Ubicación" maxlength="40" class="e-input" />
      </div>

      <div class="col-md-8"></div>
      <div class="col-md-4 float-right">
        <button class="btn btn-danger" @click="closeModal">Cerrar</button>
        <button class="btn btn-primary active" @click="postBeneficiarioCamino">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomId } from "@syncfusion/ej2-base";
import { required } from "vuelidate/lib/validators";
import { getMunicipios, CreateBeneficiarioCamino, getLocalidades } from '@/api/alta-camino'


export default {
  name: "FormAgregarBeneficiario",
  data: function () {
    return {
      id_camino: 1,
      clave_municipio: "",  // Municipio Seleccionado
      clave_localidad: "",  // Localidad Selecccionada
      region: "",
      ubicacion: "",
      municipiosData: [],
      municipiosFields: { text: 'nom_agem', value: 'cve_agem' },
      localidadesData: [],
      localidadesFields: { text: 'nom_loc', value: 'cve_loc' }
    };
  },
  props: {
    clave_estado: String,
  },

  computed:{

  },

  validations: {
    icve_municipio: {
      required,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    // TODO: Ir por los municipios del estado
    //municipios
    async obtenerMunicipios() {
      this.$emit("show-error", false);
      this.clave_municipio = null;
      this.clearLocalidades();
      try {
        const { results } = await getMunicipios(this.clave_estado)

        this.municipiosData = results
      } catch (err) {
        console.log('error al obtener municipios')
        console.log(err)
        this.$emit("show-error", err);
      }
    },
    //localidades
    async obtenerLocalidades() {
      try {
        this.$emit("show-error", false);
        this.clearLocalidades();
        const res = await getLocalidades(this.clave_estado , this.clave_municipio)
        // const res = await getLocalidades(15 , 120)
        console.log(res);

        this.localidadesHabilitado = true;
        this.localidadesData = res

      } catch (error) {
        console.log('error al obtener localidades')
        console.log(error);
        this.$emit("show-error", error);
      }
    },

    clearLocalidades() {
      this.localidadesData = null;
      this.localidadesHabilitado = false;
      this.localidades = [];
      this.localidadesTabla = [];
    },

    async postBeneficiarioCamino() {
      const wiu = {
        id: getRandomId(),
        camino_id: this.camino_id,
        municipio: this.clave_municipio,
        localidad: this.clave_localidad,
        region: this.region,
        ubicacion: this.ubicacion,
        // TODO: quitar hardcode estado
        estado: 26,

      };
      console.log(wiu);
      const response = await CreateBeneficiarioCamino(this.id_camino, wiu);
      this.closeModal();
      alert("Beneficiario de obra guardado satisfactoriamente");
      this.$emit("updateFrentes")
    },
  },
  created() {
    this.obtenerMunicipios()
  },
};
</script>

<style>

</style>