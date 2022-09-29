<template>
  <div class="row">
    <div class="col-md-12">
      <!-- MUNICIPIO -->
      <label class="control-label" for="municipio">Municipio</label>
      <ejs-combobox
        :class="{ 'form-control-error': $v.icve_municipio.$error }"
        id="municipio"
        placeholder="Selecciona un municipio"
        ref="refMunicipio"
        v-model="clave_municipio"
      >
      </ejs-combobox>
      <div
        class="row col-md-12"
        v-if="!$v.icve_municipio.required && $v.icve_municipio.$error"
      >
        <small class="form-text form-text-error">
          Este campo es obligatorio
        </small>
      </div>

      <!-- LOCALIDAD -->
      <div>
        <label class="control-label">Localidad</label>
        <ejs-combobox
          placeholder="Selecciona una localidad"
          id="localidades"
          ref="localidades"
          v-model="clave_localidad"
        >
        </ejs-combobox>
      </div>

      <!-- REGION -->
      <label class="control-label" for="region">Region</label>
      <div class="col-md-12">
        <input
          id="region"
          v-model="region"
          placeholder="Región"
          maxlength="40"
          class="e-input"
        />
      </div>

      <!-- UBICACION -->
      <label class="control-label" for="ubicacion">Ubicación</label>
      <div class="col-md-12">
        <input
          id="ubicacion"
          v-model="ubicacion"
          placeholder="Ubicación"
          maxlength="40"
          class="e-input"
        />
      </div>
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
import { required } from "vuelidate/lib/validators";
import { CreateBeneficiarioCamino } from "../../api/alta-camino";

export default {
  name: "FormAgregarBeneficiario",
  data: function () {
    return {
      id_camino: 10,
      clave_municipio: "",
      clave_localidad: "",
      region: "",
      ubicacion: "",
    };
  },
  validations: {
    icve_municipio: {
      required,
    },
  },
  methods: {
    closeModal() {
      console.log("close modal FAB");
      this.$emit("lololo");
    },
    async postBeneficiarioCamino() {
      const wiu = {
        camino_id: this.camino_id,
        clave_municipio: this.clave_municipio,
        clave_localidad: this.clave_localidad,
        region: this.region,
        ubicacion: this.ubicacion,
      };
      console.log(wiu);
      const response = await CreateBeneficiarioCamino(this.id_camino,wiu);
      alert(response.msg);
    },
  },
};
</script>

<style>
</style>