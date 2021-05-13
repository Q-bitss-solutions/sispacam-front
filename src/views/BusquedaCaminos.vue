<template>
<div>
<div class="row">

  <div class="col-md-12 small-bottom-buffer">
    <p>La búsqueda puede efectuarse ingresando datos generales o por medio de Clave única de la Obra.</p>
    <ul class="nav nav-tabs small-top-buffer">
      <li id="b1" class="active"><a @click="clearData(); isBuquedaPorIcveObra = false" data-toggle="tab" href="#tab-01">Buscar por datos generales</a></li>
      <li id="b2"><a @click="clearData(); isBuquedaPorIcveObra = true" data-toggle="tab" href="#tab-02">Buscar por Clave única de Obra</a></li>
    </ul>
    <div class="tab-content col-md-12">
  <!--tab1-->
  <div class="tab-pane active" id="tab-01">    
      <div class="row">
          <!--nombre obra-->
          <div class="col-md-8 form-group">
            <label class="control-label">Nombre de la Obra o palabra(s) clave:</label>
            <input class="form-control" v-model="obra.nombre_camino" type="text" placeholder="Ingresa nombre o palabra clave">
          </div>
          <!--Estado-->
          <div class="col-md-4 form-group">
            <label class="control-label">Estado:</label>
            <select class="form-control" 
                    id="estado"
                    v-model="obra.cve_agee"
                    @change="changeEdo()"
                    :class="{'form-control-error': $v.obra.cve_agee.$error }"
                    >
                <option value="">Selecciona un estado...</option>
                <option v-for="(edo, index) in estadosData" :key="index" v-bind:value="edo.cve_agee">
                  {{ edo.nom_agee }}
                </option>
            </select>
          <div class="row col-md-10">
              <small v-if="$v.obra.cve_agee.$error" class="form-text form-text-error">
              Este campo es obligatorio
              </small>
          </div>               
          </div>
      </div>

      <div class="row">
        <!--Municipio-->
        <div class="col-md-4 form-group">
          <label class="control-label">Municipio:</label>
          <select class="form-control" 
                  id="municipio"
                  v-model="obra.icve_municipio"
                  @change="changeMunicipio()">
            <option value="">Selecciona un municipio...</option>
            <option v-for="(mun, index) in municipiosData" :key="index" v-bind:value="mun.cve_agem">
              {{ mun.nom_agem }}
            </option>
          </select>
        </div>
        <!--Localidad-->
        <div class="col-md-4 form-group">
          <label class="control-label">Localidad:</label>
          <select class="form-control" 
                  id="localidad"
                  v-model="obra.localidades"                  
                  >                  
            <option value="">Selecciona una localidad...</option>
            <option v-for="(loc, index) in localidadesData" :key="index" v-bind:value="loc.cve_loc">
              {{ loc.nom_loc }}
            </option>            
          </select>
        </div>
        <!--Tipo de Obra-->
        <div class="col-md-4 form-group">
          <label class="control-label">Tipo de Obra:</label>
          <select v-model="obra.tipo_camino" class="form-control" id="tipoObra">
            <option value="" selected="selected">Selecciona un tipo de obra...</option>
            <option value="C">Cabecera</option>
            <option value="A">Agencia</option>
            <option value="O">Otro</option>
          </select>
        </div>
      </div>
      
      <div class="row">

        <!--Estrategia-->
        <div class="col-md-4 form-group">
          <label class="control-label">Estrategia de Gobierno Federal:</label>
          <select class="form-control" v-model="estrategia" id="estrategia"
                  @change="getEstrategia">
            <option value="" selected="selected">Selecciona una estrategia...</option>
            <option value="ciit">CIIT</option>
            <option value="tren_maya">Tren Maya</option>
            <option value="caminos_originales">Caminos originales</option>
          </select>
        </div>
        <!--Grado Marginacion-->
        <div class="col-md-4 form-group">
          <label class="control-label">Grado de Marginación:</label>
          <select v-model="obra.marginacion" class="form-control" id="grado">
            <option value="" selected="selected">Selecciona un grado de marginación...</option>
            <option value="1">Alto</option>
            <option value="2">Bajo</option>
            <option value="3">Medio</option>
            <option value="4">Muy alto</option>
            <option value="5">Muy bajoo</option>
          </select>
        </div>

        <div class="col-md-4 form-group">
          <label class="control-label">Tipo de población indígena:</label>
          <select v-model="obra.poblacionIndigena" class="form-control" id="tipoPoblacion">
            <option value="" selected="selected">Selecciona un tipo de población...</option>
            <option value="1">Municipio con presencia indígena</option>
            <option value="2">Municipio indígena</option>
            <option value="3">Municipio sin población indígena</option>
            <option value="4">Municipio con población indígena dispersa</option>
          </select>
        </div>
      </div>
  </div>


  <!--tab2-->
  <div class="tab-pane" id="tab-02">
    <div class="row">                    
      <div class="col-md-4 form-group"  >
        <label class="control-label">Clave única de la Obra:</label>
        <input v-model="obra.clave" 
                class="form-control" type="text" 
                placeholder="Ingresa Clave única de la Obra"
                id="icveObra"
                :class="{'form-control-error': $v.obra.clave.$error }"
                >
        <div class="row col-md-10">
          <small v-if="$v.obra.clave.$error" class="form-text form-text-error">
            Este campo es obligatorio
          </small>
        </div>  
      </div>
    </div>
  </div>

    </div>
  </div>
