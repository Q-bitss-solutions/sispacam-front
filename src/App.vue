<template>
<div>
  <!-- SUBMENÚ -->
  <nav v-if="isAuthenticated" class="navbar navbar-inverse sub-navbar navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#subenlaces"
          aria-expanded="false" 
          aria-controls="navbar">
          <span class="sr-only">Interruptor de Navegación</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="https://www.gob.mx/sct">Secretaría de Comunicaciones y Transportes</a>
      </div>
      <div class="collapse navbar-collapse" id="subenlaces">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
              >Opciones <span class="caret"></span
            ></a>
            <ul class="dropdown-menu" role="menu">              
              <li><a href="/altacamino">Alta</a></li>
              <li v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false">
                  <a href="/busqueda">Búsqueda</a>
              </li>
              <li v-if="$route.params.obraId">
                <a :href="'/editcamino/' + $route.params.obraId">{{ $route.params.obraId}}</a>                
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

<div class="container">
  <!-- BREADCRUM + LOGOTIPO + DATOS DE USUARIO -->
  <div class="row top-buffer">
    <div class="col-md-8">
      <ol v-if="getBreadcrumb" class="breadcrumb">
        <li><a href="https://www.gob.mx"><i class="icon icon-home"></i></a></li>
        <li><a href="https://www.gob.mx/sct">SCT</a></li>
        <li>DGC - Cabeceras Municipales</li>
        <li class="active" v-for="(breadcrumb , index) in getBreadcrumb" :key="index">
          {{ breadcrumb }}
        </li>
      </ol>
    </div>
  </div>
  <div class="row">
    <div class="col-md-7" id="logotipo">
      <img src="./assets/img/logo.jpg" alt="Secretaría de Comunicaciones y Transportes" class="img-responsive" />
    </div>
    <div class="col-md-5">
      <div v-if="isAuthenticated" class="usuario">
        <p> {{ getUser  }}</p>
        <p><strong>Rol:</strong> {{ getRol }}
        <a @click="logout" href="#" class="pull-right">Cerrar sesión</a>
        </p>
      </div>
    </div>
  </div>

  <!-- TÍTULO Y SUBTÍTULO -->
  <div class="row">
    <div class="col-md-12">
      <h1>Dirección General de Carreteras</h1>
      <h2>Cabeceras Municipales</h2>
      <h3>{{ getBreadcrumb[0] }}</h3>
      <hr class="red">
    </div>
  </div>
      <!-- CONTENIDO -->
<div class="row">
  <div class="col-md-12">
    <!-- <h4 v-if="$route.params.obraId">Camino : {{$route.params.obraId}}</h4> -->
    <router-view/>

    <!-- <button @click="saludar">send peticion</button> -->
  </div>
</div>  
</div>  
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import { mapActions } from "vuex"

