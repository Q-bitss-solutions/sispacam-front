<template>
  <div>
    <form-physical-advances
      @submit="saveRepresentative"
      :road-width="roadWidth"
      :physical-advance="physicalAdvance"
      v-if="initDataLoaded"
    />
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import FormPhysicalAdvances from '@/components/v2/PhysicalAdvances/FormPhysicalAdvances.vue'
import { putPhysicalAdvance } from '@/api/physicalAdvances'
import { fetchAssignmentById } from '@/api/assignments'
import { fetchPhysicalAdvanceById } from '@/api/physicalAdvances'
import { mapPhysicalAdvance } from '@/utils/payloadMappers'

export default {
  name: 'NewPhysicalAdvances',
  components: { FormPhysicalAdvances },
  data: function () {
    return {
      roadKey: '',
      roadWidth: '',
      physicalAdvance: {},
      initDataLoaded: false,
    }
  },
  methods: {
    async saveRepresentative(physicalAdvance) {
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        await putPhysicalAdvance({ physicalAdvance, physicalAdvanceId: this.$route.params.physicalAdvanceId })
        this.$swal('Avance fisico actualizado', 'Avance fisico actualizado satisfactoriamente.', 'success')
          .then(() => this.$router.push({
            name: 'PhysicalAdvances',
            params: {
              roadKey: this.roadKey,
            },
          }))
      } catch (error) {
        console.error(error)
        this.$swal('Error en el servidor!', error.detail ? error.detail : JSON.stringify(error), 'error')
      }
      loading.close()
    },
    async getAssignment() {
      const { camino } = await fetchAssignmentById(this.$route.params.assignmentId)
      this.roadWidth = camino.ancho_camino
      this.roadKey = camino.clave_camino
    },
    async getPhysicalAdvance() {
      const physicalAdvance = await fetchPhysicalAdvanceById(this.$route.params.physicalAdvanceId)
      this.physicalAdvance = mapPhysicalAdvance(physicalAdvance)
    },
    async init() {
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        await Promise.all([
          this.getAssignment(),
          this.getPhysicalAdvance(),
        ])
        this.initDataLoaded = true
      } catch (error) {
        console.error(error)
        this.$swal('Error en el servidor!', error.detail ? error.detail : JSON.stringify(error), 'error')
      }
      loading.close()
    },
  },
  created() {
    this.init()
    this.$store.state.breadcrumb = ['Editar avance fisico']
  },
}
</script>