</div>


<div class="row">
  <div class="col-md-12 text-right">
    <hr>
    <button class="btn btn-default" type="button" @click="clearData">Cancelar</button>
    <button class="btn btn-primary" type="button" id="buscarObras" @click="submit">
      <span class="icon icon-search" style="margin-right: 8px;"></span>Buscar</button>
  </div>
</div>



</div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
import { getEdos, getMunicipios, getLocalidades } from '@/api/alta-camino'
import { required } from 'vuelidate/lib/validators'

const validateEdo = (value, vm) => {

  return value !== ''
  //return vm.items.some(edo => edo.cve_agee != '');
};

export default {
  name: 'BusquedaCaminos',
  data () {
    return {
      breadcrumb: ['Búsqueda de Obras'],
      estadosData: null,
      municipiosData: null,
      localidadesData: null,
      isBuquedaPorIcveObra: false,
      estrategia:'',
      obra: {
        cve_agee: '', //estado
        icve_municipio: '',
        localidades: '',
        tipo_camino: '',
        clave: '',
        marginacion: '',
        tipoPoblacion: '',
        poblacionIndigena: '',
        nombre_camino: '',
        icveObra: null,
        ciit:false,
        tren_maya:false,
        caminos_originales:false
      }
    }
  },
  validations: {
    obra : {
      cve_agee: {
        required,
        validateEdo
      },
      clave: {
        required
      }
    }
  },   
  methods: {
    ...mapMutations(['setBreadcrumb']),
    submit() {     
      if(!this.isBuquedaPorIcveObra){
        this.$v.obra.cve_agee.$touch()
        if (!this.$v.obra.cve_agee.$invalid) {
          console.log(this.obra)
          this.$router.push({ 
            name: 'Obras', 
            params: { 
              values: this.obra 
              }
            })
        }
        this.submitStatus = "Error" 
        return
      }
      this.$v.obra.clave.$touch()
      if(this.$v.obra.clave.$invalid)
        return
      this.$router.push({ 
        name: 'Obras', 
        params: {
          values:this.obra         
        }
      })
      
        /*
        this.$v.$touch()
        console.log('submit...')
        if (this.$v.$invalid) return      
        */
    },
    async initData () {
      const res = await getEdos()
      const results = res.results;
      this.estadosData = results;
    },
    async changeEdo () {
      try{
        this.municipiosData = null;
        this.localidadesData = null
        this.obra.municipio =''
        this.obra.localidades =''
        console.log(this.obra.cve_agee)
        const {results} = await getMunicipios(this.obra.cve_agee)
        this.municipiosData = results;       
        console.log(this.municipiosData)  
      }catch(err){
          console.log('error al obtener municipios')
          console.log(err)
      }      
    },
    async changeMunicipio () {
      this.localidadesData = null;
      this.obra.localidades =''
      try{
        console.log('changemun')
        const res = await getLocalidades(this.obra.cve_agee, 
                      this.obra.icve_municipio)
        this.localidadesData = res
      }catch(error){
        console.log('error al obtener localidades')
        console.log(error);
      }
    },
    clearData () {
      this.$v.$reset()
      this.obra = {
        estado: '',
        municipio: '',
        localidad: '',
        tipoObra: '',
        estrategia: '',
        clave: '',
        marginacion: '',
        tipoPoblacion: '',
        poblacionIndigena: '',
        nombre: '',
        icveObr: ''
      }
      this.initData()
    },
    getEstrategia(){
      this.obra.ciit = false
      this.obra.tren_maya = false
      this.obra.caminos_originales = false
      this.obra[this.estrategia]= true
      console.log(this.obra)      
    }    
  },
  beforeMount: function () {    
    this.setBreadcrumb(this.breadcrumb)
  },
  created() {      
      this.initData()
  },
  computed: {

  }  
}
</script>
