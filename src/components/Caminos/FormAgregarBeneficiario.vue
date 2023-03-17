<template>
  <div class="row">
    <div class="col-md-12">

      <!-- MUNICIPIO -->
      <div class="col-md-12">
        <label class="control-label" for="municipio">*Municipio</label>
        <ejs-combobox :dataSource="municipiosData" :fields="municipiosFields"
          :class="{ 'form-control-error': $v.clave_municipio.$error }" id="municipio"
          placeholder="Selecciona un municipio" ref="refMunicipio" v-model="clave_municipio" v-on:change="obtenerLocalidades">
        </ejs-combobox>
        <div class="row col-md-12" v-if="!$v.clave_municipio.required && $v.clave_municipio.$error">
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
        <label class="control-label" for="region">*Region</label>

        <input id="region" v-model="region" placeholder="Región" maxlength="40" class="e-input" />
      </div>

      <!-- UBICACION -->
      <div class="col-md-12">
        <label class="control-label" for="region">*Ubicación</label>

        <input id="ubicacion" v-model="ubicacion" placeholder="Ubicación" maxlength="40" class="e-input" />
      </div>



      <div class="my-4"><small>*Campos obligatorios</small></div>

      <div class="col-md-8"></div>
      <div class="col-md-4 float-right">
        <button class="btn btn-danger" @click="closeModal">Cerrar</button>
        <button v-if="ValidForm" class="btn btn-primary active" @click="postBeneficiarioCamino">
          Aceptar
        </button>
        <button v-if="!ValidForm" class="btn btn-primary disabled">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomId } from "@syncfusion/ej2-base";
import { required } from "vuelidate/lib/validators";
import { getMunicipios, getLocalidades } from "@/api/inegi";
import { createBeneficiarioCamino } from '@/api/beneficiarios';

export default {
  name: "FormAgregarBeneficiario",
  data: function () {
    return {
      clave_estado: this.camino.clave_estado,
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
    clave_municipio: {
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
      const objMunSeleccionado = this.municipiosData[(this.clave_municipio*1)-1]
      console.log(objMunSeleccionado)

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
      console.log(this.payload);
      const response = await createBeneficiarioCamino(this.id_camino, this.payload);
      this.closeModal();
      alert("Beneficiario de obra guardado satisfactoriamente");
      this.$emit("updateFrentes")
    },
  },
  created() {
    this.obtenerMunicipios()
    console.log(this.camino);
  },
  computed:{
    MunicipioSeleccionado(){
      return this.municipiosData[(this.clave_municipio*1)-1]
    },
    ValidForm(){
      if(this.clave_municipio != "" &&
        this.region != "" &&
        this.ubicacion != ""
      ){
        return true
      }else{
        return false
      }
    },
    payload(){
      return{
        clave_camino:this.camino.clave_camino,
        estado: this.camino.clave_estado,
        // municipio: this.clave_municipio,
        municipio: this.MunicipioSeleccionado.id,
        // localidad: this.clave_localidad,
        localidad: this.clave_localidad==null?null:this.clave_localidad,
        
        // camino_id: this.camino_id,
        region: this.region,
        ubicacion: this.ubicacion,
        
      }
    }
  }
};
</script>

<style>

</style>