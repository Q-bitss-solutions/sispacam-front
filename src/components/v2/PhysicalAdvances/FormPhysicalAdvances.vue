<template>
  <validation-observer
    style="display: flex; flex-direction: column; gap: 15px;"
    v-slot="{ handleSubmit }"
  >
    <img
      :src="require(`@/assets/img/roads/widths/${roadWidth}.jpg`)"
      alt="Ancho del camino"
      style="height: 300px; width: auto; object-fit: contain;"
    >
    <span class="divider-span">
      Roderas y Empedrados Izquierda
    </span>
    <input-base
      id="firstRutToLeft"
      v-model="form.firstRutToLeft"
      placeholder="Ingresa los metros de la rodera 1"
      label="Rodera 1 (m) *"
      rules="required"
    />
    <input-base
      id="secondRutToLeft"
      v-model="form.secondRutToLeft"
      placeholder="Ingresa los metros de la rodera 2"
      label="Rodera 2 (m) *"
      rules="required"
      :disabled="['4.0', '4.5'].includes(roadWidth)"
    />
    <input-base
      id="cobbledToLeft"
      v-model="form.cobbledToLeft"
      placeholder="Ingresa los metros del empedrado"
      label="Empedrado (m) *"
      rules="required"
    />
    <span class="divider-span">
      Empedrado Central​
    </span>
    <input-base
      id="cobbledToCenter"
      v-model="form.cobbledToCenter"
      placeholder="Ingresa los metros del empedrado"
      label="Empedrado (m) *"
      rules="required"
      :disabled="['5.0'].includes(roadWidth)"
    />
    <span class="divider-span">
      Roderas y Empedrados Derecha
    </span>
    <input-base
      id="firstRutToRight"
      v-model="form.firstRutToRight"
      placeholder="Ingresa los metros de la rodera 1"
      label="Rodera 1 (m) *"
      rules="required"
    />
    <input-base
      id="secondRutToRight"
      v-model="form.secondRutToRight"
      placeholder="Ingresa los metros de la rodera 2"
      label="Rodera 2 (m) *"
      rules="required"
      :disabled="['4.0', '4.5'].includes(roadWidth)"
    />
    <input-base
      id="cobbledToRight"
      v-model="form.cobbledToRight"
      placeholder="Ingresa los metros del empedrado"
      label="Empedrado (m) *"
      rules="required"
    />
    <button
      type="button"
      @click="handleSubmit(sendForm)"
      class="btn btn-primary"
      style="max-width: max-content; margin: auto; margin-top: 30px;"
    >
      Registrar avance fisico
    </button>
  </validation-observer>
</template>

<script>
import InputBase from '@/components/v2/InputBase.vue'
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'FormRepresentatives',
  props: {
    roadWidth: {
      type: String,
      required: true,
      validator: (roadWidth) => ['4.0', '4.5', '5.0', '5.5', '6.0'].includes(roadWidth)
    },
  },
  components: {
    InputBase,
    ValidationObserver,
  },
  data: function () {
    return {
      form: {
        firstRutToRight: '',
        secondRutToRight: '',
        firstRutToLeft: '',
        secondRutToLeft: '',
        cobbledToRight: '',
        cobbledToCenter: '',
        cobbledToLeft: '',
      }
    }
  },
  methods: {
    sendForm() {
      this.$emit('submit', this.form)
    },
  },
}
</script>

<style scoped>
.divider-span {
  font-weight: bold;
  font-size: 16px;
  background-color: #f0f0f0;
  padding: 5px 20px;
}
</style>