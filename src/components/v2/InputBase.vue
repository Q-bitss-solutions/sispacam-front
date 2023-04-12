<template>
  <validation-provider
    :rules="rules"
    v-slot="{ errors }"
    style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 15px; max-width: 768px; width: 100%; margin: auto;"
  >
    <label
      :for="id"
      style="grid-column: span 1 / span 1; margin: 0px; margin-top: auto; margin-bottom: auto;"
    >
      {{ label }}
    </label>
    <div style="grid-column: span 2 / span 2;">
      <el-date-picker
        v-if="['date'].includes(type)"
        type="date"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        value-format="yyyy-MM-dd"
        @input="(value) => $emit('update', value)"
        style="width: 100%;"
      />
      <el-radio
        v-else-if="type === 'radio'"
        v-for="(option, index) in options"
        :key="index"
        :value="value"
        :label="option.value"
        @input="(value) => $emit('update', value)"
      >
        {{ option.label }}
      </el-radio>
      <el-input
        v-else
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :type="type"
        @input="(value) => $emit('update', upperCase ? value.toUpperCase() : value)"
      />
    </div>
    <span style="color: red; font-size: 12px; grid-column-start: 2;">
      {{ errors[0] }}
    </span>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputBase',
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => ([
        {
          label: 'Option 1',
          Value: '1',
        }
      ]),
    },
  },
  components: { ValidationProvider },
  model: {
    prop: 'value',
    event: 'update',
  },
}
</script>
