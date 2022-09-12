<template>
    <div>
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
                <img src="@/assets/img/logo.jpg" alt="Secretaría de Comunicaciones y Transportes"
                    class="img-responsive" />
            </div>
            <div class="col-md-5">
                <div v-if="isAuthenticated" class="usuario">
                    <p> {{ getUser }}</p>
                    <p><strong>Rol:</strong> {{ getRol }}
                        <a @click="logout" href="#" class="pull-right">Cerrar sesión</a>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { computed } from 'vue';

export default {
    name: 'Subheader',
    data() {
        return {
            breadcrumbs: [],
            isAuthenticated: true,
        };
    },
    computed: {
        getBreadcrumb: function () {
            return this.$store.state.breadcrumb;
        }
    }
}
</script>