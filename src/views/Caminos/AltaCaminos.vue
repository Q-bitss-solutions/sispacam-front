<template>
    <div class="row">
        <div class="col-md-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" :class="activeTab=='Geo'?'active':''" id="tabPersonal">
                    <a href="#datosGeograficos" aria-controls="profile" role="tab" data-toggle="tab" id="input-1"
                        aria-expanded="true">
                        Datos Geográficos
                    </a>
                </li>
                <li role="presentation" id="tabDatosCamino" :class="activeTab=='Camino'?'active':''">
                    <a href="#datosCamino" aria-controls="profile" role="tab" data-toggle="tab" id="input-2"
                        aria-expanded="true">
                        Datos del Camino
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="datosGeograficos">
                    <DatosGeograficos :isCanceled="isCanceled" @set-icveEdo="setCEdo" @show-error="showError"
                        :camino_id.sync="camino_id" />
                </div>
                <div role="tabpanel" class="tab-pane" id="datosCamino">
                    <DatosCamino :isCanceled="isCanceled" :edo='cEstado' @show-error="showError"> </DatosCamino>
                </div>
            </div>
        </div>
        <div>
            <div v-if="msgError" class="alert alert-danger">{{ msgError }}</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getupdate } from '@/api/alta-camino';
import DatosCamino from '@/components/Caminos/DatosCamino';
import DatosGeograficos from '@/components/Caminos/DatosGeograficos';

export default {
    name: "AltaCamino",
    components: {
    DatosGeograficos,
    DatosCamino,
},

    data() {
        return {
            isCanceled: false,
            camino_id: 0,
            // Datos geografios
            cEstado: '',
            msgError: null,
            breadcrumb: ['Camino ' + this.$route.params.obraId],
            longitud_pavimentar: '',
            activeTab:"Geo"
        }
    },
    methods: {
        setCEdo(e) {
            // TODO:Entender porque hace esto
            const obj = JSON.parse(JSON.stringify(e))
            this.cEstado = obj.datos
            this.activeTab="Camino"
        },
        showError(e) {
            console.log('show-error')
            this.msgError = e;
        },
        ...mapMutations(['setBreadcrumb']),
        async getStatus(clave) {
            const response = await getupdate(clave)
            this.isCanceled = response.estatus == 'C' ? true : false
            this.longitud_pavimentar = response.longitud_pavimentar
        },
    },
    computed: {
        getCaminoId() {
            return this.camino_id
        },
        getActiveTab() {
            console.log('this.tabConv')
            console.log(this.tabConv)
            console.log(this.$route.params)
            return !this.$route.params.tabConv ? 'tabDG' : 'tabConv'
        }
    },
    beforeMount: function () {
        if (this.$route.params.obraId) {
            this.setBreadcrumb(this.breadcrumb)
            this.getStatus(this.$route.params.obraId)
        }
    }
}
</script>
