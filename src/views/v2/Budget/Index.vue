<template>
  <div>
    <item-description :items="items" style="margin-bottom: 56px;" />
    <table-base
      :options="featureOptions"
      :headers="headers"
      :footers="footers"
      :data="paymentConcepts"
    />
  </div>
</template>

<script>
import TableBase from '@/components/v2/TableBase.vue'
import ItemDescription from '@/components/v2/ItemDescription.vue'
import { sumAll } from '@/utils/helpers'
import { fetchAgreementById } from '@/api/convenio'
import { fetchBaseBudget } from '@/api/presupuesto'
import { mapBaseBudgetTable } from '@/utils/tableMappers'
import { pesosFormatter } from '../../../utils/helpers'

export default {
  name: 'Budget',
  components: { TableBase, ItemDescription },
  data: function () {
    return {
      headers: [
        {
          label: 'Conceptos y partidas',
          field: 'paymentConcept',
        },
        {
          label: 'Cantidad por kilometro',
          field: 'quantityPerKm',
        },
        {
          label: 'Unidad de medida',
          field: 'unitMeasurement',
        },
        {
          label: 'Importe por kilometro',
          field: 'amountPerKm',
        },
        {
          label: 'Precio unitario',
          field: 'unitPrice',
        },
        {
          label: 'Importe total por longitud',
          field: 'totalAmountAgreementFormatter',
        },
        {
          label: 'Porcentaje ponderado total',
          field: 'totalWeightedPercentageFormatter',
        },
      ],
      featureOptions: [],
      paymentConcepts: [],
      yearAgreement: null,
      roadWidth: null,
      roadWidthId: null,
      baseBudget: null,
      currentBudget: null,
      baseAndCurrentVariance: null,
      metaAgreement: null,
    }
  },
  computed: {
    footers() {
      return [
        {
          label: 'Total:',
          colSpan: 3,
        },
        {
          label: pesosFormatter(sumAll(this.paymentConcepts.map(concept => concept.amountPerKm))),
          colSpan: 1,
        },
        {
          // dummy
          label: '',
          colSpan: 1,
        },
        {
          label: pesosFormatter(sumAll(this.paymentConcepts.map(concept => concept.totalAmountAgreement))),
          colSpan: 1,
        },
        {
          label: `${sumAll(this.paymentConcepts.map(concept => concept.totalWeightedPercentage)).toFixed(0)}%`,
          colSpan: 1,
        },
      ]
    },
    items() {
      return [
        {
          label: 'Año fiscal',
          value: this.yearAgreement,
        },
        {
          label: 'Ancho de camino',
          value: this.roadWidth,
        },
        {
          label: 'Presupuesto base',
          value: pesosFormatter(this.baseBudget),
        },
        {
          label: 'Presupuesto real',
          value: pesosFormatter(this.currentBudget),
        },
        {
          label: 'Variación',
          value: pesosFormatter(this.baseAndCurrentVariance),
        },
      ]
    }
  },
  methods: {
    async getAgreement() {
      const agreement = await fetchAgreementById(this.$route.params.agreementId)
      this.yearAgreement = agreement.anio
      this.roadWidth = agreement.camino.ancho_camino.descripcion
      this.roadWidthId = agreement.camino.ancho_camino.id
      this.baseBudget = agreement.presupuesto.presupuesto_base
      this.currentBudget = agreement.presupuesto.presupuesto_real
      this.baseAndCurrentVariance = agreement.presupuesto.variacion
      this.metaAgreement = agreement.meta
    },
    async getBaseBudget() {
      const data = await fetchBaseBudget({ roadWidth: this.roadWidthId, year: this.yearAgreement, metaAgreement: this.metaAgreement })
      this.paymentConcepts = mapBaseBudgetTable(data)
    },
  },
  async created() {
    await this.getAgreement()
    await this.getBaseBudget()
    this.$store.state.breadcrumb = ['Presupuesto de Camino']
  },
}
</script>
