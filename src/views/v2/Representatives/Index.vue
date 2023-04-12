<template>
  <div>
    <button
      type="button"
      @click="goToNewRepresentative"
      class="btn btn-primary"
      style="margin-bottom: 15px;"
    >
      Nuevo Representante
    </button>
    <table-base
      :options="featureOptions"
      :headers="headers"
      :data="representatives"
    />
  </div>
</template>

<script>
import { mapRepresentativesTable } from '@/utils/tableMappers'
import { getRepresentatives } from '@/api/beneficiarios'
import TableBase from '@/components/v2/TableBase.vue'
import { Loading } from 'element-ui'
import { mapMutations } from 'vuex'


export default {
  name: 'Representatives',
  components: { TableBase },
  data: function () {
    return {
      modalNewRepresentative: false,
      representatives: [],
      headers: [
        {
          label: 'Nombre completo',
          field: 'fullName',
        },
        {
          label: 'RFC',
          field: 'rfc',
        },
        {
          label: 'Fecha inicio',
          field: 'initDate',
        },
        {
          label: 'Fecha fin',
          field: 'endDate',
        },
      ],
      featureOptions: [
        {
          label: 'Editar',
          action: (context) => console.log(context),
        },
      ],
    }
  },
  methods: {
    async getRepresentatives() {
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        const data = await getRepresentatives(this.$route.params.agreementId)
        this.representatives = mapRepresentativesTable(data)
      } catch (error) {
        console.error(error)
      }
      loading.close()
    },
    goToNewRepresentative() {
      return this.$router.push({ name: 'NewRepresentative', params: { agreementId: this.$route.params.agreementId } })
    },
    ...mapMutations(["setBreadcrumb"]),
  },
  created() {
    this.setBreadcrumb(['Representantes'])
    this.getRepresentatives()
  },
}
</script>
