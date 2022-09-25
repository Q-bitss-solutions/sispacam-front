<template>
  <table class="table">
    <thead></thead>
    <tbody>
      <tr>
        <td><h5>Región</h5></td>
        <td v-for="frente in frentes">{{ frente.region }}</td>
      </tr>
      <tr>
        <td><h5>Ubicación</h5></td>
        <td v-for="frente in frentes">{{ frente.ubicacion }}</td>
      </tr>
      <tr>
        <td><h5>Presencia indígena</h5></td>
        <td v-for="frente in frentes">{{ frente.p_indigena }}</td>
      </tr>
      <tr>
        <td><h5>Grado de marginación</h5></td>
        <td v-for="frente in frentes">{{ frente.marginacion }}</td>
      </tr>
      <tr>
        <td><h5>Total población indígena</h5></td>
        <td v-for="frente in frentes">{{ frente.total_p_indigena }}</td>
      </tr>
      <tr>
        <td><h5>Clave INEGI estado</h5></td>
        <td v-for="frente in frentes">{{ frente.clave_estado }}</td>
      </tr>
      <tr>
        <td><h5>Clave INEGI municipio</h5></td>
        <td v-for="frente in frentes">{{ frente.clave_municipio }}</td>
      </tr>
      <tr>
        <td><h5>Población del municipio</h5></td>
        <td v-for="frente in frentes">{{ frente.p_municipio }}</td>
      </tr>

      <tr>
        <td><h5>Número de localidades</h5></td>
        <td v-for="frente in frentes">{{ frente.num_localidades }}</td>
      </tr>

      <tr>
        <td><h5>Localidades</h5></td>
        <td v-for="frente in frentes">
          <div v-for="localidad in frente.localidades">
          <p><b>{{localidad.nombre}}</b> : {{localidad.poblacion}}</p>
          </div>
        </td>
      </tr>

      <tr>
        <td><h5>Población total de localidades</h5></td>
        <td v-for="frente in frentes">{{ frente.p_municipio }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TablaFrentesCamino",
  data: function () {
    return {
      wiu:''
    };
  },
  props:{
    frentes:Object,
  }
};
</script>