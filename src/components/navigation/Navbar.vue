<template>
    <nav class="navbar navbar-inverse sub-navbar navbar-fixed-top">
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
              <li v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false"><a href="/altacamino">Alta</a></li>
              <li v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false"><a href="/caminos">Caminos</a></li>
              <li v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false"><a href="/presupuesto/base/kilometro">Presupuesto Base por Kilómetro</a></li>
              <li v-if="$route.params.obraId"><a :href="'/editcamino/' + $route.params.obraId">{{ $route.params.obraId}}</a></li>
            </ul>
          </li>
          <!-- SUBMENÚ Finaciero-->
          <li class="dropdown"  v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
              >Financiero <span class="caret"></span
            ></a>
            <ul class="dropdown-menu" role="menu">
              <li ><a href="/financiero">Consulta Presupuestal</a></li>
            </ul>
          </li>
          <li class="dropdown"  v-if="this.$store.getters['user/StateRol']=='NORMATIVO'?true:false">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-expanded="false"
              >Avances Físico <span class="caret"></span
            ></a>
            <ul class="dropdown-menu" role="menu">                            
              <li ><a href="/avancefinanciero">Avances Físicos de La Obra</a></li>                 
            </ul>    
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name:'Navbar',
        //props:['isAuthenticated']
    }
</script>