<template>
  <div>
    <div class="row" style="margin-bottom: 15px">
      <div class="col-md-3">
        <input
          class="form-control"
          @keyup="searchCaminos"
          type="text"
          v-model="params.clave_camino"
          placeholder="ID de la obra"
        />
      </div>
      <div class="col-md-3">
        <input
          class="form-control"
          @keyup="searchCaminos"
          type="text"
          v-model="params.nombre_camino"
          placeholder="Nombre de la obra"
        />
      </div>
      <div class="col-md-3">
        <input
          class="form-control"
          @keyup="searchCaminos"
          type="text"
          v-model="params.nombre_municipio"
          placeholder="Municipio"
        />
      </div>
      <div class="col-sm-3">
        <el-select
          v-model="params.estatus"
          multiple
          placeholder="Estatus"
          @change="searchCaminos"
        >
          <el-option
            v-for="status in roadStatusList"
            :key="status.id"
            :label="status.estatus"
            :value="status.id"
          />
        </el-select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div style="height: 500px; overflow-y: scroll">
          <ejs-grid
            ref="grid"
            :dataSource="roadList"
            gridLines="Both"
            :allowPaging="false"
            :allowSorting="true"
            :pageSettings="pageSettings"
            :allowTextWrap="true"
            toolbar="@( new List<object>() {'Add','Edit','Delete','Update','Cancel'})"
          >
            <e-columns>
              <e-column
                v-for="(column, key) in columns"
                :key="key"
                :field="column.field"
                :headerText="column.headerText"
              />
              <e-column
                field="clave"
                :template="editTemplate"
                headerText="Ver/Editar Obra"
                textAlign="Center"
                :visible="flagEdicion"
              />
              <e-column
                field="clave"
                :template="cancelTemplate"
                headerText="Cancelar/Reactivar Obra"
                textAlign="Center"
                :visible="isNormativeRole"
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
import { mapMutations } from "vuex";
import { GridPlugin, Sort, Page } from "@syncfusion/ej2-vue-grids";
import { getListaCaminos } from "@/api/caminos";
import ButtonGrid from "@/components/ButtonGrid";
import MenuStatusCamino from "@/components/MenuStatusCamino";
import { fetchRoadStatus } from "@/api/caminos";
import { mapRoadsTable } from "@/utils/tableMappers";

Vue.use(GridPlugin);

export default {
  name: "GridResultObra",
  data() {
    return {
      roadStatusList: [],
      roadList: [],
      breadcrumb: ["Caminos"],
      pageSettings: {
        pageCount: 5,
        pageSize: 20,
      },
      isNormativeRole: this.$store.getters["user/StateRol"] === "NORMATIVO",
      flagEdicion: true,
      params: {
        nombre_municipio: null,
        nombre_camino: null,
        clave_camino: null,
        estatus: [],
      },
      columns: [
        {
          field: "clave",
          headerText: "ID de la obra",
        },
        {
          field: "nombre",
          headerText: "Nombre de la obra",
        },
        {
          field: "nombre_municipio",
          headerText: "Municipio",
        },
        {
          field: "type",
          headerText: "Tipo de obra",
        },
        {
          field: "grado_marginacion",
          headerText: "Grado de marginación",
        },
        {
          field: "tipo_poblacion",
          headerText: "Tipo de población",
        },
      ],
    };
  },
  provide: {
    grid: [Sort, Page],
  },
  methods: {
    async searchCaminos() {
      try {
        const data = await getListaCaminos({
          ...this.params,
          estatus: this.roadStatusToString(),
        });
        this.roadList = mapRoadsTable(data)
      } catch (error) {
        console.error(error);
      }
    },
    editTemplate() {
      return {
        template: ButtonGrid,
      };
    },
    cancelTemplate() {
      return {
        template: MenuStatusCamino,
      };
    },
    async getRoads() {
      try {
        const data = await getListaCaminos();
        this.roadList = mapRoadsTable(data)
      } catch (error) {
        console.error(error);
      }
    },
    async getRoadStatus() {
      try {
        this.roadStatusList = await fetchRoadStatus();
      } catch (error) {
        console.error(error);
      }
    },
    roadStatusToString() {
      return this.params.estatus.length ? this.params.estatus.join() : null;
    },
    ...mapMutations(["setBreadcrumb"]),
  },
  created() {
    this.setBreadcrumb(this.breadcrumb);
    this.getRoads();
    this.getRoadStatus();
  },
};
</script>
