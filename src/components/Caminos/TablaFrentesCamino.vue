<template>
  <table class="table">
    <tbody>
      <tr>
        <td>
          <h5>Municipio</h5>
        </td>
        <td v-for="frente in frentes">
          {{ frente.nombre_municipio }}
        </td>
      </tr>

      <tr>
        <td>
          <h5>Localidad</h5>
        </td>
        <td v-for="frente in frentes">
          {{ frente.nombre_localidad }}
        </td>
      </tr>

      <tr>
        <td>
          <h5>Clave Beneficiario</h5>
        </td>
        <td v-for="(frente, index) in frentes" :key="index">
          <div>
            <p :style="{ color: !frente.estatus ? '#b7b7b7' : '' }">
              {{ frente.clave_camino }}-{{ frente.clave_beneficiario }}
            </p>
            <button class="btn btn-primary active" :disabled="!frente.estatus"
              @click="deleteBeneficiario(frente.id, frente.clave_beneficiario)" type="button">
              Eliminar
            </button>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <h5>Región</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.region }}</td>
      </tr>
      <tr>
        <td>
          <h5>Ubicación</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.ubicacion }}</td>
      </tr>
      <tr>
        <td>
          <h5>Presencia indígena</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.presencia_indigena }}</td>
      </tr>
      <tr>
        <td>
          <h5>Grado de marginación</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.marginacion }}</td>
      </tr>
      <tr>
        <td>
          <h5>Total población indígena</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.total_p_indigena }}</td>
      </tr>
      <tr>
        <td>
          <h5>Clave INEGI estado</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.estado }}</td>
      </tr>
      <tr>
        <td>
          <h5>Clave INEGI municipio</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.clave_municipio }}</td>
      </tr>
      <tr>
        <td>
          <h5>Población del municipio</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.p_municipio }}</td>
      </tr>

      <tr>
        <td>
          <h5>Número de localidades</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.num_localidades }}</td>
      </tr>

      <tr>
        <td>
          <h5>Población de localidades</h5>
        </td>
        <td v-for="frente in frentes">{{ frente.p_localidades }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { deleteBeneficiariosCamino, deleteBeneficiariosCaminoLogico } from "@/api/beneficiarios";

export default {
  name: "TablaFrentesCamino",
  data: function () {
    return {
      wiu: "",
    };
  },
  props: {
    frentes: Array,
  },
  methods: {
    async deleteBeneficiario(id, clave_beneficiario) {
      if (clave_beneficiario != "A") {
        /* if (confirm("Está seguro de borrar esta entrada?")) {
          const response = await deleteBeneficiariosCamino(id);
          console.log(response);
          this.$emit("deleteBeneficiario");
        } */
         await this.$swal.fire({
          title: 'Eliminar esta entrada?',
          text: "Se eliminara esta entrada del registro",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const  response = await deleteBeneficiariosCaminoLogico(id);
            console.log('response: ',response)
            this.$swal.fire(
              'Borrado!',
              'La entrada fue eliminada',
              'success'
            )
          }
          this.$emit("deleteBeneficiario");
        })
      }
    },
  }
};
</script>