export default {
  data () {
    return {
      breadcrumbs: []
    }
  },
  computed: {
    isAuthenticated: function () {
      console.log('isauth:' + this.$store.getters['user/isAuthenticated'])
      return  this.$store.getters['user/isAuthenticated']
      },
    getUser: function () {
      
      return this.$store.getters['user/StateUser']
    },
    getRol: function () {
      
      return this.$store.getters['user/StateRol']
    },
    getBreadcrumb: function () {
       return this.$store.state.breadcrumb
    }
  },
  methods: {
    ...mapActions(["test"]),
    ...mapMutations('user',['setAuthenticated']),
    saludar () {
      this.test({ username: 'Guchi' })
    },
    logout(){
      this.setAuthenticated(false)
      this.$router.push('/')     
    }
  },
  created(){
    console.log('version::v2.5')
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


@charset "UTF-8";
/* CSS Document */

h1 {font-size: 32px;margin: 0;}
h2 {font-size: 28px;margin-top: 10px;}
h3 {font-size: 24px;margin-top: 40px;}
h4 {font-size: 24px;margin-bottom: 20px;margin-top: 0;}
h5 {font-size: 20px;margin-top: 0;margin-bottom: 30px;}
strong {font-weight: 500;}
label {font-weight: 500;margin-right: 6px;}
hr.red {margin: 10px 0 60px;}
#logotipo img {height: 80px;}
#logotipo {margin-bottom: 30px;}

.small-top-buffer {margin-top: 30px;}
.xsmall-top-buffer {margin-top: 12px;}
.xsmall-right-buffer {margin-right: 5px;}
.small-left-buffer {margin-left: 12px;}
.left-buffer {margin-left: 30px;}
.small-bottom-buffer {margin-bottom: 40px;}
.xsmall-bottom-buffer {margin-bottom: 12px;}
.no-margin {margin: 0 !important;}
.no-padding {padding: 0 !important;}
.small, small {font-size: 15px;}
.btn + .btn {margin-left: 5px;}

.usuario {border: 1px solid #dedede;border-radius: 3px;padding: 10px 16px;position: relative;font-size: 16px;width: 88%;margin-left: 12%;}
.usuario p:first-child {margin-bottom: 4px;}
.usuario p:last-child {margin: 0;padding-top: 4px;border-top: 1px solid #dedede;}
.usuario p {margin-bottom: 0;}
.usuario p a {text-decoration: none;}
.usuario p a:hover {text-decoration: underline;color: #12C;}

.panel-heading {padding: 10px 16px;}
.panel-body {padding: 20px;}
.form-control, output {font-size: 15px;}
.form-control-feedback {top: 34px;right: 18px;}
.panel-title {font-size: 18px;}
.panel-body .small {font-size: 14px;}
.button-top-buffer {margin-top: 15px;}
.panel-body h4 {font-size: 18px;margin-bottom: 22px;color: #4f4f4f;}
.vertical-buffer {margin-bottom: 50px;margin-top: 35px;}
.form-group {margin-bottom: 25px;}

.nav-tabs > li > a {background-color: #f6f6f6;margin-right: 0;border: 1px solid #d5d5d5;border-radius: 0;text-decoration: none;color: #545454;}
.nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover {color: #9d2449;background-color: #fff;border: 1px solid #ddd;border-bottom-color: rgb(221, 221, 221);border-bottom-color: transparent;cursor: default;font-weight: 600;}
.nav-tabs {border-bottom: 1px solid #ddd;}

.table-bordered th {background-color: #f0f0f0;}
.table-bordered tr:hover {background-color: #90bba21f !important;}
.table {font-size: 15px;}
.table th {font-weight: 600;}
.table-striped > tbody > tr:nth-of-type(2n) {background-color: #f9f9f9;}
.table-striped > tbody > tr:nth-of-type(2n+1) {background-color: transparent;}
.table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {padding: 6px;vertical-align: middle;}
th.center, td.center {text-align: center;}

.table.data {margin-top: 15px;margin-bottom: 10px !important;}
.table.data thead tr th, .table.data tfoot tr td {text-align: right;}
.table.data thead tr th:first-of-type, .table.data tbody tr td:first-of-type, .table.data tfoot tr td:first-of-type {text-align: left !important;width: 45%;}
.table.data tbody tr td, .table.data tbody tr td input {text-align: right;}
.table.data tbody tr td input {margin: 0 4% !important;width: 92% !important;height: 32px !important;padding: 5px !important;}
.table.data tbody tr td .input-group {margin: 0 4% !important;width: 92% !important;}
.table.data tbody tr td .input-group .input-group-addon {padding: 6px 6px;font-size: 16px;color: inherit;background-color: #fff;}
.table.data tbody tr td .input-group input {margin: 0 !important;width: 100% !important;height: 32px !important;padding: 5px !important;}
.table.data tbody tr.concepto td {border-top-width: 3px !important;border-bottom-width: 2px !important;background-color: #f7f7f7;font-weight: 600;}
.table.data tbody tr.subconcepto td {border-bottom-width: 2px !important;background-color: #fbfbfb;font-weight: 600;padding: 2px 6px;}
.table.data tfoot tr td {border-top-width: 3px !important;background-color: #f0f0f0;font-weight: 600;}
.currencyinput {border: 1px inset #ccc;}
.currencyinput input {border: 0;}
.table.text-center thead tr th, .table.text-center tbody tr td {text-align: center;}


/* AJUSTES GOB.MX */
body {font-size: 17px;}
.dropdown-menu {font-size: 16px;}
.breadcrumb {margin-bottom: 16px;}
.breadcrumb li {display: inline-block;}
.datepicker-group .glyphicon {right: 16px;}
.clearfix {overflow: auto;}

.e-grid .e-gridpager .e-currentitem {
    background-color: #9D2449;
}

</style>
