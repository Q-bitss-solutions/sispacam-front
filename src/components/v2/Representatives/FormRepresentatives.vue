<template>
  <validation-observer
    style="display: flex; flex-direction: column; gap: 15px;"
    v-slot="{ handleSubmit }"
  >
    <span class="divider-span">
      Datos personales del representante
    </span>
    <input-base
      id="name"
      v-model="form.name"
      placeholder="Ingresa el nombre(s)"
      label="Nombre(s)"
      rules="required"
    />
    <input-base
      id="firstSurname"
      v-model="form.firstSurname"
      placeholder="Ingresa el segundo apellido"
      label="Primer Apellido"
      rules="required"
    />
    <input-base
      id="secondSurname"
      v-model="form.secondSurname"
      placeholder="Ingresa el segundo apellido"
      label="Segundo Apellido"
      rules="required"
      />
    <input-base
      id="rfc"
      v-model="form.rfc"
      placeholder="Ingresa el RFC"
      label="RFC"
      rules="required|rfc"
      upper-case
    />
    <input-base
      id="curp"
      v-model="form.curp"
      placeholder="Ingresa el CURP"
      label="CURP"
      rules="required|curp"
      upper-case
    />
    <input-base
      id="birthday"
      v-model="form.birthday"
      label="Fecha de nacimiento"
      type="date"
      rules="required"
      placeholder="Selecciona la fecha de nacimiento"
    />
    <input-base
      id="gender"
      v-model="form.gender"
      :options="[{ value: 'H', label: 'Masculino' }, { value: 'M', label: 'Femenino' }]"
      type="radio"
      label="Género"
      rules="required"
    />
    <span class="divider-span">
      Direccion del representante
    </span>
    <input-base
      id="cp"
      v-model="form.cp"
      placeholder="Ingresa el codigo postal"
      label="C.P."
      rules="required|numeric|digits:5"
    />
    <input-base
      id="colony"
      v-model="form.colony"
      placeholder="Ingresa la colonia"
      label="Colonia"
      rules="required"
    />
    <input-base
      id="street"
      v-model="form.street"
      placeholder="Ingresa la calle"
      label="Calle"
      rules="required"
    />
    <input-base
      id="externalNumber"
      v-model="form.externalNumber"
      placeholder="Ingresa el número exterior"
      label="Núm. Exterior"
      rules="required"
    />
    <span class="divider-span">
      Datos bancarios
    </span>
    <input-base
      id="clabe"
      v-model="form.clabe"
      placeholder="Ingresa la clabe interbancaria"
      label="Clabe Interbancaria"
      rules="required|numeric|digits:18"
    />
    <span class="divider-span">
      Fechas de asignacion
    </span>
    <input-base
      id="initDate"
      v-model="form.initDate"
      label="Fecha inicio"
      placeholder="Seleciona la fecha inicio"
      type="date"
      rules="required"
    />
    <input-base
      id="endDate"
      v-model="form.endDate"
      placeholder="Seleciona la fecha fin"
      label="Fecha fin"
      type="date"
      rules="required"
    />
    <button
      type="button"
      @click="handleSubmit(sendForm)"
      class="btn btn-primary"
      style="max-width: max-content; margin: auto; margin-top: 30px;"
    >
      Crear representante
    </button>
  </validation-observer>
</template>

<script>
import InputBase from '@/components/v2/InputBase.vue'
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'FormRepresentatives',
  components: {
    InputBase,
    ValidationObserver,
  },
  data: function () {
    return {
      form: {
        clabe: '',
        rfc: '',
        name: '',
        firstSurname: '',
        secondSurname: '',
        curp: '',
        birthday: '',
        gender: '',
        street: '',
        externalNumber: '',
        colony: '',
        cp: '',
        initDate: '',
        endDate: '',
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