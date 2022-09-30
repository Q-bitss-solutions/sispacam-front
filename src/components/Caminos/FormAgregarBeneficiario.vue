<template>
  <div class="row">
    <div class="col-md-12">

      <!-- MUNICIPIO -->
      <div class="col-md-12">
        <label class="control-label" for="municipio">Municipio</label>
        <ejs-combobox :dataSource="municipiosData" :fields="municipiosFields"
          :class="{ 'form-control-error': $v.icve_municipio.$error }" id="municipio"
          placeholder="Selecciona un municipio" ref="refMunicipio" v-model="clave_municipio">
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
      municipiosData: [
        {
          "id": 59,
          "clave_agem": "059",
          "nombre": "Progreso",
          "iso": "0001",
          "poblacion": 66008,
          "pob_fem": 33029,
          "pob_masc": 32979,
          "vivienda": 18511,
          "created_at": "2022-09-27T23:17:57.287562Z",
          "updated_at": "2022-09-27T23:17:57.288066Z",
          "estado": 31
        },
        {
          "id": 60,
          "clave_agem": "060",
          "nombre": "Quintana Roo",
          "iso": "0001",
          "poblacion": 976,
          "pob_fem": 496,
          "pob_masc": 480,
          "vivienda": 305,
          "created_at": "2022-09-27T23:17:57.289640Z",
          "updated_at": "2022-09-27T23:17:57.289640Z",
          "estado": 31
        },
        {
          "id": 61,
          "clave_agem": "061",
          "nombre": "Río Lagartos",
          "iso": "0001",
          "poblacion": 3974,
          "pob_fem": 1941,
          "pob_masc": 2033,
          "vivienda": 1101,
          "created_at": "2022-09-27T23:17:57.291534Z",
          "updated_at": "2022-09-27T23:17:57.291534Z",
          "estado": 31
        },
        {
          "id": 38,
          "clave_agem": "038",
          "nombre": "Pinos",
          "iso": "0001",
          "poblacion": 72241,
          "pob_fem": 37485,
          "pob_masc": 34756,
          "vivienda": 19276,
          "created_at": "2022-09-27T23:17:57.236838Z",
          "updated_at": "2022-09-27T23:17:57.236838Z",
          "estado": 32
        },
        {
          "id": 39,
          "clave_agem": "039",
          "nombre": "Río Grande",
          "iso": "0001",
          "poblacion": 64535,
          "pob_fem": 33255,
          "pob_masc": 31280,
          "vivienda": 17720,
          "created_at": "2022-09-27T23:17:57.238852Z",
          "updated_at": "2022-09-27T23:17:57.238852Z",
          "estado": 32
        },
        {
          "id": 40,
          "clave_agem": "040",
          "nombre": "Sain Alto",
          "iso": "0001",
          "poblacion": 21844,
          "pob_fem": 11201,
          "pob_masc": 10643,
          "vivienda": 5504,
          "created_at": "2022-09-27T23:17:57.241354Z",
          "updated_at": "2022-09-27T23:17:57.241354Z",
          "estado": 32
        },
        {
          "id": 41,
          "clave_agem": "041",
          "nombre": "El Salvador",
          "iso": "0001",
          "poblacion": 2509,
          "pob_fem": 1235,
          "pob_masc": 1274,
          "vivienda": 733,
          "created_at": "2022-09-27T23:17:57.241354Z",
          "updated_at": "2022-09-27T23:17:57.241354Z",
          "estado": 32
        },
        {
          "id": 42,
          "clave_agem": "042",
          "nombre": "Sombrerete",
          "iso": "0001",
          "poblacion": 63665,
          "pob_fem": 32198,
          "pob_masc": 31467,
          "vivienda": 17199,
          "created_at": "2022-09-27T23:17:57.241354Z",
          "updated_at": "2022-09-27T23:17:57.241354Z",
          "estado": 32
        },
        {
          "id": 218,
          "clave_agem": "218",
          "nombre": "San Juan Teita",
          "iso": "0001",
          "poblacion": 544,
          "pob_fem": 284,
          "pob_masc": 260,
          "vivienda": 166,
          "created_at": "2022-09-27T23:17:57.661453Z",
          "updated_at": "2022-09-27T23:17:57.661453Z",
          "estado": 20
        },
        {
          "id": 219,
          "clave_agem": "219",
          "nombre": "San Juan Teitipac",
          "iso": "0001",
          "poblacion": 2668,
          "pob_fem": 1392,
          "pob_masc": 1276,
          "vivienda": 755,
          "created_at": "2022-09-27T23:17:57.668884Z",
          "updated_at": "2022-09-27T23:17:57.668884Z",
          "estado": 20
        },
        {
          "id": 220,
          "clave_agem": "220",
          "nombre": "San Juan Tepeuxila",
          "iso": "0001",
          "poblacion": 2692,
          "pob_fem": 1304,
          "pob_masc": 1388,
          "vivienda": 835,
          "created_at": "2022-09-27T23:17:57.670828Z",
          "updated_at": "2022-09-27T23:17:57.670828Z",
          "estado": 20
        }
      ],
      municipiosFields: { text: 'nombre', value: 'clave_agem' },
      localidadesData: [
        {
          "id": 61,
          "clave_loc": "14",
          "nombre": "LAS PILAS",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "Bajo",
          "poblacion_indigena": 4,
          "poblacion": 1129,
          "created_at": "2022-09-27T23:47:08.263591Z",
          "updated_at": "2022-09-27T23:47:08.263591Z",
          "clave_agem": 32
        },
        {
          "id": 526,
          "clave_loc": "1341",
          "nombre": "EL TERCO",
          "ambito": "Mpio. con presencia indígena",
          "tipo": "Loc. de 40% y más",
          "grado_marginacion": "Alto",
          "poblacion_indigena": 5,
          "poblacion": 11,
          "created_at": "2022-09-27T23:47:09.388049Z",
          "updated_at": "2022-09-27T23:47:09.388049Z",
          "clave_agem": 32
        },
        {
          "id": 1139,
          "clave_loc": "968",
          "nombre": "EL TORITO",
          "ambito": "Mpio. con presencia indígena",
          "tipo": "Loc. de 40% y más",
          "grado_marginacion": "",
          "poblacion_indigena": 3,
          "poblacion": 3,
          "created_at": "2022-09-27T23:47:10.910060Z",
          "updated_at": "2022-09-27T23:47:10.910060Z",
          "clave_agem": 32
        },
        {
          "id": 1144,
          "clave_loc": "1125",
          "nombre": "UMAN (DEPORTIVO)",
          "ambito": "Mpio. con presencia indígena",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "",
          "poblacion_indigena": 1,
          "poblacion": 5,
          "created_at": "2022-09-27T23:47:10.926917Z",
          "updated_at": "2022-09-27T23:47:10.926917Z",
          "clave_agem": 32
        },
        {
          "id": 77,
          "clave_loc": "47",
          "nombre": "LAGUNA GRANDE",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "Bajo",
          "poblacion_indigena": 1,
          "poblacion": 960,
          "created_at": "2022-09-27T23:47:08.300360Z",
          "updated_at": "2022-09-27T23:47:08.300360Z",
          "clave_agem": 31
        },
        {
          "id": 783,
          "clave_loc": "182",
          "nombre": "LAGUNITA DE PINEDO",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "",
          "poblacion_indigena": 1,
          "poblacion": 3,
          "created_at": "2022-09-27T23:47:10.028726Z",
          "updated_at": "2022-09-27T23:47:10.028726Z",
          "clave_agem": 31
        },
        {
          "id": 3,
          "clave_loc": "106",
          "nombre": "TETILLAS",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "Medio",
          "poblacion_indigena": 5,
          "poblacion": 296,
          "created_at": "2022-09-27T23:47:08.120165Z",
          "updated_at": "2022-09-27T23:47:08.120165Z",
          "clave_agem": 20
        },
        {
          "id": 148,
          "clave_loc": "130",
          "nombre": "LA LABOR DEL MÁRQUEZ",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. de 40% y más",
          "grado_marginacion": "",
          "poblacion_indigena": 2,
          "poblacion": 2,
          "created_at": "2022-09-27T23:47:08.472610Z",
          "updated_at": "2022-09-27T23:47:08.472610Z",
          "clave_agem": 20
        },
        {
          "id": 155,
          "clave_loc": "121",
          "nombre": "LA GAVIA",
          "ambito": "Mpio. con población indígena dispersa",
          "tipo": "Loc. con menos de 40%",
          "grado_marginacion": "Bajo",
          "poblacion_indigena": 2,
          "poblacion": 402,
          "created_at": "2022-09-27T23:47:08.495498Z",
          "updated_at": "2022-09-27T23:47:08.495498Z",
          "clave_agem": 20
        }
      ],
      localidadesFields: { text: 'nombre', value: 'clave_loc' }
    };
  },
  validations: {
    icve_municipio: {
      required,
    },
  },
  methods: {
    closeModal() {
      this.$emit("lololo");
    },

    async postBeneficiarioCamino() {
      const wiu = {
        camino_id: this.camino_id,
        clave_municipio: this.clave_municipio,
        clave_localidad: this.clave_localidad,
        region: this.region,
        ubicacion: this.ubicacion,
        p_indigena: "100",
        marginacion: "alta",
        total_p_indigena: "200",
        clave_estado: "OAX",
        p_municipio: "300",
        num_localidades: "2",
        p_total_localidades: "600"
      };
      console.log(wiu);
      const response = await CreateBeneficiarioCamino(this.id_camino, wiu);
      this.closeModal();
      alert("Beneficiario de obra guardado satisfactoriamente");
      this.$emit("updateFrentes")
    },
  },
};
</script>

<style>

</style>