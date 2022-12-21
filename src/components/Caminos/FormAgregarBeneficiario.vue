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
      calve_estado: this.camino.cve_agee,
      id_camino: this.camino.id,
      clave_municipio: "",  // Municipio Seleccionado
      clave_localidad: "",  // Localidad Selecccionada
      region: "",
      ubicacion: "",
      municipiosData: [],
      municipiosFields: { text: 'nombre', value: 'clave_agem' },
      localidadesData: [],
      localidadesFields: { text: 'nombre', value: 'id' }
    };
  },
  props: {
    camino: Object,
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

    // Obtener Municipios
    async obtenerMunicipios() {
      this.$emit("show-error", false);
      this.clave_municipio = null;
      this.clearLocalidades();
      try {
        const results = await getMunicipios(this.clave_estado)
        console.log(this.results);

        this.municipiosData = results
      } catch (err) {
        console.log('error al obtener municipios')
        console.log(err)
        this.$emit("show-error", err);
      }
    },
    //localidades
    async obtenerLocalidades() {
      const objMunSeleccionado = this.municipiosData[(this.camino.icve_municipio*1)-1]

      try {
        this.$emit("show-error", false);
        this.clearLocalidades();
        const res = await getLocalidades(objMunSeleccionado.id)
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
    },

    async postBeneficiarioCamino() {
      const wiu = {
        clave_camino:this.camino.clave,
        estado: this.camino.cve_agee,
        // municipio: this.clave_municipio,
        municipio: this.MunicipioSeleccionado.id,
        // localidad: this.clave_localidad,
        localidad: this.clave_localidad,
        
        // camino_id: this.camino_id,
        region: this.region,
        ubicacion: this.ubicacion,
        
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
  computed:{
    MunicipioSeleccionado(){
      return this.municipiosData[(this.clave_municipio*1)-1]
    },
  }
};
</script>

<style>

</style>