<template>
  <div style="display: flex; align-items: center; gap: 16px; font-size: 16px;">
    <div style="height: 28px; width: 0px; border: 1px solid #1C75BB;" />
    <div v-for="(item, index) in items" :key="index" style="display: flex; align-items: center; gap: 16px; text-align: center;">
      <p style="margin: 0px;">
        {{ item.label }}:
        <strong>
          {{ item.value }}
        </strong>
      </p>
      <div style="height: 28px; width: 0px; border: 1px solid #1C75BB;" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([
        /* {
          lable: 'Example:',
          value: 'example',
        } */
      ])
    }
  },
}
</script>
