<template>
  <div>
    <table-base
      :options="featureOptions"
      :headers="headers"
      :data="physicalAdvances"
    />
  </div>
</template>

<script>
import TableBase from '@/components/v2/TableBase.vue'
import { mapMutations } from 'vuex'
import { fetchPhysicalAdvancesByRoad } from '@/api/caminos'
import { mapPhysicalAdvancesTable } from '@/utils/tableMappers'

export default {
  name: 'PhysicalAdvances',
  components: { TableBase },
  data: function () {
    return {
      physicalAdvances: [],
      headers: [
        {
          label: 'Nombre camino',
          field: 'roadName',
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
          label: 'Fecha avance',
          field: 'advanceDate',
        },
        {
          label: 'Semana',
          field: 'week',
        },
        {
          label: 'Porcentaje avance',
          field: 'percentageProgress',
        },
        {
          label: 'Porcentaje acumulado',
          field: 'fullPercentage',
        },
        {
          label: 'Estatus',
          field: 'status',
        },
      ],
      featureOptions: [
        {
          label: 'example1',
          action: (context) => console.log(context),
        },
        {
          label: 'example2',
          action: (context) => console.log(context),
        },
      ],
    }
  },
  methods: {
    async getPhysicalAdvances() {
      const data = await fetchPhysicalAdvancesByRoad('Ags.-C-001')
      this.physicalAdvances = mapPhysicalAdvancesTable(data)
    },
    ...mapMutations(["setBreadcrumb"]),
  },
  created() {
    this.setBreadcrumb(['Avances fisicos'])
    this.getPhysicalAdvances()
  },
}
</script>
