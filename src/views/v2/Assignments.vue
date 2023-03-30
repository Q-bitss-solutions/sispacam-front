<template>
  <div>
    <div class="col-md-4" style="margin-bottom: 15px">
      <el-input
        v-model="params.clave_camino"
        placeholder="Buscar por clave camino"
        @input="getAssignments"
      />
    </div>
    <div class="col-md-3">
      <el-select
        v-model="params.estatus"
        placeholder="Buscar pot estatus"
        @change="getAssignments"
      >
        <el-option
          v-for="(status, index) in [{ value: 'false', label: 'Inactivo' }, { value: 'true', label: 'Activo' }]"
          :key="index"
          :label="status.label"
          :value="status.value"
        />
      </el-select>
    </div>
    <table-base
      :options="featureOptions"
      :headers="headers"
      :data="assignments"
    />
  </div>
</template>

<script>
import TableBase from '@/components/v2/TableBase.vue'
import { mapMutations } from 'vuex'
import { fetchAssignments } from '@/api/residentes'
import { mapAssignmentsTable } from '@/utils/tableMappers'

export default {
  name: 'Assignments',
  components: { TableBase },
  data: function () {
    return {
      assignments: [],
      headers: [
        {
          label: 'Clave camino',
          field: 'roadKey',
        },
        {
          label: 'Nombre camino',
          field: 'roadName',
        },
        {
          label: 'Año convenio',
          field: 'yearAgreement',
        },
        {
          label: 'Convenio tramo',
          field: 'agreementSection',
        },
        {
          label: 'Fecha inicio',
          field: 'initDate',
        },
        {
          label: 'Fecha fin',
          field: 'endDate',
        },
        {
          label: 'Fecha último avance',
          field: 'lastDateRoad',
        },
        {
          label: 'Estatus',
          field: 'status',
        },
      ],
      featureOptions: [
        {
          label: 'Ver avance fisico',
          action: (assignment) => this.$router.push({
            name: 'PhysicalAdvances',
            params: {
              roadKey: assignment.roadKey,
            },
          }),
        },
      ],
      params: {
        icveusuario: this.$store.state.user.userId,
        clave_camino: null,
        estatus: null,
      },
    }
  },
  methods: {
    async getAssignments() {
      const data = await fetchAssignments(this.params)
      this.assignments = mapAssignmentsTable(data)
    },
    ...mapMutations(["setBreadcrumb"]),
  },
  created() {
    this.setBreadcrumb(['Asignaciones'])
    this.getAssignments()
  },
}
</script>
