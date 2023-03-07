<!-- TODO: Cambiar nombre a "TablaCaminos" -->

<template>
    <div>
        <div class="row" style="margin-bottom: 15px;">
            <div class="col-md-3">
                <input @keyup="searchCaminos" type="text" v-model="params.clave_camino" placeholder="ID de la obra" />
            </div>
            <div class="col-md-3">
                <input @keyup="searchCaminos" type="text" v-model="params.nombre_camino" placeholder="Nombre de la obra" />
            </div>
            <div class="col-md-3">
                <input @keyup="searchCaminos" type="text" v-model="params.nombre_municipio" placeholder="Municipio" />
            </div>
            <div class="col-md-2">
                <!-- <button class="btn btn-primary active" @click="searchCaminos" type="button">
                    Buscar
                </button> -->
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div style="height:500px; overflow-y: scroll;">
                    <!-- <ejs-grid ref="grid" :dataSource="data" :gridLines='lines' :allowPaging='true' :allowSorting='true' -->
                    <ejs-grid ref="grid" :dataSource="data" :gridLines='lines' :allowPaging='false' :allowSorting='true'
                        :pageSettings='pageSettings' :allowTextWrap='true'
                        toolbar="@( new List<object>() {'Add','Edit','Delete','Update','Cancel'})">
                        <e-columns>
                            <e-column field='clave' headerText='ID de la obra' />
                            <e-column field='nombre' headerText='Nombre de la obra' />
                            <e-column field='nombre_municipio' headerText='Municipio' />
                            <e-column field='tipo_camino' headerText='Tipo de obra' />
                            <e-column field='grado_marginacion' headerText='Grado de parginación' />
                            <e-column field='tipo_poblacion' headerText='Tipo de población' />
                            <e-column
                                field="clave"
                                :template='editTemplate'
                                headerText='Ver/Editar Obra'
                                textAlign='Center'
                                :visible='flagEdicion'
                            />
                            <e-column
                                field="clave"
                                :template='cancelTemplate'
                                headerText='Cancelar/Reactivar Obra'
                                textAlign='Center'
                                :visible='flag'
                            />
                        </e-columns>
                    </ejs-grid>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from 'vuex'
import { GridPlugin, Sort, Page, } from '@syncfusion/ej2-vue-grids';
import { getListaCaminos } from "@/api/caminos";
import ButtonGrid from '@/components/ButtonGrid'
import CancelaObra from '@/components/CancelaObra'

Vue.use(GridPlugin);
export default {
    name: 'GridResultObra',
    data() {
        return {
            lines: 'Both',
            data: [],
            breadcrumb: ['Caminos'],
            pageSettings: { pageCount: 5, pageSize: 20 },
            count: 0,
            flag: this.$store.getters['user/StateRol'] == 'NORMATIVO' ? true : false,
            isCanceled: false,
            flagEdicion: true,
            wiu: null,
            params: {
                nombre_municipio: null,
                nombre_camino: null,
                clave_camino: null
            }
        }
    },
    provide: {
        grid: [Sort, Page]
    },
    methods: {
        async searchCaminos() {
            try {
                this.data = await getListaCaminos(this.params)

            } catch (e) {
                console.log('error-->')
                console.log(e)
                alert(e)
            }
            // Reinicia los parametros despues de cada búsqueda
            /* this.params = {
                nombre_municipio: null,
                nombre_camino: null,
                clave_camino: null
            } */
        },
        editTemplate() {
            return {
                template: ButtonGrid
            }
        },
        cancelTemplate() {
            return {
                template: CancelaObra
            }
        },
        async populate() {
            try {
                this.data = await getListaCaminos()
                console.log("DATA");
                console.log(this.data);
            } catch (e) {
                console.log('error-->')
                console.log(e)
                alert(e)
            }
            if (this.data) {
                let results = this.data
                // Muestra el tipo de camino human-readable
                results.map((obj) => {
                    switch (obj.tipo_camino) {
                        case 'A':
                            obj.tipo_camino = 'Agencia'
                            break;
                        case 'C':
                            obj.tipo_camino = 'Cabecera'
                            break;
                        case 'O':
                            obj.tipo_camino = 'Otro'
                            break;
                    }
                    obj.isCanceled = obj.estatus == 'A' ? false : true
                    return obj
                })
                this.count = results.length
                this.data = results
            }
        },
        ...mapMutations(['setBreadcrumb']),
    },
    created() {
        this.setBreadcrumb(this.breadcrumb)
        this.populate()
    }
}    
</script>

<style scoped>
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>