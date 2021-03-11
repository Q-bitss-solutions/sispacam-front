<template>
  <div id="app" class="container vertical-buffer">
    <button type="button" class="btn btn-primary" v-on:click="showDiv('Register')">Registro de Obra</button>
    <button type="button" class="btn btn-primary" v-on:click="showDiv('Analysis')">Análisis de Obra</button>
    <RegisterWork v-if="showElement == 'Register'"/>
    <AnalysisWork v-if="showElement == 'Analysis'"/>
  </div>
</template>

<script>
  import RegisterWork from './components/RegisterWork.vue'
  import AnalysisWork from "./components/AnalysisWork";

  export default {
    name: 'app',
    data() {
      return {
        showElement: null,
      };
    },
    components: {
      AnalysisWork,
      RegisterWork
    },
    methods: {
      showDiv(data){
        this.showElement = data;
        console.log(this.showElement)
      }
    }
  }
</script>
