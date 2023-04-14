<template>
  <div>
    <form-physical-advances
      @submit="saveRepresentative"
      :road-width="roadWidth"
      v-if="roadWidth !== ''"
    />
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import FormPhysicalAdvances from '@/components/v2/PhysicalAdvances/FormPhysicalAdvances.vue'
import { storePhysicalAdvanceToAssignment } from '@/api/physicalAdvances'
import { fetchAssignmentById } from '@/api/assignments'

export default {
  name: 'NewPhysicalAdvances',
  components: { FormPhysicalAdvances },
  data: function () {
    return {
      roadKey: '',
      roadWidth: '',
    }
  },
  methods: {
    async saveRepresentative(physicalAdvance) {
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        await storePhysicalAdvanceToAssignment({ assignmentId: this.$route.params.assignmentId, physicalAdvance })
        this.$swal('Avance fisico registrado', 'Avance fisico registrado satisfactoriamente.', 'success')
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
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        const data = await fetchAssignmentById(this.$route.params.assignmentId)
        this.roadWidth = data.camino.ancho_camino
        this.roadKey = data.camino.clave_camino
      } catch (error) {
        console.error(error)
        this.$swal('Error en el servidor!', error.detail ? error.detail : JSON.stringify(error), 'error')
      }
      loading.close()
    },
  },
  created() {
    this.getAssignment()
    this.$store.state.breadcrumb = ['Nuevo avance fisico']
  },
}
</script>
