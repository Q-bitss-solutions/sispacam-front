<template>
  <div>
    <form-representatives @submit="saveRepresentative" />
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import FormRepresentatives from '@/components/v2/Representatives/FormRepresentatives.vue'
import { storeRepresentative } from '@/api/beneficiarios'
import { mapRepresentativePayload } from '@/utils/payloadMappers'


export default {
  name: 'Representatives',
  components: { FormRepresentatives },
  data: function () {
    return {
    }
  },
  methods: {
    async saveRepresentative (representative) {
      const loading = Loading.service({ fullscreen: true, lock: true })
      try {
        await storeRepresentative(mapRepresentativePayload({ ...representative, agreementId: this.$route.params.agreementId }))
        this.$swal('Representante registrado', 'Representante registrado satisfactoriamente.', 'success')
          .then(() => this.$router.push({
            name: 'Representatives',
            params: {
              agreementId: this.$route.params.agreementId,
            },
          }))
      } catch (error) {
        console.error(error)
        this.$swal('Validacion de campos', error.detail ? error.detail : JSON.stringify(error), 'error')
      }
      loading.close()
    },
  },
  created() {
  },
}
</script>
